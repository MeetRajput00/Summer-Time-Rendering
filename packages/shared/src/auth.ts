export interface User {
  id: string;
  username: string;
  email?: string;
  avatarUrl?: string;
  provider: 'local' | 'google' | 'facebook' | 'github';
  providerId?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  username?: string;
  password?: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
}
