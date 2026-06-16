<template>
    <div class="chat-container">
        <!-- 侧边栏 - 对话历史 -->
        <div class="chat-sidebar" :class="{ collapsed: sidebarCollapsed }">
            <div class="sidebar-header">
                <el-button type="primary" class="new-chat-btn" @click="startNewChat">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <span v-if="!sidebarCollapsed">新建对话</span>
                </el-button>
                <el-button :icon="sidebarCollapsed ? Expand : Fold" circle size="small" class="toggle-btn"
                    @click="sidebarCollapsed = !sidebarCollapsed" />
            </div>
            <div class="conversation-list" v-if="!sidebarCollapsed">
                <div v-for="conv in conversations" :key="conv.id" class="conv-item"
                    :class="{ active: conv.id === currentConversationId }" @click="switchConversation(conv.id)">
                    <el-icon>
                        <ChatDotRound />
                    </el-icon>
                    <span class="conv-title">{{ conv.title }}</span>
                    <el-icon class="delete-conv" @click.stop="deleteConversation(conv.id)">
                        <Delete />
                    </el-icon>
                </div>
                <div v-if="conversations.length === 0" class="empty-conv">
                    暂无对话记录
                </div>
            </div>
        </div>

        <!-- 主聊天区域 -->
        <div class="chat-main">
            <!-- 顶部栏 -->
            <div class="chat-topbar">
                <div class="topbar-left">
                    <el-icon :size="22" class="model-icon" :style="{ color: 'var(--chat-primary, #4f6ef7)' }">
                        <Cpu />
                    </el-icon>
                    <span class="model-name">AI 智能助手</span>
                    <el-tag size="small" type="info" class="model-tag">v1.0</el-tag>
                </div>
                <div class="topbar-right">
                    <el-button circle size="small" @click="clearCurrentChat">
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </el-button>
                </div>
            </div>

            <!-- 消息列表 -->
            <div class="message-list" ref="messageListRef">
                <!-- 欢迎界面 -->
                <div v-if="currentMessages.length === 0" class="welcome-area">
                    <div class="welcome-icon">
                        <el-icon :size="60" color="#4f6ef7">
                            <Cpu />
                        </el-icon>
                    </div>
                    <h2>你好，我是 AI 智能助手</h2>
                    <p class="welcome-subtitle">可以帮你解答问题、编写代码、分析数据等</p>
                    <div class="suggestion-cards">
                        <div v-for="sg in suggestions" :key="sg.title" class="suggestion-card"
                            @click="sendMessage(sg.prompt)">
                            <el-icon :size="18">
                                <component :is="sg.icon" />
                            </el-icon>
                            <div class="sg-info">
                                <span class="sg-title">{{ sg.title }}</span>
                                <span class="sg-desc">{{ sg.desc }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 消息 -->
                <div v-for="(msg, idx) in currentMessages" :key="idx" class="message-row" :class="msg.role">
                    <div class="message-avatar">
                        <el-avatar v-if="msg.role === 'user'" :size="36" icon="UserFilled"
                            :style="{ backgroundColor: '#4f6ef7' }" />
                        <el-avatar v-else :size="36" :style="{ backgroundColor: '#19c37d' }">
                            <el-icon :size="20">
                                <Cpu />
                            </el-icon>
                        </el-avatar>
                    </div>
                    <div class="message-content">
                        <div class="message-role-name">
                            {{ msg.role === 'user' ? '你' : 'AI 助手' }}
                        </div>
                        <div class="message-text" v-html="renderMessage(msg.content)"></div>
                        <!-- 打字动画 -->
                        <div v-if="msg.typing" class="typing-indicator">
                            <span class="typing-dot"></span>
                            <span class="typing-dot"></span>
                            <span class="typing-dot"></span>
                        </div>
                        <div class="message-time">{{ msg.time }}</div>
                        <div v-if="msg.role === 'assistant' && !msg.typing" class="message-actions">
                            <el-button link size="small" @click="copyMessage(msg.content)">
                                <el-icon>
                                    <CopyDocument />
                                </el-icon>
                                复制
                            </el-button>
                            <el-button link size="small" @click="regenerateMessage(idx)">
                                <el-icon>
                                    <Refresh />
                                </el-icon>
                                重新生成
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 输入区域 -->
            <div class="chat-input-area">
                <div class="input-wrapper">
                    <el-input v-model="inputText" type="textarea" :rows="1" :autosize="{ minRows: 1, maxRows: 5 }"
                        placeholder="输入消息，Enter 发送，Shift+Enter 换行" class="chat-input" @keydown.enter.exact="handleEnter"
                        :disabled="loading" resize="none" />
                    <div class="input-actions">
                        <el-button type="primary" :icon="Promotion" circle class="send-btn"
                            :disabled="!inputText.trim() || loading" @click="sendMessage(inputText)" />
                    </div>
                </div>
                <p class="input-hint">AI 助手可能会产生不准确的信息，请注意甄别。</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import {
    Plus, Fold, Expand, ChatDotRound, Delete, Cpu, Promotion,
    CopyDocument, Refresh, DataLine, Document, Edit, InfoFilled
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { post } from '@/utils/http'

// ==================== 类型定义 ====================
interface Message {
    role: 'user' | 'assistant'
    content: string
    time: string
    typing?: boolean
}

interface Conversation {
    id: number
    title: string
    messages: Message[]
}

// ==================== 状态 ====================
const sidebarCollapsed = ref(false)
const conversations = ref<Conversation[]>([])
const currentConversationId = ref(0)
const inputText = ref('')
const loading = ref(false)
const messageListRef = ref<HTMLElement>()

// ==================== 推荐问题 ====================
const suggestions = [
    { icon: 'DataLine', title: '数据分析', desc: '帮我分析充电站运营数据', prompt: '请帮我分析充电站的运营数据，包括充电量趋势和营收情况。' },
    { icon: 'Document', title: '方案策划', desc: '制定充电站推广方案', prompt: '请帮我制定一个充电站的推广运营方案。' },
    { icon: 'Edit', title: '代码编写', desc: '编写前端组件代码', prompt: '请帮我用 Vue 3 + TypeScript 写一个数据表格组件。' },
    { icon: 'InfoFilled', title: '知识问答', desc: '了解充电站行业知识', prompt: '请介绍一下充电站行业的发展趋势和关键技术。' },
]

// ==================== 计算属性 ====================
const currentMessages = computed(() => {
    const conv = conversations.value.find(c => c.id === currentConversationId.value)
    return conv?.messages || []
})

// ==================== 方法 ====================

// 获取当前时间字符串
function getTimeStr(): string {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

// 创建新对话
function startNewChat() {
    sidebarCollapsed.value = false
    const newConv: Conversation = {
        id: Date.now(),
        title: '新的对话',
        messages: []
    }
    conversations.value.unshift(newConv)
    currentConversationId.value = newConv.id
}

// 切换对话
function switchConversation(id: number) {
    currentConversationId.value = id
}

// 删除对话
function deleteConversation(id: number) {
    conversations.value = conversations.value.filter(c => c.id !== id)
    if (currentConversationId.value === id) {
        currentConversationId.value = conversations.value[0]?.id || 0
    }
}

// 清空当前对话
function clearCurrentChat() {
    const conv = conversations.value.find(c => c.id === currentConversationId.value)
    if (conv) {
        conv.messages = []
        conv.title = '新的对话'
    }
}

// 发送消息
async function sendMessage(text: string) {
    const content = text.trim()
    if (!content || loading.value) return

    // 自动创建对话
    if (currentConversationId.value === 0 || !conversations.value.find(c => c.id === currentConversationId.value)) {
        startNewChat()
    }

    const conv = conversations.value.find(c => c.id === currentConversationId.value)!

    // 添加用户消息
    conv.messages.push({
        role: 'user',
        content,
        time: getTimeStr()
    })

    // 更新对话标题
    if (conv.title === '新的对话') {
        conv.title = content.length > 20 ? content.slice(0, 20) + '...' : content
    }

    inputText.value = ''
    loading.value = true
    scrollToBottom()

    // 添加一条占位的 AI 消息（带打字动画）
    const aiMsg: Message = {
        role: 'assistant',
        content: '',
        time: getTimeStr(),
        typing: true
    }
    conv.messages.push(aiMsg)
    scrollToBottom()

    // 模拟 AI 回复（调用 mock API）
    try {
        const response = await fetchAiResponse(content)
        aiMsg.typing = false
        aiMsg.content = response
        aiMsg.time = getTimeStr()
    } catch {
        aiMsg.typing = false
        aiMsg.content = '抱歉，回复生成失败，请稍后重试。'
        ElMessage.error('AI 回复失败，请稍后重试')
    }

    loading.value = false
    scrollToBottom()
}

// 调用 AI 接口
async function fetchAiResponse(prompt: string): Promise<string> {
    try {
        const res = await post('https://www.demo.com/ai/chat', {
            prompt,
            conversationId: currentConversationId.value
        })
        return res.data?.reply || '收到您的消息了。'
    } catch (err: any) {
        // API 调用失败时弹出错误提示，并回退到本地回复
        ElMessage.error(err?.message || 'AI 接口请求失败，已切换到离线模式')
        return generateLocalResponse(prompt)
    }
}

// 本地 fallback 回复
function generateLocalResponse(prompt: string): string {
    const responses = [
        `关于 **"${prompt.slice(0, 30)}${prompt.length > 30 ? '...' : ''}"** 这个问题，以下是我的分析：\n\n首先，我们需要从多个角度来思考这个问题。充电站行业正处于快速发展阶段，技术创新和运营优化是核心竞争力。\n\n### 关键要点\n\n1. **数据驱动决策**：通过分析充电量、用户行为等数据来优化运营策略\n2. **智能化管理**：利用 AI 技术进行预测维护和智能调度\n3. **用户体验优先**：简化操作流程，提供更便捷的充电服务\n\n如果您需要更具体的方案，可以告诉我更多细节，我会为您提供更有针对性的建议。`,
        `感谢您的提问！\n\n针对您关心的内容，我整理了以下信息：\n\n| 方面 | 说明 |\n|------|------|\n| 技术架构 | 采用 Vue 3 + TypeScript 现代化技术栈 |\n| 数据管理 | Pinia 状态管理 + Axios 请求封装 |\n| UI 框架 | Element Plus 组件库 |\n\n这是一个比较完善的解决方案。有什么我可以进一步帮您了解的吗？`,
        `好问题！让我来为你详细解答。\n\n根据当前的行业趋势和最佳实践：\n\n\`\`\`typescript\n// 示例代码\ninterface StationData {\n    name: string\n    capacity: number\n    utilization: number\n}\n\nfunction analyzeStations(data: StationData[]) {\n    return data\n        .filter(s => s.utilization > 0.5)\n        .sort((a, b) => b.capacity - a.capacity)\n}\n\`\`\`\n\n以上是一个简单的数据分析示例。如果您有更多需求，欢迎继续提问！`,
        `你好！很高兴能帮到你。\n\n关于这个问题，我建议从以下几个方面入手：\n\n1. 📊 **收集数据** — 了解现状，获取关键指标\n2. 🎯 **明确目标** — 设定可量化的改进目标\n3. 🔧 **实施方案** — 分阶段推进，持续迭代\n4. 📈 **评估效果** — 通过数据反馈验证效果\n\n需要我展开说明其中某个步骤吗？`
    ]
    return responses[Math.floor(Math.random() * responses.length)]
}

// 重新生成回复
async function regenerateMessage(idx: number) {
    const conv = conversations.value.find(c => c.id === currentConversationId.value)
    if (!conv) return

    const msg = conv.messages[idx]
    if (msg.role !== 'assistant') return

    // 找到对应的用户消息
    const userMsg = conv.messages[idx - 1]
    if (!userMsg || userMsg.role !== 'user') return

    msg.typing = true
    msg.content = ''
    loading.value = true

    try {
        const response = await fetchAiResponse(userMsg.content)
        msg.typing = false
        msg.content = response
        msg.time = getTimeStr()
    } catch {
        msg.typing = false
        msg.content = '抱歉，重新生成失败，请稍后重试。'
    }

    loading.value = false
}

// 复制消息
function copyMessage(content: string) {
    navigator.clipboard.writeText(content).then(() => {
        ElMessage.success('已复制到剪贴板')
    }).catch(() => {
        ElMessage.error('复制失败')
    })
}

// 渲染消息（简单 markdown 支持）
function renderMessage(text: string): string {
    if (!text) return ''
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br/>')
        .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre class="code-block"><code>$2</code></pre>')
        .replace(/\|(.+)\|/g, (match: string) => {
            const cells = match.split('|').filter(c => c.trim())
            return '<tr>' + cells.map((c: string) => `<td>${c.trim()}</td>`).join('') + '</tr>'
        })
}

// 回车发送
function handleEnter(e: KeyboardEvent) {
    if (!e.shiftKey) {
        e.preventDefault()
        sendMessage(inputText.value)
    }
}

// 滚动到底部
function scrollToBottom() {
    nextTick(() => {
        if (messageListRef.value) {
            messageListRef.value.scrollTop = messageListRef.value.scrollHeight
        }
    })
}

// 初始化：创建第一个对话
if (conversations.value.length === 0) {
    startNewChat()
}
</script>

<style lang="less" scoped>
.chat-container {
    // CSS 变量
    --chat-primary: #4f6ef7;
    --chat-bg: #f8f9fb;
    --chat-sidebar-bg: #1e1e2f;
    --chat-sidebar-hover: #2a2a3d;
    --chat-user-bubble: #4f6ef7;
    --chat-ai-bubble: #ffffff;
    --chat-border: #e8eaed;
    display: flex;
    height: calc(100vh - 140px);
    background: #f0f2f5;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
}

// ============ 侧边栏 ============
.chat-sidebar {
    width: 280px;
    min-width: 60px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    transition: width 0.25s ease;
    border-right: 1px solid rgba(0, 0, 0, 0.06);

    &.collapsed {
        width: 60px;
    }

    .sidebar-header {
        padding: 16px 12px;
        display: flex;
        align-items: center;
        gap: 8px;

        .new-chat-btn {
            flex: 1;
            background: #fff;
            color: #333;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;

            &:hover {
                background: #f5f5f5;
                border-color: #ccc;
            }
        }

        .toggle-btn {
            color: #666;
            background: transparent;
            border-color: transparent;
            flex-shrink: 0;

            &:hover {
                color: #333;
                background: rgba(0, 0, 0, 0.04);
            }
        }
    }

    .conversation-list {
        flex: 1;
        overflow-y: auto;
        padding: 0 8px;

        .conv-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 12px;
            margin-bottom: 4px;
            border-radius: 8px;
            cursor: pointer;
            color: #555;
            font-size: 14px;
            transition: all 0.15s;

            &:hover {
                background: rgba(0, 0, 0, 0.04);
                color: #333;

                .delete-conv {
                    opacity: 1;
                }
            }

            &.active {
                background: rgba(79, 110, 247, 0.08);
                color: #4f6ef7;
            }

            .conv-title {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .delete-conv {
                opacity: 0;
                transition: opacity 0.15s;
                font-size: 13px;

                &:hover {
                    color: #ff4d4f;
                }
            }
        }

        .empty-conv {
            text-align: center;
            color: #999;
            font-size: 13px;
            padding: 40px 0;
        }
    }
}

// ============ 主区域 ============
.chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #f8f9fb;
    min-width: 0;
}

// 顶部栏
.chat-topbar {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    background: #fff;
    border-bottom: 1px solid #e8eaed;

    .topbar-left {
        display: flex;
        align-items: center;
        gap: 10px;

        .model-icon {
            color: #4f6ef7;
        }

        .model-name {
            font-size: 15px;
            font-weight: 600;
            color: #1a1a2e;
        }

        .model-tag {
            font-size: 11px;
        }
    }
}

// 消息列表
.message-list {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    scroll-behavior: smooth;

    // 欢迎界面
    .welcome-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 400px;
        text-align: center;

        .welcome-icon {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: linear-gradient(135deg, #eef2ff, #e0e7ff);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
        }

        h2 {
            font-size: 24px;
            color: #1a1a2e;
            margin-bottom: 8px;
        }

        .welcome-subtitle {
            color: #999;
            font-size: 14px;
            margin-bottom: 32px;
        }

        .suggestion-cards {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            max-width: 560px;

            .suggestion-card {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 14px 16px;
                background: #fff;
                border: 1px solid #e8eaed;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.15s;
                text-align: left;

                &:hover {
                    border-color: #4f6ef7;
                    box-shadow: 0 2px 8px rgba(79, 110, 247, 0.1);
                }

                .el-icon {
                    color: #4f6ef7;
                    margin-top: 2px;
                }

                .sg-info {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;

                    .sg-title {
                        font-size: 14px;
                        font-weight: 600;
                        color: #1a1a2e;
                    }

                    .sg-desc {
                        font-size: 12px;
                        color: #999;
                    }
                }
            }
        }
    }

    // 消息行
    .message-row {
        display: flex;
        gap: 14px;
        margin-bottom: 28px;
        max-width: 820px;

        &.user {
            margin-left: auto;
            flex-direction: row-reverse;

            .message-content {
                align-items: flex-end;

                .message-role-name {
                    text-align: right;
                }

                .message-text {
                    background: #4f6ef7;
                    color: #fff;
                    border-radius: 16px 4px 16px 16px;
                }
            }
        }

        &.assistant {
            .message-text {
                background: #fff;
                color: #333;
                border-radius: 4px 16px 16px 16px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
            }
        }

        .message-avatar {
            flex-shrink: 0;
        }

        .message-content {
            display: flex;
            flex-direction: column;
            gap: 6px;
            min-width: 0;

            .message-role-name {
                font-size: 12px;
                color: #999;
                font-weight: 500;
            }

            .message-text {
                padding: 12px 16px;
                font-size: 14px;
                line-height: 1.7;
                word-break: break-word;
                white-space: pre-wrap;

                :deep(p) {
                    margin-bottom: 8px;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }

                :deep(strong) {
                    font-weight: 600;
                }

                :deep(.code-block) {
                    background: #1e1e2e;
                    color: #e0e0e0;
                    padding: 14px 18px;
                    border-radius: 8px;
                    margin: 10px 0;
                    font-size: 13px;
                    font-family: 'SF Mono', 'Fira Code', 'Monaco', monospace;
                    overflow-x: auto;
                }

                :deep(table) {
                    border-collapse: collapse;
                    margin: 10px 0;
                    width: 100%;

                    td {
                        border: 1px solid #e0e0e0;
                        padding: 8px 12px;
                        font-size: 13px;
                    }
                }
            }

            .message-time {
                font-size: 11px;
                color: #bbb;
            }

            .message-actions {
                display: flex;
                gap: 4px;

                .el-button {
                    font-size: 12px;
                    color: #999;

                    &:hover {
                        color: #4f6ef7;
                    }
                }
            }
        }
    }
}

// 打字动画
.typing-indicator {
    display: flex;
    gap: 4px;
    padding: 8px 0;

    .typing-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #bbb;
        animation: typingBounce 1.4s infinite ease-in-out both;

        &:nth-child(1) {
            animation-delay: -0.32s;
        }

        &:nth-child(2) {
            animation-delay: -0.16s;
        }

        &:nth-child(3) {
            animation-delay: 0s;
        }
    }
}

@keyframes typingBounce {

    0%,
    80%,
    100% {
        transform: scale(0.6);
        opacity: 0.4;
    }

    40% {
        transform: scale(1);
        opacity: 1;
    }
}

// 底部输入区
.chat-input-area {
    padding: 16px 24px 20px;
    background: #fff;
    border-top: 1px solid #e8eaed;

    .input-wrapper {
        display: flex;
        align-items: flex-end;
        gap: 10px;
        background: #f5f6f8;
        border-radius: 12px;
        padding: 8px 12px;
        border: 1px solid transparent;
        transition: border-color 0.2s;

        &:focus-within {
            border-color: #4f6ef7;
            background: #fff;
        }

        .chat-input {
            flex: 1;

            :deep(.el-textarea__inner) {
                background: transparent;
                border: none;
                box-shadow: none;
                font-size: 14px;
                line-height: 1.6;
                padding: 4px 0;
                resize: none;

                &:focus {
                    box-shadow: none;
                }
            }
        }

        .send-btn {
            flex-shrink: 0;
            background: #4f6ef7;
            border-color: #4f6ef7;
            transition: all 0.2s;

            &:hover:not(:disabled) {
                background: #5c7bf7;
                transform: scale(1.05);
            }

            &:disabled {
                background: #d0d5e0;
                border-color: #d0d5e0;
            }
        }
    }

    .input-hint {
        text-align: center;
        font-size: 11px;
        color: #bbb;
        margin-top: 8px;
    }
}
</style>
