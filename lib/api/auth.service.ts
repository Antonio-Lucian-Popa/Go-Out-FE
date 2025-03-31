import api from '../axios';
import { User } from '@/types';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export class AuthService {
  private static setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  static getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  static clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
  }

  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const { accessToken, refreshToken, user } = response.data;
    this.setTokens(accessToken, refreshToken);
    localStorage.setItem('userId', user.id);
    return response.data;
  }

  static async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    const { accessToken, refreshToken, user } = response.data;
    this.setTokens(accessToken, refreshToken);
    localStorage.setItem('userId', user.id);
    return response.data;
  }

  static async refreshToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await api.post<{ accessToken: string }>('/auth/refresh', {
      refreshToken,
    });
    
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  }

  static async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      this.clearTokens();
    }
  }
}

export default AuthService