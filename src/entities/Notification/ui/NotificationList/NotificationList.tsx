import {memo} from 'react'
import cls from './NotificationList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useNotification } from '../../api/notificationApi';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import NotificationItem from '../NotificationItem/NotificationItem';
interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo(({ className }: NotificationListProps) => {
  const { data, isLoading } = useNotification(null, {
    pollingInterval: 10000
  })

  if (isLoading) {
    return (
      <VStack gap='16' max className={classNames(cls.NotificationList, {}, [className])}>
        <Skeleton width="100%" border="8px" height="80px" />
      </VStack>
    )
  }

  return (
    <VStack gap='16' max className={classNames(cls.NotificationList, {}, [className])}>
      {data?.map(item => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </VStack>
  )
});