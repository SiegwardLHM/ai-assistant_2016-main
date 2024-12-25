// 导入 axios 库，用于处理 HTTP 请求
import axios from 'axios';

// 定义后端 API 的基础 URL 地址
const API_BASE_URL = 'http://localhost:8000';

// 创建一个自定义的 axios 实例，并进行基础配置
const api = axios.create({
  // 设置基础URL，之后的请求都会基于这个URL
  baseURL: API_BASE_URL,
  // 设置请求头
  headers: {
    // 设置内容类型为 JSON 格式
    'Content-Type': 'application/json',
  },
});


// 导出发送消息的异步函数，接收消息内容作为参数
export const sendMessage = async (content: string) => {
  try {
    // 发送 POST 请求到 /api/chat 端点，携带消息内容
    const response = await api.post('/api/chat', { content });
    // 返回服务器响应的数据
    return response.data;
  } catch (error) {
    // 如果发生错误，在控制台打印错误信息
    console.error('Error sending message:', error);
    // 将错误向上抛出，供调用者处理
    throw error;
  }

  
}; 

export const login = async (data: { username: string; password: string }) => {
  try {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (data: { username: string; password: string }) => {
  try {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
}; 

export const chatApi = {
  sendMessage: async (content: string, mode: ChatMode) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, mode }),
    });
    return response.json();
  },
  
  updateMode: async (conversationId: string, mode: ChatMode) => {
    const response = await fetch(`/api/conversations/${conversationId}/mode`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mode }),
    });
    return response.json();
  }
}; 