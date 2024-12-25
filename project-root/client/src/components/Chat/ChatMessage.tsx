// 导入React核心库，用于创建React组件
import React from 'react';

// 导入Ant Design的Avatar组件，用于显示用户/AI的头像
import { Avatar } from 'antd';

// 导入Ant Design的图标组件，用于显示用户和机器人图标
import { UserOutlined, RobotOutlined } from '@ant-design/icons';

// 导入自定义的ChatMessageProps接口，定义了组件的props类型
import { ChatMessageProps } from '../../types/chat';

// 导入MarkdownRenderer组件
import { MarkdownRenderer } from '../Markdown/MarkdownRenderer';
import '../Markdown/markdown.css';

// 定义ChatMessage组件，使用React.FC（函数组件）类型，并指定props类型为ChatMessageProps
// 通过解构赋值获取type（消息类型）和content（消息内容）props
const ChatMessage: React.FC<ChatMessageProps> = ({ type, content }) => {
  // 返回组件的JSX结构
  return (
    // 外层div，使用模板字符串动态添加类名
    // chat-message是基础类名，type（user/ai）用于区分不同类型的消息样式
    <div className={`chat-message ${type}`}>
      {/* Avatar组件显示用户/AI头像
          使用三元运算符根据type属性决定显示用户图标还是机器人图标 */}
      <Avatar icon={type === 'user' ? <UserOutlined /> : <RobotOutlined />} />
      
      {/* 消息内容容器 */}
      <div className="message-content">
        {/* 使用MarkdownRenderer组件将Markdown格式的content转换为HTML显示 */}
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
};

// 导出ChatMessage组件，使其可以被其他文件导入使用
export default ChatMessage; 