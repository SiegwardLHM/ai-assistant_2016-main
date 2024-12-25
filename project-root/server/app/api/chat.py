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
        # 4. 添加请求数据日志
        print("Received request data:", message)
        
        # 5. 检查数据格式
        if "content" not in message:
            raise HTTPException(status_code=400, detail="Missing 'content' field")
            
        response = await ai_service.get_response(message["content"])
        # 6. 记录 AI 服务响应
        print("AI service response:", response)
        
        return {"response": response}
    except Exception as e:
        # 7. 详细错误日志
        print(f"Error type: {type(e)}")
        print(f"Error message: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 