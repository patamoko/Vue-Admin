#!/bin/bash
# 全局后台自动提交+推送 — 监控所有 Git 仓库
# launchd 守护进程，无需终端，开机自启

LOG_FILE="/Users/alex/.local/log/git-auto-push.log"
CACHE="/Users/alex/.local/log/repo-cache.txt"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"; }

refresh() {
    > "$CACHE"

    # cd 进 Documents 再扫描，绕过 launchd 对根目录的列目录限制
    cd /Users/alex/Documents 2>/dev/null || return
    for d in */; do
        # 深度2: Documents/xxx/.git
        [ -d "$d.git" ] && echo "/Users/alex/Documents/${d%/}" >> "$CACHE"
        # 深度3: Documents/xxx/yyy/.git
        for dd in "$d"*/; do
            [ -d "${dd}.git" ] && echo "/Users/alex/Documents/${dd%/}" >> "$CACHE"
        done
    done
    cd / 2>/dev/null
}

check_one() {
    repo="$1"
    [ -d "$repo/.git" ] || return
    branch=$(cat "$repo/.git/HEAD" 2>/dev/null | awk -F/ '{print $NF}')
    [ -z "$branch" ] && return

    if git -C "$repo" diff --quiet 2>/dev/null && \
       git -C "$repo" diff --cached --quiet 2>/dev/null && \
       ! git -C "$repo" ls-files --others --exclude-standard 2>/dev/null | grep -q .; then
        return
    fi

    log "[$(basename "$repo")] changed"
    git -C "$repo" add -A 2>/dev/null
    git -C "$repo" commit -m "auto: $(date '+%Y-%m-%d %H:%M')" --no-gpg-sign 2>/dev/null

    for i in 1 2; do
        if git -C "$repo" push origin "$branch" 2>>"$LOG_FILE"; then
            log "[$(basename "$repo")] pushed ($branch)"
            return
        fi
        sleep 5
    done
}

log "GLOBAL STARTED"
refresh
COUNT=$(wc -l < "$CACHE" 2>/dev/null | tr -d ' ')
log "found $COUNT repos"

LAST=0

while true; do
    NOW=$(date +%s)
    if [ $((NOW - LAST)) -ge 300 ]; then
        refresh
        COUNT=$(wc -l < "$CACHE" 2>/dev/null | tr -d ' ')
        log "refresh: $COUNT repos"
        LAST=$NOW
    fi

    while IFS= read -r repo; do
        [ -n "$repo" ] && check_one "$repo"
    done < "$CACHE"

    sleep 2
done
