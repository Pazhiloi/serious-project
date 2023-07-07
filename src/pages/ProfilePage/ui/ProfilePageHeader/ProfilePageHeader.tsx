import { Text } from '@/shared/ui/Text/Text';
import cls from './ProfilePageHeader.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getProfileData, getProfileReadonly, profileActions, updateProfileData } from '@/entities/Profile';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  const {t} = useTranslation('profile');
  const readonly = useSelector(getProfileReadonly);
  const authData = useSelector(getUserAuthData)
  const profileData = useSelector(getProfileData)
  const dispatch = useAppDispatch();

  const canEdit = authData?.id === profileData?.id

  const onEdit = useCallback(
    () => {
      dispatch(profileActions.setReadonly(false))
    },
    [dispatch],
  )
  const onCancelEdit = useCallback(
    () => {
      dispatch(profileActions.cancelEdit())
    },
    [dispatch],
  )
  const onSave = useCallback(
    () => {
      dispatch(updateProfileData())
    },
    [dispatch],
  )
  
  return (
    <HStack max justify='between'  className={classNames('', {}, [className])}>
        <Text title={t('Профиль')} />
      {canEdit && (
        <div className={cls.btnWrapper}>
          {readonly
            ? (
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onEdit}
              >
                {t('Edit')}
              </Button>
            )

            : (
              <HStack gap={'8'}>
                <Button
                  className={cls.editBtn}
                  theme={ButtonTheme.OUTLINE_RED}
                  onClick={onCancelEdit}
                >
                  {t('Cancel')}
                </Button>

                <Button
                  className={cls.saveBtn}
                  theme={ButtonTheme.OUTLINE}
                  onClick={onSave}
                >
                  {t('Save')}
                </Button>
              </HStack>
            )
          }
        </div>
      )}
        
    </HStack>
  );
};