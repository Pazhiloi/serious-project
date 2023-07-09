import {memo, useCallback, useEffect, useState} from 'react'
import cls from './NotificationButton.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Popover } from '@/shared/ui/Popups';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg'
import { NotificationList } from '@/entities/Notification';
import {Drawer} from '@/shared/ui/Drawer/Drawer';
import { AnimationProvider } from '@/shared/lib/components/AnimationProvider';
interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;
  const [isOpen, setIsOpen] = useState(false)

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false)
  }, [])

  const trigger = (
    <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
      <Icon Svg={NotificationIcon} inverted />
    </Button>
  )

  // for mobile or pc
  const [width, setWidth] = useState<number>(window.innerWidth)

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const isMobile = width <= 768

  return (
    <div>
      {isMobile
        ? (
          <AnimationProvider>
            {trigger}
            <Drawer isOpen={isOpen} isClose={onCloseDrawer}>
              <NotificationList />
            </Drawer>
          </AnimationProvider>
        )
        : (
          <Popover
            className={classNames(cls.NotificationButton, {}, [className])}
            direction='bottom left'
            trigger={trigger}>
            <NotificationList className={cls.notifications} />
          </Popover>
        )
      }
    </div>
  )
});

export default NotificationButton