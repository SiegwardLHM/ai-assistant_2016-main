// 导入React核心库，用于创建React组件
import React from 'react';

// 导入ReactMarkdown组件，用于将Markdown文本渲染为HTML
import ReactMarkdown from 'react-markdown';

// 导入Ant Design的Avatar组件，用于显示用户/AI的头像
import { Avatar } from 'antd';

// 导入Ant Design的图标组件，用于显示用户和机器人图标
import { UserOutlined, RobotOutlined } from '@ant-design/icons';

// 导入自定义的ChatMessageProps接口，定义了组件的props类型
import { ChatMessageProps } from '../../types/chat';

// 导入Prism库，用于代码高亮
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // 导入代码高亮主题
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';

// 定义ChatMessage组件，使用React.FC（函数组件）类型，并指定props类型为ChatMessageProps
// 通过解构赋值获取type（消息类型）和content（消息内容）props
const ChatMessage: React.FC<ChatMessageProps> = ({ type, content }) => {
  // 在组件挂载和内容更新时触发代码高亮
  React.useEffect(() => {
    Prism.highlightAll();
  }, [content]);

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
        {/* ReactMarkdown组件将Markdown格式的content转换为HTML显示 */}
        <ReactMarkdown
          components={{
            // 自定义代码块渲染
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              
              return !inline ? (
                <pre className={`language-${language}`}>
                  <code className={`language-${language}`} {...props}>
                    {String(children).replace(/\n$/, '')}
                  </code>
                </pre>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

// 导出ChatMessage组件，使其可以被其他文件导入使用
export default ChatMessage; 