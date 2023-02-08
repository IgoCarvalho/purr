<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth.store';

import EnvelopIcon from '@/components/icons/EnvelopIcon.vue';
import LockIcon from '@/components/icons/LockIcon.vue';
import MyButton from '@/components/MyButton.vue';
import MyInput from '@/components/MyInput.vue';

const authStore = useAuthStore();
const router = useRouter();

const isLoading = ref(false);

const credentials = ref({
  email: '',
  password: '',
});

async function handleSubmit() {
  const isFormValid = validateForm();

  if (!isFormValid) {
    return;
  }

  isLoading.value = true;

  try {
    await authStore.login(credentials.value);

    router.push('/');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        window.alert('Email ou Senha inválidos!');
        return;
      }

      window.alert('Aconteceu algo de errado, tente novamente mais tarde!');
      return;
    }

    window.alert('Aconteceu algo inesperado, tente novamente mais tarde!');
  } finally {
    isLoading.value = false;
  }
}

function validateForm() {
  if (credentials.value.email.trim().length === 0) {
    window.alert('Preencha o campo email');

    return false;
  }

  if (credentials.value.password.trim().length === 0) {
    window.alert('Preencha o campo senha');

    return false;
  }

  return true;
}
</script>

<template>
  <div class="min-h-screen flex justify-center items-center">
    <div
      class="w-full max-w-3xl grid grid-cols-2 rounded-lg overflow-hidden bg-gray-900 border border-slate-900"
    >
      <div class="p-4 bg-gray-800 bg-size-200%">
        <h1 class="text-3xl text-white font-bold">
          Bom te ver aqui <br />
          de novo!
        </h1>
        <p class="text-slate-100 mt-1">
          Entre agora e aproveite ao máximo tudo o que temos pra você!
        </p>

        <img
          class="w-4/5 mx-auto my-5 rounded-md outline outline-gray-900 outline-4 outline-offset-2"
          src="@/assets/images/cat-looking.jpg"
          alt="Cat looking for you"
        />

        <router-link
          class="block text-sm p-4 rounded-md bg-gray-900 border border-gray-700 hover:border-gray-600 hover:bg-gray-900/80 transition-colors"
          to="/signup"
        >
          Ainda não possui conta? <br />
          <span class="text-xl font-semibold text-purr-pink"
            >Crie sua conta agora!</span
          >
        </router-link>
      </div>

      <div class="px-10 flex flex-col justify-center items-center">
        <h2 class="self-start text-2xl font-semibold">Login</h2>

        <form
          class="w-full mt-6 flex flex-col gap-2"
          @submit.prevent="handleSubmit"
        >
          <MyInput
            type="email"
            label="E-mail"
            name="email"
            placeholder="seu@email.com"
            v-model="credentials.email"
            :leftIcon="EnvelopIcon"
          />
          <MyInput
            type="password"
            label="Senha"
            name="password"
            placeholder="*********"
            v-model="credentials.password"
            :leftIcon="LockIcon"
          />

          <MyButton :loading="isLoading" class="mt-4" size="md"
            >Entrar</MyButton
          >
        </form>
      </div>
    </div>
  </div>
</template>
