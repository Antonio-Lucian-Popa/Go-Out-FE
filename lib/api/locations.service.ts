import api from '../axios';
import { Location } from '@/types';

class LocationsService {
  static async getLocations(): Promise<Location[]> {
    const response = await api.get<Location[]>('/locations');
    return response.data;
  }

  static async getLocationsByType(type: string): Promise<Location[]> {
    const response = await api.get<Location[]>(`/locations/type/${type}`);
    return response.data;
  }

  static async getLocation(id: string): Promise<Location> {
    const response = await api.get<Location>(`/locations/${id}`);
    return response.data;
  }

  static async createLocation(location: Omit<Location, 'id' | 'createdBy'>): Promise<Location> {
    const response = await api.post<Location>('/locations', location);
    return response.data;
  }

  static async updateLocation(id: string, location: Partial<Location>): Promise<Location> {
    const response = await api.put<Location>(`/locations/${id}`, location);
    return response.data;
  }

  static async deleteLocation(id: string): Promise<void> {
    await api.delete(`/locations/${id}`);
  }
}