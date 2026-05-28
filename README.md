# Vue 3 + TypeScript + Vite 充电站管理系统

这是一个基于 Vue 3、TypeScript 和 Vite 构建的现代化充电站管理系统，提供完整的充电站监控、故障管理、营收统计等功能。

## 项目特性

### 技术栈
- **前端框架**: Vue 3.3+ (Composition API + `<script setup>`)
- **类型系统**: TypeScript 5.0+
- **构建工具**: Vite 4.4+
- **UI 组件库**: Element Plus
- **状态管理**: Pinia
- **路由管理**: Vue Router 4
- **HTTP 客户端**: Axios
- **图表库**: ECharts
- **样式方案**: Less CSS

### 核心功能

#### 1. 充电站监控
- 实时监控充电站状态
- 充电站列表展示与筛选
- 新增/编辑/删除充电站
- 充电站状态统计（使用中、空闲中、维护中、待维修）

#### 2. 故障管理
- 故障充电站监控
- 故障状态筛选
- 设备详细信息查看
- 维保记录与使用记录管理

#### 3. 营收统计
- 实时营收数据展示
- 营收趋势图表分析
- 充电站营收排名
- 多维度数据统计（电费、服务费、停车费等）

#### 4. 订单管理
- 订单列表展示
- 订单详情查看
- 订单状态管理
- 批量操作功能

#### 5. 系统管理
- 用户权限管理
- 菜单配置
- 系统设置
- 日志记录

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm
pnpm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
# ESLint 检查
npm run lint

# TypeScript 类型检查
npm run typecheck
```

## 项目结构

```
Vue+Ts/
├── src/
│   ├── api/                 # API 接口定义
│   │   ├── chargingstation.ts  # 充电站相关接口
│   │   ├── operation.ts        # 订单操作接口
│   │   ├── system.ts           # 系统管理接口
│   │   └── user.ts             # 用户相关接口
│   ├── assets/              # 静态资源
│   │   ├── images/           # 图片资源
│   │   └── styles/           # 全局样式
│   ├── components/          # 公共组件
│   │   ├── StationForm/       # 充电站表单组件
│   │   └── TopHeader/         # 顶部导航组件
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useHttp.ts         # HTTP 请求 Hook
│   │   └── usePagination.ts   # 分页处理 Hook
│   ├── layouts/             # 布局组件
│   │   └── DefaultLayout.vue  # 默认布局
│   ├── router/              # 路由配置
│   │   ├── basicRouteMap.ts   # 路由映射
│   │   └── index.ts           # 路由入口
│   ├── store/               # 状态管理
│   │   ├── auth.ts            # 用户认证状态
│   │   ├── station.ts         # 充电站状态
│   │   └── tabs.ts            # 标签页状态
│   ├── types/               # TypeScript 类型定义
│   │   ├── station.ts         # 充电站类型
│   │   └── user.ts            # 用户类型
│   ├── views/               # 页面组件
│   │   ├── chargingstation/   # 充电站管理
│   │   │   ├── Fault.vue      # 故障管理
│   │   │   ├── Monitor.vue    # 充电站监控
│   │   │   └── Revenue.vue    # 营收统计
│   │   ├── dashboard/         # 首页仪表盘
│   │   ├── operations/        # 订单管理
│   │   └── Login.vue          # 登录页面
│   ├── App.vue              # 根组件
│   └── main.ts              # 应用入口
├── .env.development         # 开发环境变量
├── .env.production          # 生产环境变量
├── .eslintrc.cjs            # ESLint 配置
├── .gitignore               # Git 忽略文件
├── index.html               # HTML 模板
├── package.json             # 项目依赖
├── tsconfig.json            # TypeScript 配置
├── tsconfig.node.json       # TypeScript Node 配置
└── vite.config.ts           # Vite 配置
```

## 开发规范

### 代码风格
- 使用 TypeScript 进行类型安全开发
- 遵循 Vue 3 Composition API 规范
- 使用 `<script setup>` 语法糖
- 组件名使用 PascalCase 命名
- 变量和函数名使用 camelCase 命名
- 常量使用 UPPER_SNAKE_CASE 命名

### 组件开发
- 组件职责单一，避免大型组件
- 复杂逻辑抽离到自定义 Hooks
- 使用 PropType 定义组件 Props 类型
- 事件名使用 kebab-case 命名

### API 开发
- 统一使用 Axios 进行 HTTP 请求
- 接口返回数据使用泛型定义类型
- 统一的错误处理机制
- 请求参数和响应数据都要进行类型定义

### 状态管理
- 使用 Pinia 进行状态管理
- 按功能模块划分 Store
- 避免在组件中直接操作状态，使用 Action
- 复杂状态逻辑抽离到 Store 中

## 部署指南

### 生产环境部署

1. **构建项目**
```bash
npm run build
```

2. **部署到服务器**
将 `dist` 目录部署到任何静态文件服务器，如：
- Nginx
- Apache
- CDN 服务
- Vercel / Netlify 等 PaaS 平台

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    # 前端路由配置
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理配置
    location /api/ {
        proxy_pass http://your-api-server.com/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 Issue
- 发送邮件至 developer@example.com
- 加入技术交流群

---

**注意**: 这是一个演示项目，生产环境使用前请进行充分的安全测试和性能优化。