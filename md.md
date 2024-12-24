# 虚拟助教系统维护文档

## 1. 系统架构

### 1.1 技术栈
#### 前端技术
- React 18 + TypeScript (基础框架)
- Ant Design 5.x (UI组件库)
- Axios (HTTP请求)
- React Router (路由管理)

#### 后端技术
- Python 3.9+ + FastAPI (Web框架)
- SQLAlchemy + MySQL (数据库)
- 百度文心一言 API (AI服务)
- Pydantic (数据验证)

### 1.2 核心功能模块
- 用户认证系统
- AI对话系统
- 数据持久化存储

## 2. 项目结构

project-root/                         # 项目根目录
├── README.md                        # 项目说明文档
├── project_plan.md                  # 项目计划文档
├── client/                          # 前端项目目录
│   ├── public/                      # 公共资源目录
│   │   ├── index.html              # HTML入口文件
│   │   ├── manifest.json           # PWA配置文件
│   │   ├── favicon.ico             # 网站图标
│   │   └── robots.txt              # 搜索引擎配置
│   ├── src/
│   │   ├── components/             # React组件
│   │   │   ├── Auth/              # 认证相关组件
│   │   │   │   ├── Login.tsx      # 登录组件
│   │   │   │   └── Register.tsx   # 注册组件
│   │   │   └── Chat/              # 对话组件
│   │   │       ├── ChatInput.tsx  # 输入框组件
│   │   │       ├── ChatMessage.tsx # 消息气泡组件
│   │   │       └── ChatWindow.tsx # 对话窗口组件
│   │   ├── services/              # API服务
│   │   │   └── api.ts            # API封装
│   │   ├── styles/                # 样式文件
│   │   │   └── index.css         # 全局样式
│   │   ├── App.tsx               # 应用入口
│   │   └── index.tsx             # 项目入口
│   ├── package.json              # npm配置文件
│   └── tsconfig.json            # TypeScript配置
│
└── server/                       # 后端项目目录
    ├── requirements.txt         # Python依赖文件
    ├── api_responses.log       # API响应日志
    └── app/
        ├── api/                 # API路由
        │   ├── __init__.py     # 包初始化文件
        │   ├── auth.py         # 认证接口
        │   └── chat.py         # 对话接口
        ├── models/             # 数据模型
        │   ├── __init__.py     # 包初始化文件
        │   └── user.py         # 用户模型
        ├── services/           # 业务逻辑
        │   ├── __init__.py     # 包初始化文件
        │   └── ai_service.py   # AI服务
        ├── database.py         # 数据库配置
        └── main.py            # 应用入口

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







