import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './CommentList.module.scss'
import { useTranslation } from 'react-i18next';
import CommentCard from '../CommentCard/CommentCard';
import { Text } from '@/shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;

}
 
export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props
  const { t, i18n } = useTranslation();

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentList, {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </div>

    )
  }
  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments?.length
        ? comments.map((comment) => {
          return <CommentCard isLoading={isLoading} className={cls.comment} key={comment.id} comment={comment} />
        })
        : <Text text={t('No comments')} />}
    </div>
  )
})

export default CommentList