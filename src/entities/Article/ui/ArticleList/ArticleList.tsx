import { HTMLAttributeAnchorTarget, memo } from 'react'
import cls from './ArticleList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Article, ArticleView } from '../../model/types/article';
import { useTranslation } from 'react-i18next';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import ArticleListItemSkeleton from '../ArticleListItem/ArticleListItemSkeleton';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { AutoSizer, List, ListRowProps, WindowScroller } from 'react-virtualized';
import { PAGE_ID } from '@/widgets/Page/Page';
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

  const isBig = view === ArticleView.BIG;

  const itemsPerRow = isBig ? 1 : 3;
  const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow)
  const rowRender = ({ index, isScrolling, key, style }: ListRowProps) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length)

    for (let i = fromIndex; i < toIndex; i+= 1) {
      items.push(
        <ArticleListItem target={target} article={articles[index]} view={view} className={cls.card} key={'str' + i} />
      )
    }
    return (
      <div key={key} style={style} className={cls.row} >
        {items}
      </div>
    )
  }



  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Articles are not found')} />
      </div>
    )
  }

  return (
    <WindowScroller onScroll={() => console.log('scroll')} scrollElement={document.getElementById(PAGE_ID) as Element}>
      {({ height, width, registerChild, onChildScroll, isScrolling, scrollTop }) => (
        <div ref={registerChild} className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
          <List
            height={height ?? 700}
            rowCount={rowCount}
            rowHeight={isBig ? 700 : 330}
            rowRenderer={rowRender}
            width={width ? width - 80 : 700}
            onScroll={onChildScroll}
            isScrolling={isScrolling}
            scrollTop={scrollTop}
          />
          {isLoading && getSkeleton(view)}
        </div>
      )}
    </WindowScroller>


  );
});

export default ArticleList;