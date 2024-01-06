import { App } from './App';
import { renderToString } from 'react-dom/server';

// 将组件代码渲染为 HTML 字符串
export function render() {
  return renderToString(<App />);
}

/**
 * 服务端入口
 */
