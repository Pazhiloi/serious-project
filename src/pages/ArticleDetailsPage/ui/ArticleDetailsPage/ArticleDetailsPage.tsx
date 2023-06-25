import { useTranslation } from 'react-i18next';
import cls from './ArticleDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import { Text } from '@/shared/ui/Text/Text';
import { CommentList } from '@/entities/Comment';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader';
import { articleDetailsCommnetsReducer, getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { AddCommentForm } from '@/features/addCommentForm';
import { addCommentForArticle } from '@/features/addCommentForm/model/services/addCommentForArticle/addCommentForArticle';

interface ArticleDetailsPageProps {
  className?: string;
}
const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommnetsReducer
}
 const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
   const { t, i18n } = useTranslation()
   const { id } = useParams<{ id: string }>()
   const dispatch = useAppDispatch()

   const comments = useSelector(getArticleComments.selectAll)
   const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
   const onSendComment = useCallback((text: string) => {
    // @ts-ignore
     dispatch(addCommentForArticle(text))
   }, [dispatch])
   useInitialEffect(() => {
     dispatch(fetchCommentsByArticleId(id))
   })
   if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )
   }
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetails id={id} />
        <Text className={cls.commentTitle} title={t('Comments')} />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);