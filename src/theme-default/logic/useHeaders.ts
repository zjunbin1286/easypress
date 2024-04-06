import { useState, useEffect } from 'react';
import { Header } from 'shared/types/index';

export function useHeaders(initHeaders: Header[]) {
  const [headers, setHeaders] = useState(initHeaders);

  useEffect(() => {
    if (import.meta.env.DEV) {
      // 监听服务端的 mdx-changed 事件
      import.meta.hot.on(
        'mdx-changed',
        ({ filePath }: { filePath: string }) => {
          // 改成非本地的文件路径，http://127.0.0.1:5173/docs/guide/index.mdx
          const origin = window.location.origin;
          const path = `${origin}/${filePath.slice(-20)}`;

          import(/* @vite-ignore */ `${path}?import&t=${Date.now()}`).then(
            (module) => {
              setHeaders(module.toc);
            }
          );
        }
      );
    }
  });
  return headers;
}
