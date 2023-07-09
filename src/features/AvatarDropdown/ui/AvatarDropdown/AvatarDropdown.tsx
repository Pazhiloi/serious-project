import {memo, useCallback} from 'react'
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User';
import { Dropdown } from '@/shared/ui/Popups';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
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

  // for logout
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
            href: RoutePath.admin_panel
          }]
          : []),
        {
          content: t('Profile'),
          href: `${RoutePath.profile}/${authData.id}`
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