# FastAPI主应用文件
# 负责初始化FastAPI应用、配置中间件和路由

# 导入FastAPI框架，用于创建Web应用
from fastapi import FastAPI
# 导入CORS中间件，用于处理跨域资源共享
from fastapi.middleware.cors import CORSMiddleware
# 导入聊天相关的路由模块
from app.api import chat
from app.api import auth

# 创建FastAPI应用实例
# 这个实例将处理所有的HTTP请求
app = FastAPI()

# 配置CORS（跨源资源共享）中间件
# 这允许前端应用从不同的域名访问后端API
app.add_middleware(
    # 使用CORSMiddleware处理跨域请求
    CORSMiddleware,
    # 允许的源域名列表，开发环境下设置为前端开发服务器地址
    allow_origins=["http://localhost:3000"],
    # 允许携带认证信息（如cookies）
    allow_credentials=True,
    # 允许的HTTP方法，"*"表示允许所有方法
    allow_methods=["*"],
    # 允许的HTTP头，"*"表示允许所有标准头
    allow_headers=["*"],
)

# 包含聊天相关的路由
# 这会将chat模块中定义的所有路由添加到主应用中
app.include_router(chat.router)
app.include_router(auth.router) 