import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  MutableRefObject,
} from "react";

interface UseModalProps {
  isClose?: () => void;
  isOpen?: boolean;
  animationDelay: number;
}

export function useModal({ animationDelay, isClose, isOpen }: UseModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  // For lazy loading modal
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const close = useCallback(() => {
    if (isClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        isClose();
        setIsClosing(false);
      }, animationDelay);
    }
  }, [isClose, animationDelay]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  return {
    isClosing,
    close,
    isMounted,
  };
}
