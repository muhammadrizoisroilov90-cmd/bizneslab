import { CalendarCheck2, ChartNoAxesCombined, KeyRound, QrCode, Store, Wrench } from 'lucide-react';
import type { IdeaIcon as IdeaIconName } from '../../types';

const icons = {
  qr: QrCode,
  calendar: CalendarCheck2,
  store: Store,
  key: KeyRound,
  tools: Wrench,
  chart: ChartNoAxesCombined,
} as const;

interface IdeaIconProps {
  name: IdeaIconName;
  size?: number;
  strokeWidth?: number;
}

export function IdeaIcon({ name, size = 24, strokeWidth = 1.8 }: IdeaIconProps) {
  const Icon = icons[name];
  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}
