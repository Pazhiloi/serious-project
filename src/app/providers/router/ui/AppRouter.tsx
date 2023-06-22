/* eslint-disable i18next/no-literal-string */
import { Suspense, memo, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '@/shared/config/routeConfig/routeConfig';
import { PageLoader } from '@/shared/ui/PageLoader/PageLoader';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';

const AppRouter = () => { 
  const isAuth = useSelector(getUserAuthData)

  const routes = useMemo(() => {
    return Object.values(routeConfig).filter(route => {
      if (route.authOnly && !isAuth) {
        return false
      }
      return true;
    })
  }, [isAuth])
  return (
  <div>
    <Routes>
        {routes.map(({ element, path }) => (
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
)};

export default memo(AppRouter);
