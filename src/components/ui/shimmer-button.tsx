import { cn } from '@/lib/utils';
import { Button, ButtonProps } from './button';

const ShimmerButton = (props: ButtonProps) => {
  const { className, ...rest } = props;

  return (
    <Button
      {...rest}
      className={cn(
        'inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors hover:outline-none hover:ring-2 hover:ring-slate-400 hover:ring-offset-2 hover:ring-offset-slate-50',
        className
      )}
    />
  );
};

export default ShimmerButton;
