import { Select } from '@/shared/ui/Select/Select';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Currency } from '../../model/types/currency';
import { memo, useCallback } from 'react';
import { ListBox } from '@/shared/ui/ListBox/ListBox';

interface CurrencySelectProps {
  className?: string;
  value?:Currency;
  onChange?:(value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD }
]

export const CurrencySelect = memo(({ className, value, onChange, readonly }: CurrencySelectProps) => {
  const {t} = useTranslation();

  const onChangeHandler = useCallback(
    () => {
      onChange?.(value as Currency)
    },
    [onChange],
  )
  
  return (
    <ListBox
      className={className}
      value={value}
      defaultValue={t('Choose a currency')}
      label={t('Choose a currency')}
      onChange={onChangeHandler}
      items={options}
      readonly={readonly}
      direction='top'
    />
  );
});