import { Modal } from '@/shared/ui/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Suspense } from 'react';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { Loader } from '@/shared/ui/Loader/Loader';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ className, isOpen,
  onClose }: LoginModalProps) => {
  return (
    <Modal lazy isOpen={isOpen} onClose={onClose} className={classNames('', {}, [className])}>
      <Suspense fallback={<Loader/>}>
      <LoginFormAsync onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};