# 动力港 · 充电站运营管理平台
<p align="center">
  <img src="./src/assets/fable5-badge.png" alt="Fable5 Badge" width="200" />
  <br/>
  <strong>Claude Code Fable5</strong>
</p>
> 企业级新能源充电基础设施运营管理系统 — 覆盖充电站监控、营收分析、故障管理、订单运营、AI 智能助手等全链路业务场景

[![Vue](https://img.shields.io/badge/Vue-3.5-4fc08d?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Element Plus](https://img.shields.io/badge/Element_Plus-2.8-409eff?logo=element&logoColor=white)](https://element-plus.org/)
[![Pinia](https://img.shields.io/badge/Pinia-2.2-ffd859?logo=vue.js)](https://pinia.vuejs.org/)
[![ECharts](https://img.shields.io/badge/ECharts-5.6-aa344d)](https://echarts.apache.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)


---

## 目录

- [项目概述](#-项目概述)
- [技术架构](#-技术架构)
- [功能模块](#-功能模块)
- [项目结构](#-项目结构)
- [快速开始](#-快速开始)
- [开发指南](#-开发指南)
- [部署运维](#-部署运维)
- [版本计划](#-版本计划)

---

## 项目概述

**动力港**（Power Port）是面向充电站运营商的一站式管理后台。系统以 **Vue 3 Composition API + TypeScript** 为核心技术栈，采用模块化架构设计，通过 Mock.js 实现前后端分离开发模式下的数据模拟，覆盖从设备监控、营收分析、订单管理到 AI 辅助决策的完整业务闭环。

### 设计目标

| 维度 | 目标 |
|------|------|
| **可靠性** | TypeScript 全量类型覆盖，编译期拦截潜在错误 |
| **可维护性** | 组件职责单一，逻辑抽离至 Composables 与 Store |
| **可扩展性** | 路由与菜单配置化，权限模型支持动态扩展 |
| **用户体验** | 标签页式多页面管理、KeepAlive 缓存、AI 智能助手 |

### 演示账号

| 角色 | 用户名 | 密码 | 权限范围 |
|------|--------|------|----------|
| 管理员 | `admin` | `123456` | 全部功能 + 系统设置 + 权限管理 |
| 运营专员 | `user` | `123456` | 看板 / 充电站 / 地图 / 订单 / 报警 / 会员卡 |

---

## 技术架构

### 技术栈

```
┌─────────────────────────────────────────────────────┐
│                    展示层 (View)                      │
│  Vue 3 SFC  ·  Element Plus  ·  ECharts  ·  Less    │
├─────────────────────────────────────────────────────┤
│                   逻辑层 (Logic)                      │
│  Composition API  ·  Custom Hooks  ·  Pinia Store    │
├─────────────────────────────────────────────────────┤
│                    通信层 (Network)                   │
│  Axios (interceptors)  ·  Mock.js  ·  RESTful API    │
├─────────────────────────────────────────────────────┤
│                    构建层 (Build)                     │
│  Vite  ·  TypeScript  ·  ESLint  ·  Path Alias       │
└─────────────────────────────────────────────────────┘
```

### 核心依赖

| 类别 | 技术选型 | 说明 |
|------|----------|------|
| 框架 | Vue 3.5 (Composition API + `<script setup>`) | 渐进式响应式框架 |
| 语言 | TypeScript 5.5 | 静态类型检查 |
| 构建 | Vite 5.4 | 极速 HMR 与生产构建 |
| UI 库 | Element Plus 2.8 | 企业级组件库 |
| 状态管理 | Pinia 2.2 | 模块化 Store |
| 路由 | Vue Router 4.4 | SPA 路由 + 导航守卫 |
| 图表 | ECharts 5.6 | 数据可视化 |
| 地图 | AMap (高德地图) | 充电站地理可视化 |
| HTTP | Axios 1.7 | 请求拦截与统一错误处理 |
| Mock | Mock.js 1.1 | 开发阶段数据模拟 |
| 导出 | xlsx 0.18 + file-saver 2.0 | Excel 导入导出 |
| 富文本 | TinyMCE 5.1 | 文档编辑 |
| 样式 | Less 4.2 | CSS 预处理 |

---

## 功能模块

### 1. 数据看板 (Dashboard)
- 设备运行状态总览（使用率 / 异常数 / 空闲数）
- 充电量、充电时长、充电功率趋势图（折线图）
- 充电桩 / 充电站 / 充电杆分布（饼图）
- 各维度指标雷达图

### 2. 充电站管理 (Station Management)
- 充电站列表：分页查询、按名称 / 状态筛选
- 充电站 CRUD：新增、编辑、删除
- 充电桩状态面板：空闲 / 充电中 / 连接中 / 排队中 / 被预约 / 故障离线
- 充电桩详情抽屉：电压、电流、功率、温度等实时参数
- 充电记录时间轴

### 3. 营收统计 (Revenue)
- 各充电站营收明细表格（电费 / 服务费 / 停车费 / 月度总收入）
- 营收趋势对比图（销售 vs 访问量）
- 增长比率可视化（红跌绿涨）
- 会员储值金统计

### 4. 故障管理 (Fault)
- 故障设备实时监控列表
- 故障状态分类筛选
- 维保记录与使用记录关联查询

### 5. 电子地图 (Map)
- 高德地图集成，充电站地理分布可视化
- 站点 Marker 标注与信息窗

### 6. 运营管理 (Operations)
- 订单列表：分页查询、关键字搜索
- 订单详情：含充电曲线图、费用明细
- 计费管理：费率配置与总计统计
- 批量删除与 Excel 导出

### 7. 报警管理 (Alarm)
- 报警记录查询与处理
- 报警类型分类统计

### 8. 会员卡管理 (Membership)
- 会员卡信息管理
- 充值记录追踪

### 9. 招商管理 (Document)
- 招商文档编辑（TinyMCE 富文本）
- 权限控制：仅管理员与经理可访问

### 10. 系统设置 (System)
- 用户权限管理（按钮级 + 页面级）
- 角色分配与菜单动态配置

### 11. 个人中心 (Personal)
- 用户个人信息展示与编辑

### 12. AI 智能助手 (AI Chat) 🆕
- ChatGPT 风格对话界面，多会话管理
- 智能路由回复：数据分析 / 方案策划 / 代码编写 / 行业问答
- 消息复制、重新生成、打字动画
- 侧边栏可折叠，支持对话历史管理

---

## 项目结构

```
Vue+Ts/
├── public/                        # 静态资源（不经构建处理）
├── src/
│   ├── api/                       # API 接口层（按业务域拆分）
│   │   ├── alarm.ts               #   报警接口
│   │   ├── chargingstation.ts     #   充电站接口
│   │   ├── dashboard.ts           #   看板接口
│   │   ├── document.ts            #   文档接口
│   │   ├── map.ts                 #   地图接口
│   │   ├── operation.ts           #   订单接口
│   │   ├── system.ts              #   系统设置接口
│   │   └── user.ts                #   用户认证接口
│   │
│   ├── assets/                    # 静态资源（图片 / SVG）
│   ├── components/                # 可复用组件
│   │   ├── map/                   #   地图容器组件
│   │   ├── navMenu/               #   侧边栏导航菜单（递归）
│   │   ├── StationForm/           #   充电站表单组件
│   │   └── TopHeader/             #   顶部导航栏
│   │
│   ├── directives/                # 自定义指令
│   │   └── permission.ts          #   按钮级权限指令 (v-permission)
│   │
│   ├── hooks/                     # 组合式函数 (Composables)
│   │   ├── useChart.ts            #   ECharts 图表初始化逻辑
│   │   └── useHttp.ts             #   HTTP 请求状态管理
│   │
│   ├── layouts/                   # 布局组件
│   │   ├── DefaultLayout.vue      #   默认布局（侧边栏 + 顶栏 + 主区域）
│   │   └── TabsLayout.vue         #   标签页布局（KeepAlive 缓存）
│   │
│   ├── mock/                      # Mock 数据与接口模拟
│   │   └── index.ts               #   全量 Mock 定义（含 AI Chat 接口）
│   │
│   ├── router/                    # 路由配置
│   │   ├── basicRouteMap.ts       #   路由映射表
│   │   ├── guard.ts               #   路由守卫（登录鉴权）
│   │   └── index.ts               #   路由实例创建
│   │
│   ├── store/                     # Pinia 状态管理
│   │   ├── add.ts                 #   新增数据暂存
│   │   ├── auth.ts                #   用户认证与权限
│   │   ├── station.ts             #   充电站数据
│   │   └── tabs.ts                #   标签页状态
│   │
│   ├── types/                     # TypeScript 类型声明
│   │   ├── station/               #   充电站类型
│   │   └── user/                  #   用户与菜单类型
│   │
│   ├── utils/                     # 工具函数
│   │   ├── axios.ts               #   Axios 实例与拦截器
│   │   ├── http.ts                #   GET / POST 请求封装
│   │   ├── toThousands.ts         #   数字千分位格式化
│   │   └── transformMenu.ts       #   菜单数据转换
│   │
│   ├── views/                     # 页面视图（按业务模块划分）
│   │   ├── aichat/                #   AI 智能助手
│   │   ├── alarm/                 #   报警管理
│   │   ├── chargingstation/       #   充电站管理（监控 / 营收 / 故障）
│   │   ├── dashboard/             #   数据看板
│   │   ├── document/              #   招商管理
│   │   ├── equipment/             #   会员卡管理
│   │   ├── map/                   #   电子地图
│   │   ├── operations/            #   运营管理（订单 / 计费）
│   │   ├── personal/              #   个人中心
│   │   ├── system/                #   系统设置
│   │   ├── Login.vue              #   登录页
│   │   ├── NotFound.vue           #   404 页面
│   │   └── Test.vue               #   开发调试页
│   │
│   ├── App.vue                    # 根组件
│   ├── main.ts                    # 应用入口（挂载插件链）
│   ├── style.less                 # 全局样式
│   └── vite-env.d.ts              # Vite 环境类型声明
│
├── .env.development               # 开发环境变量
├── .env.production                # 生产环境变量
├── .eslintrc.cjs                  # ESLint 配置
├── index.html                     # HTML 入口
├── package.json
├── tsconfig.json                  # TypeScript 项目引用
├── tsconfig.app.json              #   应用 TS 配置
├── tsconfig.node.json             #   Node 侧 TS 配置
└── vite.config.ts                 # Vite 配置（路径别名）
```

---

## 快速开始

### 环境要求

| 依赖 | 最低版本 |
|------|----------|
| Node.js | `>= 16.0.0` |
| npm | `>= 8.0.0` |

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/patamoko/Vue-Admin.git
cd Vue+Ts

# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev
```

### 可用脚本

```bash
npm run dev        # 启动 Vite 开发服务器（HMR）
npm run build      # TypeScript 类型检查 + Vite 生产构建
npm run preview    # 本地预览生产构建产物
```

---

## 开发指南

### 架构约定

- **目录命名**：页面视图按业务模块分目录，组件使用 PascalCase，工具函数使用 camelCase
- **组件规范**：统一使用 `<script setup lang="ts">` 语法，Props 通过 `defineProps<T>()` 声明类型
- **状态管理**：全局状态放入 Pinia Store（`auth` / `tabs` / `station`），局部状态使用 `ref` / `reactive`
- **HTTP 请求**：一律通过 `@/utils/http` 的 `get()` / `post()` 方法发起，享受统一的拦截器与错误处理
- **权限控制**：页面级权限通过路由 `meta.needAuth` 声明角色，按钮级权限通过 `v-permission` 指令控制

### Mock 数据说明

项目使用 Mock.js 模拟全部后端接口，Mock 劫持 `XMLHttpRequest`，无需启动后端服务即可进行全功能开发与演示。Mock 规则集中定义在 `src/mock/index.ts`，包含：

- 用户登录与权限菜单下发
- 充电站 / 充电桩 CRUD
- ECharts 图表数据集
- 营收统计分页查询
- AI Chat 智能回复

切换到真实后端时，删除 `src/mock/index.ts` 的 `import` 即可。

### 路由权限模型

```
登录 → 后端返回 roles + menulist → 存入 Pinia + sessionStorage
  ├─ 菜单根据 menulist 动态渲染（src/components/navMenu/）
  ├─ 路由守卫拦截未登录访问（src/router/guard.ts）
  └─ 按钮通过 v-permission 指令控制显隐
```

---

## 部署运维

### 生产构建

```bash
npm run build
```

产物输出至 `dist/` 目录，包含所有静态资源（JS / CSS / 图片）。

### Nginx 部署

```nginx
server {
    listen       80;
    server_name  powerport.example.com;

    root   /usr/share/nginx/html/powerport;
    index  index.html;

    # SPA 路由回退
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 反向代理
    location /api/ {
        proxy_pass http://backend-service:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 静态资源强缓存
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Docker 部署 (推荐)

```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

---

## 版本计划

| 版本 | 计划内容 | 状态 |
|------|----------|------|
| v1.0 | 核心业务模块（监控 / 营收 / 故障 / 订单 / 权限） | ✅ 已完成 |
| v1.1 | AI 智能助手、地图可视化增强 | ✅ 已完成 |
| v1.2 | 真实后端接入、WebSocket 实时数据推送 | 规划中 |
| v2.0 | 微前端架构升级、移动端适配 | 远期规划 |

---

## 许可证

本项目基于 [MIT License](./LICENSE) 开源。

---

**Made with ❤️ by patamoko** | [GitHub](https://github.com/patamoko/Vue-Admin)
