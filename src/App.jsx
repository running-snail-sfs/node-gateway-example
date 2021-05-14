import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import routerTree from './router/routerTrees';

const basicRoute = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Suspense fallback={<div>loading</div>}>
          <Switch>
            {routerTree.map(({ key, path, loader }) => (
              <Route exact key={key} path={path} component={lazy(loader)} />
            ))}
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default basicRoute;
