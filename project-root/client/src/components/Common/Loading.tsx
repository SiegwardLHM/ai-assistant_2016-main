import React from 'react';
import { Spin } from 'antd';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <Spin size="large" tip="加载中..." />
    </div>
  );
};

export default Loading; 