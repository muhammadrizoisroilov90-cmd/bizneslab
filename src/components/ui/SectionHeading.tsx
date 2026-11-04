import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  aside?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  aside,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('section-heading', `section-heading--${align}`, className)}>
      <div className="section-heading__copy">
        <span className="eyebrow">
          <span className="eyebrow__line" aria-hidden="true" />
          {eyebrow}
        </span>
        <h2>{title}</h2>
        {lead ? <p className="section-lead">{lead}</p> : null}
      </div>
      {aside ? <div className="section-heading__aside">{aside}</div> : null}
    </div>
  );
}
