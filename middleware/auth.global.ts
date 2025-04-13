import { defineNuxtRouteMiddleware, useCookie } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('access_token');
  const protectedRoutes = ['/profile'];
  if (protectedRoutes.includes(to.path) && !token.value) {
    window.location.href = '/login';
  }
});

