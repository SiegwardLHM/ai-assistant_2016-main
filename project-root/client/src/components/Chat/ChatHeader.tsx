import React from 'react';
import { Select } from 'antd';
import { ChatMode } from '../../types/chat';

interface ChatHeaderProps {
  onModeChange: (mode: ChatMode) => void;
  currentMode: ChatMode;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onModeChange, currentMode }) => {
  return (
    <div className="chat-header flex flex-col items-center p-6 border-b border-gray-200 bg-white shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">智能助教系统</h2>
      <div className="flex items-center">
        <Select
          value={currentMode}
          onChange={onModeChange}
          style={{ width: 150 }}
          options={[
            { value: 'general', label: '普通模式' },
            { value: 'code', label: '代码模式' }
          ]}
        />
      </div>
    </div>
  );
}; 

export default ChatHeader;