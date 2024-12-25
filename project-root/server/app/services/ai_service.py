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
        ChatMode.CODE: """你是一个专业的程序员助手，请遵循以下准则：
        1. 提供清晰、详细的技术解答，重点关注代码质量和最佳实践
        2. 代码示例要包含必要的注释说明
        3. 对于bug修复，先分析问题根源，再提供解决方案
        4. 建议采用模块化和可维护的代码结构
        5. 注意代码的性能优化和安全性考虑
        6. 如果涉及多种解决方案，请说明各个方案的优缺点
        7. 提供相关的文档链接或进一步学习资源
        8. 使用清晰的代码格式化，保持一致的编码风格"""
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

    def get_response(self, content: str, mode: str) -> str:
        try:
            # 将 system prompt 和用户内容合并到一条消息中
            full_content = f"{self.SYSTEM_PROMPTS[mode]}\n\n{content}"
            
            # 构建消息列表 - 只使用 user 角色
            messages = [
                {"role": "user", "content": full_content}
            ]
            
            # 调用 AI API 获取响应
            return self._call_ai_api(messages)
            
        except Exception as e:
            raise Exception(f"处理消息时出错: {str(e)}")

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