import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { User } from '@/interfaces/user';
import type { LoginCredentials } from '@/interfaces/auth';
import { doLogin, setToken } from '@/services/auth';

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(false);
  const isLoading = ref(true);
  const user = ref<User | null>(null);

  async function login({ email, password }: LoginCredentials) {
    isLoading.value = true;

    try {
      const response = await doLogin({ email, password });

      if (response) {
        setToken(response.token);

        user.value = response.user;
        authenticated.value = true;
      }
    } catch (err) {
      console.log(err);

      user.value = null;
      authenticated.value = false;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    authenticated,
    isLoading,
    login,
    user,
  };
});
