#!/bin/bash

# Git自动提交脚本
# 功能：每隔1分钟自动提交代码到GitHub，保证绿点
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
echo "⏰ 提交间隔：1分钟"
echo "🔍 按 Ctrl+C 停止自动提交"
echo ""

# 主循环
while true; do
    # 获取当前时间
    CURRENT_TIME=$(date "+%Y-%m-%d %H:%M:%S")
    
    # 检查是否有未提交的更改
    if git status --porcelain | grep -q "."; then
        echo "📅 [$CURRENT_TIME] 发现文件变化，开始提交..."
        
        # 添加所有更改
        git add .
        
        # 提交更改
        git commit -m "自动提交：$CURRENT_TIME"
        
        # 推送到远程仓库
        if git push origin $BRANCH_NAME; then
            echo "✅ [$CURRENT_TIME] 成功推送到GitHub"
        else
            echo "❌ [$CURRENT_TIME] 推送失败，将在下次重试"
            # 回滚提交，避免下次重复提交
            git reset HEAD~1
        fi
    else
        echo "📅 [$CURRENT_TIME] 没有文件变化"
    fi
    
    # 等待1分钟
    echo "⏳ 等待1分钟..."
    echo ""
    sleep 60
done