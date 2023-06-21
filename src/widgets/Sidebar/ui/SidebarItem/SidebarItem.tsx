import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import cls from './SidebarItem.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SidebarItemType } from '../../model/items';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item,
  collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  return (
    <AppLink className={classNames(cls.item, {[cls.collapsed] :collapsed}, [])} theme={AppLinkTheme.SECONDARY} to={item.path} >
      <item.Icon className={cls.icon} />
      <span className={cls.link}>
        {t(item.text)}
      </span>
    </AppLink>
  );
});