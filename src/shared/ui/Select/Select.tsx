import { ChangeEvent,  useMemo } from 'react';
import cls from './Select.module.scss';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';


export interface SelectOptions<T extends string> {
  value: T;
  content: string;
}


interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOptions<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const { className, label, options, value, onChange, readonly } =  props

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T)
  }

  const optionsList = useMemo(() => {
    return options?.map(opt => (
      <option className={cls.option} value={opt.value} key={opt.value}>
        {opt.content}
      </option>
    ))
  }, [options])

  const mods: Mods = {

  }
  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && (<span className={cls.label}>
        {`${label}>`}
      </span>)
      }
      <select disabled={readonly} value={value} onChange={onChangeHandler}  className={cls.select}>
        {optionsList}
      </select>
    </div>
  );
};