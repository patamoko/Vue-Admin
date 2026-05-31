#!/bin/bash

# Git自动推送脚本
# 功能：每隔指定时间自动提交并推送到GitHub
# 使用方法：./git-auto-push.sh [间隔秒数]
# 默认间隔：300秒（5分钟）

# 设置默认间隔时间（60秒 = 1分钟）
INTERVAL=${1:-60}

# 检查Git是否安装
if ! command -v git &> /dev/null; then
    echo "❌ 错误：Git未安装，请先安装Git"
    exit 1
fi

# 检查是否在Git仓库中
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "❌ 错误：当前目录不是Git仓库"
    exit 1
fi

# 检查是否有远程仓库
if ! git remote -v | grep -q "origin"; then
    echo "❌ 错误：没有配置远程仓库"
    exit 1
fi

# 检查远程仓库是否可访问
if ! git ls-remote --exit-code origin &> /dev/null; then
    echo "❌ 错误：无法连接到远程仓库，请检查网络或SSH配置"
    exit 1
fi

# 获取仓库信息
REPO_NAME=$(git remote get-url origin | awk -F/ '{print $NF}' | sed 's/.git$//')
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

echo "🚀 启动Git自动推送模式..."
echo "📂 仓库名称：$REPO_NAME"
echo "🌿 当前分支：$BRANCH_NAME"
echo "📝 间隔时间：$INTERVAL 秒"
echo "🔍 按 Ctrl+C 停止自动推送"
echo ""

# 主循环
while true; do
    # 获取当前时间
    CURRENT_TIME=$(date "+%Y-%m-%d %H:%M:%S")
    
    # 检查是否有未提交的更改
    GIT_STATUS=$(git status --porcelain)
    if [ -n "$GIT_STATUS" ]; then
        echo "📅 [$CURRENT_TIME] 发现文件变化，开始提交..."
        
        # 添加所有更改
        git add .
        
        # 提交更改
        git commit -m "自动同步：$CURRENT_TIME"
        
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
    
    echo "⏳ 等待 $INTERVAL 秒..."
    echo ""
    
    # 等待指定时间
    sleep $INTERVAL
done