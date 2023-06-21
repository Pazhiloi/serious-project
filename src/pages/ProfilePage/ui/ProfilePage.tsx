import { profileReducer } from '@/entities/Profile';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader';
import { useTranslation } from 'react-i18next';

const reducers: ReducersList = {
  profile: profileReducer
}


const ProfilePage = () => {
  const { t } = useTranslation();
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
    <div>
      {t('PROFILE PAGE')}
    </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
