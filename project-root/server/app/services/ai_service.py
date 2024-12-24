from typing import Optional
import os
from dotenv import load_dotenv
import requests
import json

API_KEY = "WgTDfZhQKDBvNQ1t3HSr8rG0"
SECRET_KEY = "opGec3K9CQSua09B0bq4vM8HU0thNV7L"

# 加载环境变量
load_dotenv()

class AIService:
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

    async def get_response(self, message: str) -> str:
        try:
            access_token = self.get_access_token()
            full_url = f"{self.api_url}?access_token={access_token}"
            
            headers = {
                'Content-Type': 'application/json'
            }
            payload = json.dumps({
                "messages": [{
                    "role": "user",
                    "content": message
                }]
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