import { forwardRef, useId } from 'react';

type Props = {
  label: string;
  icon?: React.ReactNode;
  value?: string;
  name?: string;
  onChange?: (value: string) => void;
};

const Radio = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { name, label, icon, onChange, ...rest } = props;

  const id = useId();

  return (
    <>
      <input
        id={id}
        ref={ref}
        type='radio'
        name={name}
        className='peer hidden'
        onChange={(e) => onChange?.(e.target.value)}
        {...rest}
      />
      <label
        htmlFor={id}
        className='inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-3 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500'
      >
        <div className='flex gap-4'>
          {icon}
          <div className='w-full text-lg font-semibold'>{label}</div>
        </div>
      </label>
    </>
  );
});

Radio.displayName = 'Radio';

export default Radio;
