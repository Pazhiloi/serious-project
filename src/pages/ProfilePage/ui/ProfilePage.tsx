import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/Stack';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { useParams } from 'react-router-dom';
import { profileReducer } from '@/features/EditableProfileCard/testing';

const reducers: ReducersList = {
  profile: profileReducer
}
export interface ProfilePageProps {
  className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const {t} = useTranslation()
  const { id } = useParams<{ id: string }>()

  // if (!id) {
  //   return <Text text={t('Profile is not found')} />
  // }
  
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
    <Page className={classNames('', {}, [className])}>
        <VStack max gap={'16'}>
          <EditableProfileCard id={id} />
        </VStack>
    </Page>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
