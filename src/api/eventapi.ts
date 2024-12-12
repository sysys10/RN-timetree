import axios, { AxiosError } from 'axios';
import { Event } from '../types/calendar';
import {
  getAsyncStorage,
  removeAsyncStorage,
  setAsyncStorage,
} from '@/utils/asyncStorage';
import axiosInstance from './axios';

interface CacheData<T> {
  data: T;
  timestamp: number;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

const eventApi = {
  fetchAllEvents: async (useCache: boolean = true): Promise<Event[]> => {
    try {
      if (useCache) {
        const cachedData = await getAsyncStorage('events');
        if (cachedData) {
          return cachedData;
        }
      }

      const response = await axiosInstance.get<ApiResponse<Event[]>>('/events');
      const events = response.data.data;

      // 새로운 데이터 캐싱
      await setAsyncStorage('events', events);

      return events;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // 네트워크 에러시 캐시된 데이터 반환 시도
        const cachedData = await getAsyncStorage('events');
        if (cachedData) {
          console.log('Returning cached data due to network error');
          return cachedData;
        }
      }
      throw error;
    }
  },

  addEvent: async (formData: Partial<Event>): Promise<Event> => {
    try {
      const response = await axiosInstance.post<ApiResponse<Event>>(
        '/events',
        formData,
      );
      // 새 이벤트가 추가되면 캐시 무효화
      await removeAsyncStorage('events');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  updateEvent: async (
    eventId: string,
    formData: Partial<Event>,
  ): Promise<Event> => {
    try {
      const response = await axiosInstance.put<ApiResponse<Event>>(
        `/events/${eventId}`,
        formData,
      );
      // 이벤트 수정시 캐시 무효화
      await removeAsyncStorage('events');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  deleteEvent: async (eventId: string): Promise<void> => {
    try {
      await axiosInstance.delete<ApiResponse<void>>(`/events/${eventId}`);
      // 이벤트 삭제시 캐시 무효화
      await removeAsyncStorage('events');
    } catch (error) {
      throw error;
    }
  },

  // 캐시 관리 메서드

  // 선택적: 강제로 캐시 새로고침
  refreshCache: async (): Promise<void> => {
    try {
      const response = await axiosInstance.get<ApiResponse<Event[]>>('/events');
      await setAsyncStorage('events', response.data.data);
    } catch (error) {
      throw error;
    }
  },
};

export default eventApi;
