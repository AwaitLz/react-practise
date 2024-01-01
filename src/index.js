import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.less';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}

// 当前模式（打包 or 开发）
console.log('NODE_ENV', process.env.NODE_ENV);
// 业务环境 （开发/测试/预测/正式）
console.log('BASE_ENV', process.env.BASE_ENV);
