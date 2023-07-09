import React, { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import cls from './Modal.module.scss';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import { useTheme } from '@/app/providers/ThemeProvider';
import Overlay from '../Overlay/Overlay';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?:boolean;
  isClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, isClose, lazy } = props;

  const {
    close,
    isClosing,
    isMounted
  } = useModal(
    {
      animationDelay: ANIMATION_DELAY,
      isClose,
      isOpen
    })
  const { theme } = useTheme()

  
  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  }

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
    <div className={classNames(cls.Modal, mods, [className])}>
        <Overlay onClick={close} />
        <div className={cls.content} >
          {children}
        </div>
    </div>
    </Portal>

  );
};