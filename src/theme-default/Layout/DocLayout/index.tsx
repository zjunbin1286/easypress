import { usePageData, Content } from '@runtime';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar/index';
import styles from './index.module.scss';
import { DocFooter } from '../../components/DocFooter/index';

export function DocLayout() {
  // 获取页面数据
  const { siteData } = usePageData();
  const sidebarData = siteData.themeConfig?.sidebar || {};

  // 获取当前路由地址
  const { pathname } = useLocation();

  // 拿到与当前地址匹配的key，例如 /guide/
  const matchedSidebarKey = Object.keys(sidebarData).find((key) => {
    if (pathname.startsWith(key)) {
      return true;
    }
  });

  // 获取对应 key 的数据
  const matchedSidebar = sidebarData[matchedSidebarKey] || [];

  return (
    <div>
      <Sidebar sidebarData={matchedSidebar} pathname={pathname} />
      <div className={styles.content}>
        <div>
          <div className="island-doc">
            <Content />
          </div>
          <DocFooter />
        </div>
      </div>
    </div>
  );
}
