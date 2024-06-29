import { cn } from '@/lib/utils';
import { CSSProperties, forwardRef, useId } from 'react';

type Props = {
  label?: string;
  icon?: React.ReactNode;
  value?: string;
  name?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  labelStyles?: CSSProperties;
};

const Radio = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    name,
    label,
    checked = false,
    icon,
    onChange,
    labelStyles,
    className,
    ...rest
  } = props;

  const id = useId();

  return (
    <>
      <input
        id={id}
        ref={ref}
        type='radio'
        name={name}
        checked={checked}
        className='peer hidden'
        onChange={(e) => onChange?.(e.target.value)}
        {...rest}
      />
      <label
        htmlFor={id}
        style={labelStyles}
        className={cn(
          'inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-500 bg-blue-300 px-5 py-4 text-gray-400',
          'hover:border-blue-200 hover:bg-blue-200 peer-checked:border-white peer-checked:bg-blue-100 hover:peer-checked:border-blue-200 hover:peer-checked:bg-blue-200',
          className
        )}
      >
        {label && (
          <div className='flex items-center gap-4'>
            {icon}
            <div className='w-full text-lg font-semibold'>{label}</div>
          </div>
        )}
      </label>
    </>
  );
});

Radio.displayName = 'Radio';

export default Radio;
