import {memo, useCallback} from 'react'
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User';
import { Dropdown } from '@/shared/ui/Popups';
import { Avatar } from '@/shared/ui/Avatar';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router'
interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props
  const { t, i18n } = useTranslation()
  const authData = useSelector(getUserAuthData)

  // for logout
  const dispatch = useDispatch()

  // for admin panel
  const isAdmin = useSelector(isUserAdmin)
  const isManager = useSelector(isUserManager)

  // for logoutA
  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  const isAdminPanelAvailable = isAdmin || isManager

  if (!authData) {
    return null
  }

  return (
    <Dropdown
      className={classNames('', {}, [className])}
      direction={'bottom left'}
      items={[
        ...(isAdminPanelAvailable
          ? [{
            content: t('Admin Panel'),
            href: getRouteAdmin()
          }]
          : []),
        {
          content: t('Profile'),
          href: getRouteProfile(authData.id)
        },
        {
          content: t('Log out'),
          onClick: onLogout
        }
      ]}
      trigger={<Avatar size={30} src={authData.avatar} />}
    />
  );
});

export default AvatarDropdown