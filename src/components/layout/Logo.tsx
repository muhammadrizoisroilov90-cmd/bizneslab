import { cn } from '../../lib/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('logo', className)} aria-label="BiznesLab">
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M8 24V8h8.2c3.8 0 6 1.9 6 5 0 2.1-1.1 3.6-2.9 4.3 2.4.6 3.9 2.3 3.9 4.9 0 3.5-2.5 5.8-6.7 5.8H8Z"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path
            d="M13 12.2h3.2c1.5 0 2.4.8 2.4 2.1 0 1.4-1 2.2-2.6 2.2H13v-4.3ZM13 19.6h3.8c1.6 0 2.6.8 2.6 2.2 0 1.5-1.1 2.3-2.8 2.3H13v-4.5Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="logo__text">
        Biznes<span>Lab</span>
      </span>
    </span>
  );
}
