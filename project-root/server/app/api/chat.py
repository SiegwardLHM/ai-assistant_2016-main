# 导入FastAPI相关组件
from fastapi import APIRouter, HTTPException
# 导入AI服务
from app.services.ai_service import AIService

# 创建路由器实例
router = APIRouter()
# 创建AI服务实例
ai_service = AIService()

# 定义聊天接口路由
@router.post("/api/chat")
async def chat_endpoint(message: dict):
    try:
        # 调用AI服务获取响应
        response = await ai_service.get_response(message["content"])
        # 返回响应结果
        return {"response": response}
    except Exception as e:
        # 如果发生错误，抛出HTTP 500错误
        raise HTTPException(status_code=500, detail=str(e)) 