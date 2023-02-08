<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth.store';

import IconPurr from './icons/IconPurr.vue';
import PlusIcon from './icons/PlusIcon.vue';
import SignOutIcon from './icons/SignOutIcon.vue';
import MyButton from './MyButton.vue';
import NavLinks from './NavLinks.vue';
import UserImage from './UserImage.vue';

const authStore = useAuthStore();
const router = useRouter();

function handleLogout() {
  authStore.logout();

  router.push('/');
}
</script>

<template>
  <header
    class="px-6 py-3 h-16 flex items-center text-white sm:sticky top-0 w-full border-b border-gray-900 bg-purr-dark/70 backdrop-blur z-10"
  >
    <div
      class="container mx-auto flex justify-between items-center sm:grid grid-cols-[1fr_auto_1fr]"
    >
      <router-link to="/">
        <IconPurr class="text-yellow-300" />
      </router-link>

      <div class="hidden sm:block">
        <NavLinks />
      </div>

      <div class="flex items-center justify-end gap-4">
        <template v-if="authStore.isAuthenticated">
          <MyButton size="sm" variant="outline" asLink to="/new">
            <PlusIcon class="w-5 h-5" />
            Novo post
          </MyButton>

          <div
            class="group flex items-center gap-2 rounded py-1 px-3 cursor-pointer hover:bgs-gray-800"
          >
            <span class="font-semibold">{{ authStore.user?.name }}</span>

            <div
              class="bg-gray-800 border border-gray-700 p-2 rounded-full group-hover:border-gray-600"
            >
              <UserImage
                class="h-6 w-6"
                :src="authStore.user?.avatarUrl"
                :alt="`${authStore.user?.name} image`"
              />
            </div>

            <MyButton
              @click="handleLogout"
              icon
              size="sm"
              variant="link"
              title="Sair"
            >
              <SignOutIcon class="w-5 h-5" />
            </MyButton>
          </div>
        </template>

        <template v-else>
          <MyButton size="sm" variant="outline" as-link to="/login">
            Login / Entrar
          </MyButton>
        </template>
      </div>
    </div>
  </header>
</template>
