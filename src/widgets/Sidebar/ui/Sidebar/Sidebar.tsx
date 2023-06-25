import  { memo, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher';
import { LangSwitcher } from '@/shared/ui/LangSwitcher/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getSidebarItems } from '../../model/selectors/getSidebaritems';
interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation()
  const sidebarItemsList = useSelector(getSidebarItems)
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemList = useMemo(() => {
    return sidebarItemsList.map((item) => (
      <SidebarItem
        item={item}
        collapsed={collapsed}
        key={item.path}
      />
    ))
  }, [collapsed, sidebarItemsList])



  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button size={ButtonSize.L} className={cls.collapseBtn} data-testid="sidebar-toggle" type="button" onClick={onToggle} theme={ButtonTheme.BACKGROUND_INVERTED} square >{collapsed ? '>' : '<'}</Button>
      <div className={cls.items}>
        {itemList}        
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </div>
  );
});
