import { Profile } from './domain';

type ViewType = 'month' | 'week' | 'agenda';

interface Event {
  id: string;
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  color: string; // 0,1,2,3,4,5,6,7,8,9
  eventType?: string;
  location?: string;
  description?: string;
  teamId?: string;
  teamName?: string;
  shareId?: string | null;
  locked?: boolean;
}
interface ViewOption {
  id: string;
  label: string;
  view: ViewType;
}
interface EventSubmitData {
  title: string;
  startDate: Date;
  endDate: Date;
  isAllDay: boolean;
  location?: string;
  category?: string;
  description?: string;
  color?: string;
  participants: Profile[];
  repeatSetting?: string;
  isLocked: boolean;
}

export type { Event, EventSubmitData, ViewOption, ViewType };
