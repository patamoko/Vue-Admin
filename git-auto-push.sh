#!/bin/bash

# Git自动推送脚本
# 功能：每隔指定时间自动提交并推送到GitHub
# 使用方法：./git-auto-push.sh [间隔秒数]
# 默认间隔：300秒（5分钟）

# 设置默认间隔时间
INTERVAL=${1:-300}

echo "🚀 启动Git自动推送模式..."
echo "📝 间隔时间：$INTERVAL 秒"
echo "📂 当前仓库：$(git rev-parse --show-toplevel)"
echo "🔍 按 Ctrl+C 停止自动推送"
echo ""

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

# 主循环
while true; do
    # 获取当前时间
    CURRENT_TIME=$(date "+%Y-%m-%d %H:%M:%S")
    
    # 检查是否有未提交的更改
    if git status | grep -q "Changes not staged for commit\|Untracked files"; then
        echo "📅 [$CURRENT_TIME] 发现文件变化，开始提交..."
        
        # 添加所有更改
        git add .
        
        # 提交更改
        git commit -m "自动同步：$CURRENT_TIME"
        
        # 推送到远程仓库
        if git push; then
            echo "✅ [$CURRENT_TIME] 成功推送到GitHub"
        else
            echo "❌ [$CURRENT_TIME] 推送失败，请检查网络连接"
        fi
    else
        echo "📅 [$CURRENT_TIME] 没有文件变化"
    fi
    
    echo "⏳ 等待 $INTERVAL 秒..."
    echo ""
    
    # 等待指定时间
    sleep $INTERVAL
done