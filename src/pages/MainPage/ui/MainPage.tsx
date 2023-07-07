import Page from '@/widgets/Page/Page';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
  const { t } = useTranslation();
  return (
    <Page>
      {t('Главная страница')}
    </Page>
  );
};

export default MainPage;
