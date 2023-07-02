import { Counter } from '@/entities/Counter';
import Page from '@/widgets/Page/Page';
import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation('about');
  return (
    <Page>
      {t('О сайте')}
    </Page>
  );
};

export default AboutPage;
