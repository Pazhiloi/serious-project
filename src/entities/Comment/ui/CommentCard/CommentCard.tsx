import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './CommentCard.module.scss'
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Comment } from '../../model/types/comment';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { VStack } from '@/shared/ui/Stack';
import { getRouteProfile } from '@/shared/const/router'

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <VStack data-testid="CommentCard.Loading" gap='8' max className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
        <AppLink to={getRouteProfile(comment!.user!.id)} className={cls.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton height={16} width={100} className={cls.username} />
        </AppLink>
        <Skeleton className={cls.text} width={'100%'} height={50} />
      </VStack>
    )
  }
  if (!comment) {
    return null
  }

  return (
    <VStack data-testid="CommentCard.Content" gap='8' max className={classNames(cls.CommentCard, {}, [className])}>
      <div className={cls.header}>
        {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
        <Text className={cls.username} title={comment.user.username} />
      </div>
      <Text className={cls.text} text={comment.text} />
    </VStack>
  )
})

export default CommentCard