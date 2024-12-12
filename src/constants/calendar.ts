import { ViewOption } from '../types/calendar';

export type TabType = '일정' | '작성' | '공유' | '알림' | '설정';

export const VIEW_OPTIONS: ViewOption[] = [
  { id: '1', label: '월별', view: 'month' },
  { id: '2', label: '주별', view: 'week' },
  { id: '3', label: '일정', view: 'agenda' },
];

//주차 시간들
export const STARTTIME = 9 * 60; // 0 -> 540
export const ENDTIME = 18 * 60;
export const interval = 30;
