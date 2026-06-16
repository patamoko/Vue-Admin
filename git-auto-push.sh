#!/bin/bash
# 后台自动提交+推送 — launchd 守护进程
# 无需终端，开机自启，每 2 秒检测变更

PROJECT_DIR="/Users/alex/Documents/code/Vue+Ts"
LOG_FILE="/Users/alex/.local/log/git-auto-push.log"
LOCK_FILE="/tmp/git-auto-push-vuets.lock"

cd "$PROJECT_DIR" || exit 1

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# 防重入
if [ -f "$LOCK_FILE" ]; then
    pid=$(cat "$LOCK_FILE" 2>/dev/null)
    if kill -0 "$pid" 2>/dev/null; then
        exit 0
    fi
fi
echo $$ > "$LOCK_FILE"
trap "rm -f $LOCK_FILE" EXIT

if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    log "ERROR: not a git repo"
    exit 1
fi

if ! git remote -v 2>/dev/null | grep -q "origin"; then
    log "ERROR: no remote origin"
    exit 1
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD)
log "STARTED | branch=$BRANCH"

LAST_STATE=$(git status --porcelain 2>/dev/null | md5)

while true; do
    CURRENT_STATE=$(git status --porcelain 2>/dev/null | md5)

    if [ "$CURRENT_STATE" != "$LAST_STATE" ]; then
        if git status --porcelain | grep -q "."; then
            log "changes detected, committing..."
            git add -A
            git commit -m "auto: $(date '+%Y-%m-%d %H:%M')" --no-gpg-sign

            for i in 1 2; do
                if git push origin "$BRANCH" 2>>"$LOG_FILE"; then
                    log "push OK"
                    break
                else
                    log "push retry $i failed"
                    sleep 5
                fi
            done
        fi
        LAST_STATE=$CURRENT_STATE
    fi

    sleep 2
done
