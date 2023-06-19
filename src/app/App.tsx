import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useState } from 'react';
import { AppRouter } from './providers/router';
import { Modal } from 'shared/ui/Modal/Modal';

const App = () => {
  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback="">
        <Navbar />
        
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
