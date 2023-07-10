/* eslint-disable i18next/no-literal-string */
import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import { PageLoader } from '@/widgets/PageLoader';
import { AppRoutesProps } from '@/shared/types/router';
import { routeConfig } from '../config/routeConfig';

const AppRouter = () => { 
  const renderWithWrapper = useCallback(
    (route: AppRoutesProps) => {
      const element = (
        <Suspense fallback={<PageLoader />}>
          {route.element}
        </Suspense>
      )
      
      return (
      <Route
        key={route.path}
          element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
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
