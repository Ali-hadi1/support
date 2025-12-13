import type { LucideIcon } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { cn } from '~/lib/utils';

interface InfoCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  bgColor?: string;
  textColor?: string;
  valueColor?: string;
  loading?: boolean;
  className?: string;
}

export default function InfoCard({
  title,
  value,
  icon: Icon,
  iconBgColor = 'bg-purple-100',
  iconColor = 'text-purple-600',
  bgColor = 'bg-white',
  textColor = 'text-gray-700',
  valueColor = 'text-gray-900',
  loading = false,
  className,
}: InfoCardProps) {
  if (loading) {
    return (
      <div
        className={cn('bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100', className)}
      >
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20 md:w-24" />

          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
            <Skeleton className="w-6 h-6" />
          </div>
        </div>

        <div className="mt-2">
          <Skeleton className="h-6 w-16 md:w-20" />
        </div>

        <div className="mt-2">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    );
  }
  return (
    <div className={`${bgColor} rounded-xl px-6 py-4 shadow-sm border border-gray-100`}>
      <div className="flex items-center justify-between">
        <h2 className={`${textColor} font-medium text-xs md:text-sm`}>{title}</h2>
        <div className={`w-10 h-10 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>

      <div className="">
        <span className={`text-sm md:text-xl font-bold ${valueColor}`}>{value || 0}</span>
      </div>
    </div>
  );
}
