import cls from './ProfileCard.module.scss';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/Input';
import { Profile } from '../../model/types/profile';
import { Loader } from '@/shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text';
import { KeyboardEvent } from 'react';
import { Avatar } from '@/shared/ui/Avatar';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/Stack';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  readonly?: boolean;
  isLoading?: boolean;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency?: Currency) => void;
  onChangeCountry?: (country?: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { className,
    data,
    error,
    isLoading,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeCity,
    onChangeAge,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency, 
    onChangeCountry
  } = props;
  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
      <HStack justify={'center'} max className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
        <Loader />
      </HStack>
    )
  }

  if (error) {
    return <HStack justify={'center'} max className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
      <Text align={TextAlign.CENTER} theme={TextTheme.ERROR} title={t('Произошла ошибка при загрузке профиля')} text={t('Попробуйте обновить страницу')} />
    </HStack>
  }

  const onKeyPress = (e: KeyboardEvent) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault()
    }
  }

  const mods : Mods = {
    [cls.editing]: !readonly,
  }

  return (
    <VStack max gap='8' className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>

        {data?.avatar && (<div className={cls.avatarWrapper}>
          <HStack justify={'center'} max>
          <Avatar src={data?.avatar} />
          </HStack>
        </div>)
        }
        <Input readonly={readonly} onChange={onChangeFirstname} className={cls.input} value={data?.first} placeholder={t('Ваше Имя')} data-testid={'ProfileCard.firstname'} />
        <Input readonly={readonly} onChange={onChangeLastname} className={cls.input} value={data?.lastname} placeholder={t('Ваше Фамилия')} data-testid={'ProfileCard.lastname'} />
        <Input onKeyPress={onKeyPress} readonly={readonly} onChange={onChangeAge} className={cls.input} value={data?.age} placeholder={t('Ваш Возраст')} />
        <Input readonly={readonly} onChange={onChangeCity} className={cls.input} value={data?.city} placeholder={t('Город')} />
        <Input readonly={readonly} onChange={onChangeUsername} className={cls.input} value={data?.username} placeholder={t('Введите имя пользователя')} />
        <Input readonly={readonly} onChange={onChangeAvatar} className={cls.input} value={data?.avatar} placeholder={t('Введите ссылку на аватар')} />
        <CurrencySelect className={cls.input} readonly={readonly} onChange={onChangeCurrency}  value={data?.currency} />
        <CountrySelect className={cls.input} readonly={readonly} onChange={onChangeCountry}  value={data?.country} />
      </div>
    </VStack>
  );
};