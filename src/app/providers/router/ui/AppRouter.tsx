/* eslint-disable i18next/no-literal-string */
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '@/shared/config/routeConfig/routeConfig';
import { PageLoader } from '@/shared/ui/PageLoader/PageLoader';

const AppRouter = () => (
  <div>
    <Routes>
      {Object.values(routeConfig).map(({ element, path }) => (
        <Route
          key={path}
          element={(
            <Suspense fallback={<PageLoader />}>
              <div className="page-wrapper">{element}</div>
            </Suspense>
          )}
          path={path}
        />
      ))}
    </Routes>
  </div>
);

export default AppRouter;
