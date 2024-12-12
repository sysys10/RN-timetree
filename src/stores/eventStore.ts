import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event } from '@/type';
import eventApi from '../api/eventapi';

interface EventStoreState {
  events: Event[];
  isLoading: boolean;
  error: string | null;
  fetchAllEvents: () => Promise<void>;
  postEvent: (formData: Partial<Event>) => Promise<void>;
  deleteEvents: (eventId: string) => Promise<void>;
  updateEvent: (eventId: string, formData: Partial<Event>) => Promise<void>;
}

const useEventStore = create<EventStoreState>((set, get) => ({
  events: [],
  isLoading: false,
  error: null,

  fetchAllEvents: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await eventApi.fetchAllEvents();
      set({ events: response });

      // AsyncStorage에 캐싱 (선택사항)
      await AsyncStorage.setItem('cached_events', JSON.stringify(response));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '이벤트를 불러오는데 실패했습니다.';
      set({ error: errorMessage });
      console.error('Failed to fetch events:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  postEvent: async formData => {
    try {
      set({ isLoading: true, error: null });
      const response = await eventApi.addEvent(formData);

      // 기존 이벤트 목록에 새 이벤트 추가
      set(state => ({
        events: [...state.events, response],
      }));

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '이벤트 생성에 실패했습니다.';
      set({ error: errorMessage });
      console.error('Failed to create event:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteEvents: async eventId => {
    try {
      set({ isLoading: true, error: null });
      await eventApi.deleteEvent(eventId);

      // 상태에서 해당 이벤트 제거
      set(state => ({
        events: state.events.filter(event => event.id !== eventId),
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '이벤트 삭제에 실패했습니다.';
      set({ error: errorMessage });
      console.error('Failed to delete event:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  updateEvent: async (eventId, formData) => {
    try {
      set({ isLoading: true, error: null });
      const updatedEvent = await eventApi.updateEvent(eventId, formData);

      // 상태에서 해당 이벤트 업데이트
      set(state => ({
        events: state.events.map(event =>
          event.id === eventId ? { ...event, ...updatedEvent } : event,
        ),
      }));

      return updatedEvent;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '이벤트 수정에 실패했습니다.';
      set({ error: errorMessage });
      console.error('Failed to update event:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
export default useEventStore;
