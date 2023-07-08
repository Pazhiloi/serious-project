import {memo, useCallback, useMemo} from 'react'
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import { ArticleType } from '../../model/const/articlesConst'
import { useTranslation } from 'react-i18next';
interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;
  const { t, i18n } = useTranslation()

  const onTabClick = useCallback((tab: TabItem) => {
    onChangeType(tab.value as ArticleType)
  }, [onChangeType])

  const typeTabs = useMemo<TabItem[]>(() => [
    {
      value: ArticleType.ALL,
      content: t('All')
    },
    {
      value: ArticleType.IT,
      content: t('It')
    },
    {
      value: ArticleType.ECONOMICS,
      content: t('Economic')
    },
    {
      value: ArticleType.SCIENCE,
      content: t('Science')
    }
  ], [t])
  return (
    <Tabs
      value={value}
      tabs={typeTabs}
      onTabClick={onTabClick}
      className={classNames('', {}, [className])}
    />
  );
});