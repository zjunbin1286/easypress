import { App, initPageData } from './App';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { DataContext } from './hooks';
// For ssr component render
export async function render(pagePath: string) {
  // 生产 pageData
  const pageData = await initPageData(pagePath);
  // 在每次渲染页面之前清空了上一次渲染遗留的数据，解决了不同页面间数据污染的问题
  const { clearIslandData, data } = await import('./jsx-runtime');
  const { islandProps, islandToPathMap } = data;
  clearIslandData();
  return renderToString(
    <DataContext.Provider value={pageData}>
      <StaticRouter location={pagePath}>
        <App />
      </StaticRouter>
    </DataContext.Provider>
  );
}

export { routes } from 'easypress:routes';
