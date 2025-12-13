import { cn } from '~/lib/utils';

interface LoadingSpinnerProps {
  text: string;
  spinnerClassName?: string;
  textClassName?: string;
}

export default function LoadingSpinner({
  text = 'Loading...',
  spinnerClassName,
  textClassName,
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={cn(`relative`, spinnerClassName)}>
        <div className="absolute inset-0 rounded-full border-4 border-current opacity-30 animate-ping"></div>
        <div className="absolute inset-0 rounded-full border-4 border-current border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/3 h-1/3 rounded-full bg-current opacity-75 animate-pulse"></div>
        </div>
      </div>
      {text && <p className={cn(`text-lg font-medium animate-pulse`, textClassName)}>{text}</p>}
    </div>
  );
}
