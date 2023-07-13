import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import {memo, useCallback} from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi';
import { Skeleton } from '@/shared/ui/Skeleton';
export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

export const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;
  const { t, i18n } = useTranslation();

  const userData = useSelector(getUserAuthData)

  const { data, isLoading } = useGetArticleRating({
    articleId,
    userId: userData?.id ?? ''
  })

  const [rateAticleMutation] = useRateArticle()

  const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
    try {
      rateAticleMutation({
        userId: userData?.id ?? '',
        articleId,
        rate: starsCount,
        feedback
      })
    } catch  {
      console.log('Mistake is happened')
    }
  }, [userData?.id, articleId, rateAticleMutation])

  const onAccept = useCallback((starsCount: number, feedback?: string) => {
    handleRateArticle(starsCount, feedback)
  }, [handleRateArticle])

  const onCancel = useCallback((starsCount: number) => {
    handleRateArticle(starsCount)
  }, [handleRateArticle])

  if (isLoading) {
    return <Skeleton width='100%' height={120} />
  }

  const rating = data?.[0]
  return (
    <RatingCard
      data-testid="ArticleRating"
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      className={className}
      title={t('Rate the article')}
      feedbackTitle={t('Leave your feedback about the article')}
      hasFeedback
    />
  );
});

export default ArticleRating