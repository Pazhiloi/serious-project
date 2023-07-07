import {memo, useCallback} from 'react'
import cls from './AddCommentForm.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getAddCommentFromError, getAddCommentFromText } from '../../model/selectors/addCommentFormSelectors';
import { addCommentFormAction, addCommentFormReducer } from '../../model/slices/addCommentFormSlice';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader';
import { sendComment } from '../../model/services/sendComment/sendComment';
import { HStack } from '@/shared/ui/Stack';
export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer
}

 const AddCommentForm = memo((props: AddCommentFormProps) => {
   const { className, onSendComment } = props;
  const { t, i18n } = useTranslation();
  const text = useSelector(getAddCommentFromText)
  const error = useSelector(getAddCommentFromError)
  const dispatch = useAppDispatch()

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormAction.setText(value))
  }, [dispatch])

   const onSendHandler = useCallback(() => {
     onSendComment(text || '')
     onCommentTextChange('')
   }, [onCommentTextChange, onSendComment, text])
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <HStack justify='between' max className={classNames(cls.AddCommentForm, {}, [className])}>
      <Input
        className={cls.input}
        placeholder={t('Write a comment')}
        value={text}
        onChange={onCommentTextChange}
      />
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={onSendHandler}
      >
        {t('Send')}
      </Button>
    </HStack>
    </DynamicModuleLoader>

  )
});

export default AddCommentForm