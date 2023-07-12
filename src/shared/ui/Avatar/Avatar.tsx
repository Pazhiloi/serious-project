import { CSSProperties, useMemo } from 'react';
import cls from './Avatar.module.scss';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';
import UserIcon from '../../assets/icons/user-filled.svg'
import { AppImage } from '../AppImage';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
  fallbackInverted?: boolean
}

export const Avatar = (props: AvatarProps) => {
  const {
    className,
    src,
    size = 100,
    alt,
    fallbackInverted
  } = props

  const mods: Mods = {};

  const style = useMemo<CSSProperties>(() => {

    return {
      width: size,
      height: size
    }
  }
    , [size])

  const errorFallback = <Icon inverted={fallbackInverted} width={size} height={size} Svg={UserIcon} />
  const fallback = <Skeleton width={size} height={size} border={'50%'} />
  return (
    <AppImage
      className={classNames(cls.Avatar, mods, [className])}
      errorFallback={errorFallback}
      fallback={fallback}
      src={src}
      alt={alt}
      style={style}
    />
  );
};