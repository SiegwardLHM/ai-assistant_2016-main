from typing import Optional
import os
from dotenv import load_dotenv
import requests
import json
from ..models.chat_mode import ChatMode

API_KEY = "WgTDfZhQKDBvNQ1t3HSr8rG0"
SECRET_KEY = "opGec3K9CQSua09B0bq4vM8HU0thNV7L"

# 加载环境变量
load_dotenv()

class AIService:
    SYSTEM_PROMPTS = {
        ChatMode.GENERAL: """你是一个通用AI助手，提供友好的对话和帮助。""",
        ChatMode.CODE: """你是一个专业的程序员助手，专注于代码相关问题。
        请提供详细的技术解答，并在适当时包含代码示例。"""
    }

    def __init__(self):
        # 不需要在初始化时就拼接 access_token
        self.api_key = API_KEY
        self.secret_key = SECRET_KEY
        # 基础 URL
        self.api_url = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-4.0-turbo-8k"

    def get_access_token(self):
        """
        使用 AK，SK 生成鉴权签名（Access Token）
        :return: access_token，或是None(如果错误)
        """
        url = "https://aip.baidubce.com/oauth/2.0/token"
        params = {"grant_type": "client_credentials", "client_id": API_KEY, "client_secret": SECRET_KEY}
        return str(requests.post(url, params=params).json().get("access_token"))

    async def get_response(self, message: str, mode: ChatMode) -> str:
        try:
            # 8. 记录方法调用
            print(f"AI Service processing message: {message}")
            
            # 9. 检查配置
            if not API_KEY or not SECRET_KEY:
                raise ValueError("API credentials not configured")
                
            system_prompt = self.SYSTEM_PROMPTS[mode]
            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ]
            
            # 调用AI服务获取响应
            response = self._call_ai_api(messages)
            return response

        except Exception as e:
            # 10. 记录具体错误
            print(f"AI Service error: {type(e)} - {str(e)}")
            raise

    def _call_ai_api(self, messages: list) -> str:
        try:
            access_token = self.get_access_token()
            full_url = f"{self.api_url}?access_token={access_token}"
            
            headers = {
                'Content-Type': 'application/json'
            }
            payload = json.dumps({
                "messages": messages
            })
            
            response = requests.request("POST", full_url, headers=headers, data=payload)
            response_data = response.json()
            
            if 'result' in response_data:
                return response_data['result']
            elif 'error_msg' in response_data:
                return f"API错误: {response_data['error_msg']}"
            else:
                return f"未知响应格式: {str(response_data)}"
                
        except Exception as e:
            print(f"AI服务错误: {str(e)}")
            raise