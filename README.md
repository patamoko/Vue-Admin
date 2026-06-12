# 充电站管理系统 | Charging Station Management System

> 基于 Vue 3 + TypeScript + Vite 构建的企业级充电站管理后台

![Vue](https://img.shields.io/badge/Vue-3.3+-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Vite](https://img.shields.io/badge/Vite-4.4+-purple)
![Element Plus](https://img.shields.io/badge/Element%20Plus-latest-orange)
![Pinia](https://img.shields.io/badge/Pinia-latest-green)


## 📋 项目概述

本项目是一个功能完善的充电站管理后台系统，涵盖充电站监控、故障管理、营收统计、订单管理等核心业务模块。采用现代化的前端技术栈，实现了组件化开发、类型安全、状态管理等企业级开发规范。

## 🛠 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | 3.3+ | 核心框架（Composition API） |
| TypeScript | 5.0+ | 类型安全 |
| Vite | 4.4+ | 构建工具 |
| Element Plus | latest | UI 组件库 |
| Pinia | latest | 状态管理 |
| Vue Router | 4.x | 路由管理 |
| Axios | latest | HTTP 客户端 |
| Mapbox GL JS | latest | 地图可视化 |
| ECharts | 5.x | 数据可视化 |
| Less | latest | CSS 预处理器 |

## ✨ 核心功能

### 1. 充电站监控模块
- 充电站列表展示与状态筛选
- 充电站新增/编辑/删除操作
- 实时状态统计（使用中/空闲/维护/待维修）
- 地图可视化展示充电站分布

### 2. 故障管理模块
- 故障设备实时监控
- 故障状态筛选与分类
- 设备详细信息查看
- 维保记录与使用记录管理

### 3. 营收统计模块
- 实时营收数据展示
- 营收趋势图表分析
- 多维度数据统计（电费/服务费/停车费）
- 充电站营收排名

### 4. 订单管理模块
- 订单列表展示与分页
- 订单详情查看与状态管理
- 批量删除与导出功能
- 动态标签页管理

### 5. 系统管理模块
- 用户权限管理
- 菜单动态配置
- 系统设置与日志记录

## 🏗 项目架构

```
Vue+Ts/
├── src/
│   ├── api/                 # API 接口层
│   │   ├── chargingstation.ts  # 充电站接口
│   │   ├── operation.ts        # 订单接口
│   │   ├── system.ts           # 系统接口
│   │   └── user.ts             # 用户接口
│   ├── assets/              # 静态资源
│   ├── components/          # 公共组件
│   │   ├── StationForm/       # 充电站表单
│   │   └── TopHeader/         # 顶部导航
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useHttp.ts         # HTTP 请求封装
│   │   └── usePagination.ts   # 分页逻辑复用
│   ├── layouts/             # 布局组件
│   ├── router/              # 路由配置
│   │   ├── basicRouteMap.ts   # 路由映射
│   │   ├── guard.ts           # 路由守卫
│   │   └── index.ts           # 路由入口
│   ├── store/               # Pinia 状态管理
│   │   ├── auth.ts            # 用户认证
│   │   ├── station.ts         # 充电站状态
│   │   └── tabs.ts            # 标签页管理
│   ├── types/               # TypeScript 类型定义
│   ├── utils/               # 工具函数
│   │   ├── axios.ts           # Axios 封装
│   │   └── http.ts            # HTTP 请求封装
│   ├── views/               # 页面组件
│   │   ├── chargingstation/   # 充电站管理
│   │   ├── operations/        # 订单管理
│   │   ├── dashboard/         # 首页仪表盘
│   │   └── Login.vue          # 登录页
│   ├── App.vue              # 根组件
│   └── main.ts              # 应用入口
├── .env.development         # 开发环境变量
├── .env.production          # 生产环境变量
├── package.json             # 项目依赖
├── tsconfig.json            # TypeScript 配置
└── vite.config.ts           # Vite 配置
```

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装与运行

```bash
# 1. 克隆项目
git clone https://github.com/patamoko/Vue-Admin.git

# 2. 进入项目目录
cd Vue+Ts

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev

# 5. 访问 http://localhost:5173
```

### 常用命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run preview  # 预览生产版本
npm run lint     # ESLint 代码检查
npm run typecheck # TypeScript 类型检查
```

## 💡 技术亮点

### 1. 组件化开发
- 采用 Vue 3 Composition API + `<script setup>` 语法
- 组件职责单一，逻辑抽离到自定义 Hooks
- 高复用组件设计（表单、表格、分页等）

### 2. 类型安全
- 全面使用 TypeScript，提供完整的类型定义
- 接口返回数据使用泛型定义
- 减少运行时错误，提升代码可维护性

### 3. 状态管理
- 使用 Pinia 进行模块化状态管理
- 标签页管理、用户认证、充电站数据独立 Store
- 避免组件间复杂的 props 传递

### 4. 路由权限控制
- 路由守卫实现登录验证
- 动态路由配置，支持权限控制
- 标签页缓存，提升用户体验

### 5. HTTP 请求封装
- Axios 拦截器统一处理请求/响应
- 统一的错误提示机制
- 请求超时与重试机制

## 📦 部署指南

### 生产构建

```bash
npm run build
```

构建完成后，`dist` 目录包含所有静态资源，可部署到：
- Nginx / Apache
- CDN 服务
- Vercel / Netlify 等 PaaS 平台

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://your-api-server.com/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📊 项目成果

- ✅ 完成充电站管理核心业务功能开发
- ✅ 实现组件化、模块化架构设计
- ✅ 应用 TypeScript 提升代码质量
- ✅ 集成 ECharts 实现数据可视化
- ✅ 实现路由权限控制与状态管理
- ✅ 编写自动化脚本提升开发效率

## 📝 开发规范

- 使用 TypeScript 进行类型安全开发
- 遵循 Vue 3 Composition API 规范
- 组件名使用 PascalCase，变量使用 camelCase
- 复杂逻辑抽离到自定义 Hooks
- 统一使用 Axios 进行 HTTP 请求
- 接口返回数据使用泛型定义类型

## 📄 许可证

本项目采用 MIT 许可证

---

**开发者**: patamoko  
**仓库地址**: https://github.com/patamoko/Vue-Admin  
**技术栈**: Vue 3 + TypeScript + Vite + Element Plus + Pinia
