// 定义消息的基本接口结构
//export interface Message {
  // 消息类型：可以是'user'(用户消息)或'ai'(AI回复)
  type: 'user' | 'ai';
  // 消息的具体内容
  content: string;
//}

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

// 新增聊天模式相关类型
export type ChatMode = 'general' | 'code';

// 修改现有的 Message 接口（如果已存在）
export interface Message {
    id: string;
    content: string;
    role: 'user' | 'ai';
    timestamp: number;
    // 可以选择性添加与模式相关的字段
    mode?: ChatMode;
}

// 修改现有的 Conversation 接口（如果已存在）
export interface Conversation {
    id: string;
    mode: ChatMode;  // 新增模式字段
    messages: Message[];
    // ... 其他现有字段 ...
} 