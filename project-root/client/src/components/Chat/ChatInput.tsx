// 从react包中导入React核心库及必要的hooks和事件类型
// React: React核心库
// useState: 用于管理组件状态的Hook
// KeyboardEvent: 键盘事件类型定义
// ChangeEvent: 输入变化事件类型定义
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';

// 从antd(Ant Design)组件库中导入必要的UI组件
// Input: 输入框组件
// Button: 按钮组件
import { Input, Button } from 'antd';

// 导入自定义的ChatInputProps类型定义
// ChatInputProps定义了组件的props接口，包含onSend回调函数
import { ChatInputProps } from '../../types/chat';

// 定义ChatInput组件
// React.FC<ChatInputProps>表示这是一个接收ChatInputProps类型参数的函数组件
// ({ onSend })是props的解构，获取onSend回调函数
const ChatInput = ({ onSend }: ChatInputProps): React.ReactElement => {

  // 使用useState Hook管理输入框的内容
  // message: 当前输入框的内容
  // setMessage: 用于更新message的函数
  const [message, setMessage] = useState('');

  // 定义发送消息的处理函数
  // 当用户点击发送按钮或按下回车键时触发
  const handleSend = () => {
    // 检查消息是否为空（去除首尾空格后）
    if (message.trim()) {
      // 调用父组件传入的onSend回调，将消息发送出去
      onSend(message);
      // 清空输入框
      setMessage('');
    }
  };

  // 定义输入框内容变化的处理函数
  // e: 输入事件对象，包含新的输入值
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // 更新输入框的内容状态
    setMessage(e.target.value);
  };

  // 定义键盘事件处理函数
  // 用于处理回车键发送消息的功能
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // 检查是否按下回车键且未按住Shift键
    // 按住Shift+Enter是换行，单独按Enter是发送
    if (!e.shiftKey && e.key === 'Enter') {
      // 阻止默认的换行行为
      e.preventDefault();
      // 触发发送操作
      handleSend();
    }
  };

  // 渲染组件的JSX结构
  return (
    // 外层容器，使用chat-input类名用于样式
    <div className="chat-input">
      {/* 文本输入区域组件 */}
      <Input.TextArea
        value={message}                    // 绑定输入框的值到state
        onChange={handleChange}            // 绑定输入变化处理函数
        onPressEnter={handleKeyPress}      // 绑定回车键处理函数
        placeholder="请输入您的问题..."     // 输入框占位提示文本
        autoSize={{ minRows: 2, maxRows: 6 }} // 设置输入框自适应高度范围
      />
      {/* 发送按钮组件 */}
      <Button 
        type="primary"    // 设置按钮类型为主要按钮（蓝色）
        onClick={handleSend}  // 绑定点击事件处理函数
      >
        发送
      </Button>
    </div>
  );
};

// 导出ChatInput组件，使其可以被其他文件导入使用
export default ChatInput; 