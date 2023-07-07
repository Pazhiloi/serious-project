import { useTranslation } from 'react-i18next';
import cls from './ArticleDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleDetails, ArticleList } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { CommentList } from '@/entities/Comment';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { AddCommentForm } from '@/features/addCommentForm';
import { addCommentForArticle } from '@/features/addCommentForm/model/services/addCommentForArticle/addCommentForArticle';
import Page from '@/widgets/Page/Page';
import { getArticleRecommendations } from '../../model/slice/articleDetaisPageRecommendationsSlice';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendation/fetchArticleRecommendation';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { VStack } from '@/shared/ui/Stack';

interface ArticleDetailsPageProps {
  className?: string;
}
const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer
}
 const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
   const { t, i18n } = useTranslation()
   const { id } = useParams<{ id: string }>()
   const dispatch = useAppDispatch()

   const comments = useSelector(getArticleComments.selectAll)
   const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
   const recommendation = useSelector(getArticleRecommendations.selectAll)
   const recommendationIsLoading = useSelector(getArticleCommentsIsLoading)

  
   
   const onSendComment = useCallback((text: string) => {
    // @ts-ignore
     dispatch(addCommentForArticle(text))
   }, [dispatch])

   useInitialEffect(() => {
     dispatch(fetchCommentsByArticleId(id))
     dispatch(fetchArticleRecommendations())
   })


   if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    )
   }
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <VStack gap='16' max>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <Text
          size={TextSize.L}
          className={cls.commentTitle}
          title={t('Recommendations')}
        />
        <ArticleList
          articles={recommendation}
          isLoading={recommendationIsLoading}
          className={cls.recommendations}
          target="_blank"
        />
        <Text
          size={TextSize.L}
          className={cls.commentTitle}
          title={t('Comments')}
        />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);