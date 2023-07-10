import { HTMLAttributeAnchorTarget, memo } from 'react'
import cls from './ArticleList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Article } from '../../model/types/article';
import { useTranslation } from 'react-i18next';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import ArticleListItemSkeleton from '../ArticleListItem/ArticleListItemSkeleton';
import { Text, TextSize } from '@/shared/ui/Text'
import { AutoSizer, List, ListRowProps, WindowScroller } from 'react-virtualized';
import { PAGE_ID } from '@/widgets/Page/Page';
import { ArticleView } from '../../model/const/articlesConst';
interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeleton = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ))
}

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, isLoading, view = ArticleView.SMALL,
    target } = props;

  const { t, i18n } = useTranslation()

  const renderArticle = (article: Article) => {
    return <ArticleListItem target={target} article={article} view={view} className={cls.card} key={article.id} />
  }

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Articles are not found')} />
      </div>
    )
  }

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0
        ? articles.map(renderArticle)
        : null}
      {isLoading && getSkeleton(view)}
    </div>

  );
});

export default ArticleList;