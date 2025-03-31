import api from '../axios';
import { User } from '@/types';

class UsersService {
  static async getCurrentUser(): Promise<User> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('No user ID found');
    }
    const response = await api.get<User>(`/users/${userId}`);
    return response.data;
  }

  static async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await api.put<User>(`/users/${id}`, userData);
    return response.data;
  }
}