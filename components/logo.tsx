import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn('flex items-center', className)}>
      <div className="font-bold text-xl text-pink-600">Yelis</div>
      <div className="ml-1 text-sm text-gray-600 font-medium">Skin Care</div>
    </div>
  );
}
