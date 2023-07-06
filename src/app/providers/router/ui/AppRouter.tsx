/* eslint-disable i18next/no-literal-string */
import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoutes, routeConfig, AppRouteProps } from '@/shared/config/routeConfig/routeConfig';
import { PageLoader } from '@/widgets/PageLoader/PageLoader';
import RequireAuth from './RequireAuth';

const AppRouter = () => { 
  const renderWithWrapper = useCallback(
    (route: AppRouteProps) => {
      const element = (
        <Suspense fallback={<PageLoader />}>
          {route.element}
        </Suspense>
      )
      
      return (
      <Route
        key={route.path}
        element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
        path={route.path}
      />
    )},
    [],
  )
  
  
  return (
  <div>
    <Routes>
      {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>
  </div>
)};

export default memo(AppRouter);
