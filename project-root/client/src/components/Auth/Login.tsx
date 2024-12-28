import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 测试图片是否能加载
    const img = new Image();
    img.onload = () => console.log('背景图片加载成功');
    img.onerror = (e) => console.error('背景图片加载失败:', e);
    img.src = '/images/bg.jpg';
  }, []);

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      setLoading(true);
      await login(values);
      message.success('登录成功');
      navigate('/chat');
    } catch (error) {
      message.error('登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="auth-container"
      style={{
        backgroundImage: 'url("/images/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}
    >
      <Form name="login" className="auth-form" onFinish={onFinish}>
        <h2>登录</h2>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input prefix={<UserOutlined />} placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            登录
          </Button>
        </Form.Item>
        <Button type="link" onClick={() => navigate('/register')}>
          还没有账号？立即注册
        </Button>
      </Form>
    </div>
  );
};

export default Login;