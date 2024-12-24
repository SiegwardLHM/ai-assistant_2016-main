// 定义消息的基本接口结构
export interface Message {
  // 消息类型：可以是'user'(用户消息)或'ai'(AI回复)
  type: 'user' | 'ai';
  // 消息的具体内容
  content: string;
}

// 定义聊天输入组件的属性接口
export interface ChatInputProps {
  // 发送消息的回调函数，接收消息文本作为参数
  onSend: (message: string) => void;
}

// 定义聊天消息组件的属性接口
export interface ChatMessageProps {
  // 消息类型：可以是'user'(用户消息)或'ai'(AI回复)
  type: 'user' | 'ai';
  // 消息的具体内容
  content: string;
} 