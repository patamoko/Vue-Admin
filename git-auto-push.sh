#!/bin/bash

# Git自动提交脚本 - 检测到代码改动立即推送
# 使用方法：chmod +x git-auto-push.sh && ./git-auto-push.sh
# 停止方法：Ctrl+C

# 检查是否在Git仓库中
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "❌ 错误：当前目录不是Git仓库"
    exit 1
fi

# 检查是否配置了远程仓库
if ! git remote -v | grep -q "origin"; then
    echo "❌ 错误：没有配置远程仓库"
    exit 1
fi

# 获取仓库信息
REPO_NAME=$(git remote get-url origin | awk -F/ '{print $NF}' | sed 's/.git$//')
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

# 打印启动信息
echo "🚀 启动Git自动提交脚本..."
echo "📂 仓库名称：$REPO_NAME"
echo "🌿 当前分支：$BRANCH_NAME"
echo "🔍 检测到代码改动立即推送"
echo "🛑 按 Ctrl+C 停止"
echo ""

# 记录上次提交的文件状态
LAST_STATE=$(git status --porcelain 2>/dev/null | md5)

# 主循环 - 每2秒检测一次
while true; do
    # 获取当前文件状态
    CURRENT_STATE=$(git status --porcelain 2>/dev/null | md5)
    
    # 比较状态是否发生变化
    if [ "$CURRENT_STATE" != "$LAST_STATE" ]; then
        # 检查是否有未提交的更改
        if git status --porcelain | grep -q "."; then
            CURRENT_TIME=$(date "+%Y-%m-%d %H:%M:%S")
            echo "📅 [$CURRENT_TIME] 检测到文件变化，开始提交..."
            
            # 添加所有更改
            git add .
            
            # 提交更改
            git commit -m "自动提交：$CURRENT_TIME"
            
            # 推送到远程仓库（最多重试3次）
            PUSH_SUCCESS=false
            for i in 1 2 3; do
                if git push origin $BRANCH_NAME 2>/dev/null; then
                    echo "✅ [$CURRENT_TIME] 成功推送到GitHub"
                    PUSH_SUCCESS=true
                    break
                else
                    echo "⚠️ [$CURRENT_TIME] 第$i次推送失败，等待5秒后重试..."
                    sleep 5
                fi
            done
            
            if [ "$PUSH_SUCCESS" = false ]; then
                echo "❌ [$CURRENT_TIME] 推送失败，将在下次检测到变化时重试"
                # 回滚提交，避免下次重复提交
                git reset HEAD~1
            fi
        fi
        
        # 更新状态
        LAST_STATE=$CURRENT_STATE
    fi
    
    # 等待2秒
    sleep 2
done
