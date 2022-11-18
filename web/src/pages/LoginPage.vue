<script setup lang="ts">
import MyButton from '@/components/MyButton.vue';
import MyInput from '@/components/MyInput.vue';
import { ref } from 'vue';

const credentials = ref({
  email: '',
  password: '',
});

function handleSubmit() {
  console.log('submitted');
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
          class="block text-sm p-4 rounded-md bg-black/20 border border-transparent hover:border-gray-700 hover:bg-black/30"
          to="/register"
        >
          Ainda não possui conta? <br />
          <span class="text-xl font-semibold">Crie sua conta agora!</span>
        </router-link>
      </div>

      <div class="px-10 flex flex-col justify-center items-center">
        <h2 class="self-start text-2xl font-semibold">Login</h2>

        <form
          class="w-full mt-6 flex flex-col gap-2"
          @submit.prevent="handleSubmit"
        >
          <MyInput
            type="text"
            label="E-mail"
            name="email"
            placeholder="seu@email.com"
            :value="credentials.email"
          />
          <MyInput
            type="password"
            label="Senha"
            name="password"
            placeholder="sua senha"
            :value="credentials.password"
          />

          <MyButton class="mt-4" size="md">Login</MyButton>
        </form>
      </div>
    </div>
  </div>
</template>
