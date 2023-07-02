import { memo, useCallback } from 'react';
import cls from './ArticlesPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleList, ArticleView } from '@/entities/Article';
import { articlePageActions, articlePageReducer, getArticles } from '../../model/slices/articlePageSlice';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getArticlesPageError, getArticlesPageHasMore, getArticlesPageInited, getArticlesPageIsLoading, getArticlesPageNum, getArticlesPageView } from '../../model/selectors/articlesPageSelectors';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import Page from '@/widgets/Page/Page';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlePage: articlePageReducer
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {

  const dispatch = useAppDispatch()
  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const view = useSelector(getArticlesPageView)
  const error = useSelector(getArticlesPageError)
  const page = useSelector(getArticlesPageNum)
  const hasMore = useSelector(getArticlesPageHasMore)
  const inited = useSelector(getArticlesPageInited)
  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlePageActions.setView(view))
  }, [dispatch])

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(initArticlesPage());
  })


  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlesPage, {}, [className])}>
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList
          isLoading={isLoading}
          view={view}
          articles={articles}
        />
    </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage)