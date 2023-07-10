/* eslint-disable @typescript-eslint/array-type */
import {memo, useMemo} from 'react'
import cls from './ArticleSortSelector.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types';
import { useTranslation } from 'react-i18next';
import { Select, SelectOptions } from '@/shared/ui/Select';
interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, sort, order, onChangeOrder, onChangeSort } = props;
  const { t, i18n } = useTranslation()

  const orderOptions = useMemo<SelectOptions<SortOrder>[]>(() => [
    {
      value: 'asc',
      content: t('ascending')
    },
    {
      value: 'desc',
      content: t('descending')
    }
  ], [t])

  const sortFieldOptions = useMemo<SelectOptions<ArticleSortField>[]>(() => [
    {
      value: ArticleSortField.CREATED,
      content: t('data')
    },
    {
      value: ArticleSortField.TITLE,
      content: t('title')
    },
    {
      value: ArticleSortField.VIEWS,
      content: t('watching')
    }
  ], [t])
  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select options={sortFieldOptions} label={t('Sort by')} />
      <Select options={orderOptions} label={t('by')} />
    </div>
  );
});