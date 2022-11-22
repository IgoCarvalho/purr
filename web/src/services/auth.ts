import type { LoginCredentials, LoginResponse } from '@/interfaces/auth';
import axios from '@/lib/axios';

export function getToken() {
  return localStorage.getItem('_token');
}

export function setToken(token: string) {
  localStorage.setItem('_token', token);
}

export async function doLogin(credentials: LoginCredentials) {
  try {
    const response = await axios.post<LoginResponse>(
      '/users/login',
      credentials
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
