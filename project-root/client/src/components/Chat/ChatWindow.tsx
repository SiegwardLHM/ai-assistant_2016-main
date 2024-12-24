// 导入必要的 React 组件和钩子
import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import Loading from '../Common/Loading';
import { sendMessage } from '../../services/api';

// 定义消息类型接口
interface Message {
  type: 'user' | 'ai';    // 消息类型：用户消息或AI消息
  content: string;        // 消息内容
}

// 聊天窗口组件定义
const ChatWindow: React.FC = () => {
  // ================ 状态管理 ================
  /**
   * messages: 存储所有聊天消息的数组
   * setMessages: 更新消息数组的函数
   */
  const [messages, setMessages] = useState<Message[]>([]);
  
  /**
   * loading: 标识是否正在等待AI响应的状态
   * setLoading: 更新加载状态的函数
   */
  const [loading, setLoading] = useState<boolean>(false);

  // ================ 事件处理 ================
  /**
   * 处理发送消息的异步函数
   * @param content - 用户输入的消息内容
   * @returns Promise<void>
   */
  const handleSendMessage = async (content: string) => {
    try {
      // 开启加载状态，显示等待动画
      setLoading(true);
      
      // 立即将用户消息添加到消息列表中，提供即时反馈
      setMessages(prev => [...prev, { 
        type: 'user', 
        content 
      }]);
      
      // 调用后端API发送消息并等待响应
      const response = await sendMessage(content);
      
      // 将AI的回复添加到消息列表中
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: response.response 
      }]);
    } catch (error) {
      // 捕获并记录任何可能发生的错误
      console.error('发送消息失败:', error);
      // 这里可以添加错误提示UI展示
    } finally {
      // 无论成功还是失败，都需要关闭加载状态
      setLoading(false);
    }
  };

  // ================ 组件渲染 ================
  return (
    // 聊天窗口的最外层容器
    <div className="chat-window">
      {/* 消息显示区域：包含所有历史消息和加载状态 */}
      <div className="messages">
        {/* 
          使用map函数遍历渲染所有消息
          key属性使用索引（在实际项目中最好使用唯一ID）
        */}
        {messages.map((msg, index) => (
          <ChatMessage 
            key={index} 
            type={msg.type} 
            content={msg.content} 
          />
        ))}
        
        {/* 条件渲染：仅在loading为true时显示加载动画 */}
        {loading && <Loading />}
      </div>

      {/* 
        聊天输入框组件
        通过props传入发送消息的回调函数 
      */}
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

// 导出聊天窗口组件
export default ChatWindow; 