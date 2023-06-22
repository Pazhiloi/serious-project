import { ProfileCard, fetchProfileData, profileReducer } from '@/entities/Profile';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useEffect } from 'react';

const reducers: ReducersList = {
  profile: profileReducer
}


const ProfilePage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])
  
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
    <div>
     <ProfileCard/>
    </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
