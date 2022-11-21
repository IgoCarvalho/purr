<script setup lang="ts">
import MyButton from '@/components/MyButton.vue';
import MyInput from '@/components/MyInput.vue';
import { ref } from 'vue';

const credentials = ref({
  userName: '',
  email: '',
  password: '',
});

function handleSubmit() {
  console.log('submitted', credentials.value);
  // do something
}
</script>

<template>
  <div class="min-h-screen flex justify-center items-center">
    <div
      class="w-full max-w-3xl grid grid-cols-2 rounded-lg overflow-hidden bg-[#773fcf20] border border-slate-900"
    >
      <div class="p-4 bg-purr-pink bg-size-200%">
        <h1 class="text-4xl text-white font-bold">
          Crie sua conta e aproveite ao máximo!
        </h1>
        <p class="text-slate-100 mt-1">
          Novas pessoas são bem vindas aqui, aceite esse presente boas vindas!
        </p>

        <img
          class="w-4/5 mx-auto my-5 rounded-md outline outline-gray-900 outline-4 outline-offset-2"
          src="@/assets/images/flower-cat.jpg"
          alt="Cat holding a flower"
        />

        <router-link
          class="block text-sm p-4 rounded-md bg-black/20 border border-transparent hover:border-gray-700 hover:bg-black/30"
          to="/login"
        >
          Já possui uma conta? <br />
          <span class="text-xl font-semibold">Entre e aproveite!</span>
        </router-link>
      </div>

      <div class="px-10 flex flex-col justify-center items-center">
        <h2 class="self-start text-2xl font-semibold">Criar Conta</h2>

        <form
          class="w-full mt-6 flex flex-col gap-2"
          @submit.prevent="handleSubmit"
        >
          <MyInput
            type="text"
            label="Seu nome"
            name="email"
            placeholder="Seu Nome"
            v-model="credentials.userName"
          />
          <MyInput
            type="email"
            label="E-mail"
            name="email"
            placeholder="seu@email.com"
            v-model="credentials.email"
          />
          <MyInput
            type="password"
            label="Senha"
            name="password"
            placeholder="*********"
            v-model="credentials.password"
          />

          <MyButton class="mt-4" size="md">Cadastre-se</MyButton>
        </form>
      </div>
    </div>
  </div>
</template>
