from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.models.user import User

router = APIRouter()

class UserCredentials(BaseModel):
    username: str
    password: str

@router.post("/api/auth/register")
async def register(credentials: UserCredentials, db: Session = Depends(get_db)):
    try:
        # 检查用户名是否已存在
        existing_user = db.query(User).filter(User.username == credentials.username).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="用户名已存在")
        
        # 创建新用户
        new_user = User(
            username=credentials.username,
            password=credentials.password
        )
        
        # 添加到数据库并提交
        db.add(new_user)
        db.commit()
        print(f"用户 {credentials.username} 注册成功")  # 添加日志
        return {"message": "注册成功"}
        
    except Exception as e:
        db.rollback()
        print(f"注册失败: {str(e)}")  # 添加错误日志
        raise HTTPException(status_code=500, detail=f"注册失败: {str(e)}")

@router.post("/api/auth/login")
async def login(credentials: UserCredentials, db: Session = Depends(get_db)):
    # 从数据库查找用户
    user = db.query(User).filter(User.username == credentials.username).first()
    
    if not user or user.password != credentials.password:
        raise HTTPException(status_code=401, detail="用户名或密码错误")
    
    return {"message": "登录成功"}