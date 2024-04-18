import { App, initPageData } from './App';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
import { DataContext } from './hooks';

export interface RenderResult {
  appHtml: string;
  islandProps: unknown[];
  islandToPathMap: Record<string, string>;
}

// For ssr component render
export async function render(pagePath: string, helmetContext: object) {
  // 生产 pageData
  const pageData = await initPageData(pagePath);
  // 在每次渲染页面之前清空了上一次渲染遗留的数据，解决了不同页面间数据污染的问题
  const { clearIslandData, data } = await import('./jsx-runtime');
  clearIslandData();
  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <DataContext.Provider value={pageData}>
        <StaticRouter location={pagePath}>
          <App />
        </StaticRouter>
      </DataContext.Provider>
    </HelmetProvider>
  );
  const { islandProps, islandToPathMap } = data;
  return {
    appHtml,
    islandProps,
    islandToPathMap
  };
}

export { routes } from 'easypress:routes';
