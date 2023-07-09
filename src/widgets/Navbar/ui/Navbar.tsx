import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';
import { memo, useCallback, useState } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { LoginModal } from '@/features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { Dropdown, Popover } from '@/shared/ui/Popups';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Icon } from '@/shared/ui/Icon/Icon'
import { HStack } from '@/shared/ui/Stack'
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg'
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
interface NavbarProps {
  className?: string;

}
export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false)
  const authData = useSelector(getUserAuthData)

  const onCloseModal = useCallback(
    () => {
      setIsAuthModal(false)
    },
    [],
  )
  const onShowModal = useCallback(
    () => {
      setIsAuthModal(true)
    },
    [],
  )

  if (authData) {
   return <header className={classNames(cls.Navbar, {}, [className])}>
     <Text
       className={cls.appName}
       title={t('Blog')}
       theme={TextTheme.INVERTED}
     />
     <AppLink
       to={RoutePath.articles_create}
       theme={AppLinkTheme.SECONDARY}
       className={cls.createBtn}
     >
       {t('Create article')}
     </AppLink>
     <HStack gap='16' className={cls.actions}>
       <NotificationButton />
       <AvatarDropdown />
     </HStack>
    </header>
  }
  
  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button onClick={onShowModal} theme={ButtonTheme.CLEAR_INVERTED} className={cls.links}>
        {t('Войти')}
      </Button>
      {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal}/>}
    </header>
  );
});
