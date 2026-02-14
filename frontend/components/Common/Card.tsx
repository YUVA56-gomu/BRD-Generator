import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg border border-secondary-200 shadow-sm',
        hover && 'hover:shadow-md hover:border-secondary-300 transition-all cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
