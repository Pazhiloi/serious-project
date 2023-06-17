import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Sidebar.module.scss';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-20-20.svg'
import MainIcon from 'shared/assets/icons/main-20-20.svg'
interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const {t} = useTranslation();
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button size={ButtonSize.L} className={cls.collapseBtn} data-testid="sidebar-toggle" type="button" onClick={onToggle} theme={ButtonTheme.BACKGROUND_INVERTED} square >{collapsed ? '>' : '<'}</Button>
      <div className={cls.items}>
        
          <AppLink className={cls.item} theme={AppLinkTheme.SECONDARY} to={RoutePath.main} >
          <MainIcon className={cls.icon}/>
            <span className={cls.link}>
            {t('Главная')}
          </span>
          </AppLink>

          <AppLink className={cls.item} theme={AppLinkTheme.SECONDARY} to={RoutePath.about} >
          <AboutIcon className={cls.icon}/>
            <span className={cls.link}>
            {t('О сайте')}
          </span>
            </AppLink>
        
        
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </div>
  );
};
