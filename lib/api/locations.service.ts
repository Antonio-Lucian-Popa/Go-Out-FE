import api from '../axios';
import { Location, MapBounds } from '@/types';

interface LocationBoundsParams extends Partial<MapBounds> {
  type?: string;
  radius?: number;
  zoom?: number;
}

export class LocationsService {
  static async getLocations(): Promise<Location[]> {
    const response = await api.get<Location[]>('/locations');
    return response.data;
  }

  static async getLocationsByType(type: string): Promise<Location[]> {
    const response = await api.get<Location[]>(`/locations/type/${type}`);
    return response.data;
  }

  static async getLocationsByBounds(params: LocationBoundsParams): Promise<Location[]> {
    const response = await api.get<Location[]>('/locations/bounds', {
      params: {
        north: params.north,
        south: params.south,
        east: params.east,
        west: params.west,
        zoom: params.zoom,
        type: params.type,
        radius: params.radius
      }
    });
    return response.data;
  }

  static async getLocation(id: string): Promise<Location> {
    const response = await api.get<Location>(`/locations/${id}`);
    return response.data;
  }

  static async createLocation(location: Omit<Location, 'id' | 'ownerUserId'>): Promise<Location> {
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