import React from 'react';
import { Select } from 'antd';
import { ChatMode } from '../../types/chat';

interface ChatHeaderProps {
  onModeChange: (mode: ChatMode) => void;
  currentMode: ChatMode;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onModeChange, currentMode }) => {
  return (
    <div className="chat-header flex items-center justify-between p-4 border-b">
      <h2 className="text-lg font-medium">AI 助手</h2>
      <Select
        value={currentMode}
        onChange={onModeChange}
        style={{ width: 120 }}
        options={[
          { value: 'general', label: '普通模式' },
          { value: 'code', label: '代码模式' }
        ]}
      />
    </div>
  );
}; 