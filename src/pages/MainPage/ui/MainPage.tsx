import { BugButton } from '@/app/providers/ErrorBoundary';
import Page from '@/shared/ui/Page/Page';
import  { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <BugButton/>
      {t('Главная страница')}
    </Page>
  );
};

export default MainPage;
