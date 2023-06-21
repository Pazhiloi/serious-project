import { useTranslation } from 'react-i18next';
import cls from './LoginForm.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { memo, useCallback, useEffect } from 'react';
import { loginActions, loginReducer } from './../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { ReduxStoreWithManager } from '@/app/providers/StoreProvider';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader';

export interface LoginFormProps {
  className?: string;
}

const initialReducers: ReducersList = {
loginForm: loginReducer
}

const LoginForm = memo(({ className }: LoginFormProps) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const username = useSelector(getLoginUsername)
  const password = useSelector(getLoginPassword)
  const isLoading = useSelector(getLoginIsLoading)
  const error = useSelector(getLoginError)
  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value))
    },
    [dispatch],
  )
  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value))
    },
    [dispatch],
  )
  const onLoginClick = useCallback(
    () => {
      dispatch(loginByUsername({username, password}))
    },
    [dispatch, username, password],
  )
  

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={'Форма авторизации'}/>
     {error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR}/>}
      <Input value={username} onChange={onChangeUsername} autofocus placeholder='Введите username' type="text" className={cls.input} />
      <Input value={password} onChange={onChangePassword} placeholder='Введите пароль' type="text" className={cls.input} />
      <Button disabled={isLoading} onClick={onLoginClick} theme={ButtonTheme.OUTLINE}  className={cls.loginBtn}>
        {t('Войти')}
      </Button>
    </div>
    </DynamicModuleLoader>

  );
});

export default LoginForm;