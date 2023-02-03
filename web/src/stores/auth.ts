import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { User } from '@/interfaces/user';
import type { LoginCredentials, SignUpCredential } from '@/interfaces/auth';
import * as authService from '@/services/auth';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const isLoading = ref(true);
  const user = ref<User | null>(null);

  async function login({ email, password }: LoginCredentials) {
    isLoading.value = true;

    try {
      const response = await authService.login({ email, password });

      if (response) {
        authService.setToken(response.token);

        user.value = response.user;
        isAuthenticated.value = true;
      }
    } catch (err) {
      console.log(err);

      user.value = null;
      isAuthenticated.value = false;

      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function signUp(credentials: SignUpCredential) {
    await authService.signUp(credentials);
  }

  function logout() {
    user.value = null;
    isAuthenticated.value = false;

    authService.clearToken();
  }

  return {
    isAuthenticated,
    isLoading,
    login,
    signUp,
    logout,
    user,
  };
});
