#!/bin/bash

# 自动同步脚本
# 功能：监控文件变化，自动提交并推送到GitHub

echo "🚀 启动自动同步模式..."
echo "📝 提示：修改文件后会自动提交，按 Ctrl+C 停止"

# 初始提交
git add .
git commit -m "自动同步：初始提交"
git push

# 监控文件变化
while true; do
    # 检查是否有文件变化
    if git status | grep -q "Changes not staged for commit\|Untracked files"; then
        # 获取当前时间
        current_time=$(date "+%Y-%m-%d %H:%M:%S")
        
        # 提交并推送
        git add .
        git commit -m "自动同步：$current_time"
        git push
        
        echo "✅ [$current_time] 已自动同步到GitHub"
    fi
    
    # 每10秒检查一次
    sleep 10
done
