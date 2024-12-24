from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# 简单的内存存储用户信息
users = {}

# 定义请求体模型
class UserCredentials(BaseModel):
    username: str
    password: str

@router.post("/api/auth/register")
async def register(credentials: UserCredentials):
    if credentials.username in users:
        raise HTTPException(status_code=400, detail="用户名已存在")
    users[credentials.username] = credentials.password
    return {"message": "注册成功"}

@router.post("/api/auth/login")
async def login(credentials: UserCredentials):
    if credentials.username not in users or users[credentials.username] != credentials.password:
        raise HTTPException(status_code=401, detail="用户名或密码错误")
    return {"message": "登录成功"}