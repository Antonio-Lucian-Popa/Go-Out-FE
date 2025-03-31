import api from '../axios';
import { Event } from '@/types';

export class EventsService {
  static async getEvents(): Promise<Event[]> {
    const response = await api.get<Event[]>('/events');
    return response.data;
  }

  static async getEvent(id: string): Promise<Event> {
    const response = await api.get<Event>(`/events/${id}`);
    return response.data;
  }

  static async createEvent(event: Omit<Event, 'id' | 'createdBy' | 'participants'>): Promise<Event> {
    const response = await api.post<Event>('/events', event);
    return response.data;
  }

  static async updateEvent(id: string, event: Partial<Event>): Promise<Event> {
    const response = await api.put<Event>(`/events/${id}`, event);
    return response.data;
  }

  static async deleteEvent(id: string): Promise<void> {
    await api.delete(`/events/${id}`);
  }
}