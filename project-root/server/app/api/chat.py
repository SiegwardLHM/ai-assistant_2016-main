# 导入FastAPI相关组件
from fastapi import APIRouter, HTTPException # type: ignore
# 导入AI服务
from app.services.ai_service import AIService
from pydantic import BaseModel

# 创建路由器实例
router = APIRouter()
# 创建AI服务实例
ai_service = AIService()

class ChatRequest(BaseModel):
    content: str
    mode: str  # 添加 mode 字段

# 定义聊天接口路由
@router.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        print(f"Received request: content='{request.content}', mode='{request.mode}'")
        response = ai_service.get_response(request.content, request.mode)
        print(f"AI response: {response}")
        return {"response": response}
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 