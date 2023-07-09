import {ReactNode, memo} from 'react'
import cls from './Drawer.module.scss';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Portal } from '../Portal/Portal';
import Overlay from '../Overlay/Overlay';
interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
  const { className, children, isOpen, onClose } = props
  const { t, i18n } = useTranslation()

  const { theme } = useTheme()
  const mods: Mods = {
    [cls.opened]: isOpen
  }
  return (
    <Portal>
      <div className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
        <Overlay onClick={onClose} />
        <div className={cls.content} >
          {children}
        </div>
      </div>
    </Portal>
  );
});

export default Drawer