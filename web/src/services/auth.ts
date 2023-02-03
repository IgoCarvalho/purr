import type {
  LoginCredentials,
  LoginResponse,
  SignUpCredential,
  SignUpResponse,
} from '@/interfaces/auth';
import axios from '@/lib/axios';

export function getToken() {
  return localStorage.getItem('_token');
}

export function setToken(token: string) {
  localStorage.setItem('_token', token);
}

export async function login(credentials: LoginCredentials) {
  const response = await axios.post<LoginResponse>('/users/login', credentials);

  return response.data;
}

export async function signUp(credentials: SignUpCredential) {
  const response = await axios.post<SignUpResponse>('/users', credentials);

  return response.data;
}
