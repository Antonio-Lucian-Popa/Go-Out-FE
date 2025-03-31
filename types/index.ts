export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN_LOCAL';
}

export interface Location {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  address: string;
  createdBy: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  locationId: string;
  startDate: string;
  endDate: string;
  createdBy: string;
  participants: number;
}