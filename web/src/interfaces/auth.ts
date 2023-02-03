import type { User } from './user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface SignUpCredential {
  name: string;
  email: string;
  password: string;
}

export type SignUpResponse = Omit<User, 'createdAt'>;
