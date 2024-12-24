# 虚拟助教系统维护文档

## 1. 系统架构

### 1.1 技术栈
#### 前端技术
- React 18 + TypeScript (基础框架)
- Ant Design 5.x (UI组件库)
- Axios (HTTP请求)
- React-Markdown (Markdown渲染)
- PrismJS (代码高亮)

#### 后端技术
- Python 3.9+ + FastAPI (Web框架)
- Uvicorn (ASGI服务器)
- Anthropic Claude API / OpenAI API (AI服务)
- Pydantic (数据验证)

### 1.2 核心功能模块
- AI对话系统
- Markdown渲染
- 代码高亮

## 2. 项目结构

project-root/
├── client/                          # 前端项目目录
│   ├── public/                     # 公共资源目录
│   │   ├── index.html             # HTML入口文件
│   │   ├── manifest.json          # PWA配置文件
│   │   ├── favicon.ico            # 网站图标
│   │   ├── logo192.png           # 小尺寸logo
│   │   └── logo512.png           # 大尺寸logo
│   ├── package.json               # npm 配置文件
│   ├── package-lock.json         # npm 依赖锁定文件
│   ├── tsconfig.json             # TypeScript 配置
│   ├── src/
│   │   ├── components/            # React组件
│   │   │   ├── Chat/             # 对话组件
│   │   │   │   ├── ChatInput.tsx    # 输入框
│   │   │   │   ├── ChatMessage.tsx  # 消息气泡
│   │   │   │   └── ChatWindow.tsx   # 对话窗口
│   │   │   └── Common/           # 通用组件
│   │   │       └── Loading.tsx      # 加载状态
│   │   ├── services/             # API服务
│   │   │   └── api.ts             # API封装
│   │   ├── styles/               # 样式文件
│   │   │   └── index.css          # 全局样式
│   │   ├── types/                # 类型定义文件
│   │   │   └── chat.d.ts          # 聊天相关类型
│   │   ├── App.tsx               # 应用入口
│   │   └── index.tsx             # 项目入口
│
├── server/                        # 后端项目目录
│   ├── app/
│   │   ├── api/                  # API路由
│   │   │   ├── __init__.py
│   │   │   └── chat.py           # 对话接口
│   │   ├── services/             # 业务逻辑
│   │   │   ├── __init__.py
│   │   │   └── ai_service.py     # AI服务
│   │   └── main.py              # 应用入口
│   ├── .env.example             # 环境变量示例
│   └── requirements.txt         # Python依赖
│
├── .gitignore                    # Git忽略文件
└── README.md                     # 项目说明

### 2.1 前端目录说明
- components/: 核心UI组件
- services/: API调用封装
- styles/: 基础样式

### 2.2 后端目录说明
- api/: 接口路由
- services/: AI服集成
- main.py: 应用入口

### 2.3 核心依赖

#### 前端依赖
- react: ^18.2.0 (UI渲染核心框架)
- typescript: ^4.9.0 (类型支持)
- antd: ^5.0.0 (UI组件库)
- axios: ^1.3.0 (HTTP客户端)
- react-markdown: ^8.0.0 (Markdown渲染)
- prismjs: ^1.29.0 (代码语法高亮)
- @types/react: ^18.2.0 (React类型定义)

#### 后端依赖
- fastapi: ^0.95.0 (Web框架)
- uvicorn: ^0.21.0 (ASGI服务器)
- python-dotenv: ^1.0.0 (环境变量管理)
- anthropic: ^0.3.0 (Claude API客户端)
- openai: ^0.27.0 (OpenAI API客户端)
- pydantic: ^1.10.0 (数据验证)

### 2.4 关键配置文件
- client/.env: 前端环境变量配置
  - REACT_APP_API_BASE_URL: 后端API地址
  - REACT_APP_ENV: 运行环境(development/production)
  
- server/.env: 后端环境变量配置
  - CLAUDE_API_KEY: Claude API密钥
  - OPENAI_API_KEY: OpenAI API密钥
  - CORS_ORIGINS: 允许的跨域来源
  - LOG_LEVEL: 日志级别

### 2.5 部署要求
- Node.js >= 16.x
- Python >= 3.9
- NPM >= 7.x
- pip >= 21.x







