import { ReactNode } from 'react'
import { Popover as HPopover } from '@headlessui/react'
import { mapDirectionClass } from '../../styles/consts'
import popupCls from '../../styles/popup.module.scss'
import cls from './Popover.module.scss'
import { DropdownDirection } from '@/shared/types/ui'
import { classNames } from '@/shared/lib/classNames/classNames'

interface PopoverProps {
  className?: string
  direction?: DropdownDirection
  trigger: ReactNode
  children: ReactNode
}
/** 
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export function Popover(props: PopoverProps) {
  const { className, trigger, direction = 'bottom right', children } = props

  const menuClasses = [mapDirectionClass[direction]]

  return (
    <HPopover
      className={classNames(cls.Popover, {}, [className, popupCls.popup])}
    >
      <HPopover.Button as='div' className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel
        className={classNames(cls.panel, {}, menuClasses)}
      >
        {children}
      </HPopover.Panel>
    </HPopover>
  )
}