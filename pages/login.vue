<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userLogin } from "~/server/auth";
import { setCookiesUser } from '@/utils/cookie';
import { useAuth } from '~/composables/useAuth';

const { checkAuth } = useAuth();

const router = useRouter();
const notyf = useNuxtApp().$notyf;

const email = ref(""); 
const password = ref(""); 
const error = ref("");

const handleLogin = async () => {
  try {
    const res = await userLogin(email.value, password.value);
    if(res.token){
      setCookiesUser(res.token, email.value);
      notyf.success('Login Success!');
      checkAuth();
      router.push("/");
    } else{
      notyf.error('Login Failed!');
    }
  } catch (err) {
    notyf.error('Login Failed!');
  }
};
</script>

<template>
  <div class="w-screen h-[100dvh] relative">
    <img src="/images/background.webp" class="w-full h-full object-cover" />

    <div
      class="absolute top-[50%] start-[50%] translate-x-[-50%] translate-y-[-50%] w-full p-5"
    >
      <div
        class="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto mt-10 p-4 border rounded-xl bg-white"
      >
        <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
        <form @submit.prevent="handleLogin">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="border rounded w-full px-3 py-2"
            required
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="border rounded w-full px-3 py-2 mt-2"
            required
          />
          <button class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4 w-full">Login</button>
        </form>
        <p class="mt-2 text-center">
          Do you have account?
          <a href="/register" class="text-blue-500">Register</a>
        </p>
      </div>
    </div>
  </div>
</template>
