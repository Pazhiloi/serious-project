import {memo} from 'react'
import cls from './ArticleEditPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Page from '@/widgets/Page/Page';
interface ArticleEditPageProps {
  className?: string;
}

export const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } =  props;
  const { t, i18n } = useTranslation()

  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      {isEdit ? t('Article is edited according to ID = ') + id : t('Create a new article')}
    </Page>
  );
});


export default ArticleEditPage;