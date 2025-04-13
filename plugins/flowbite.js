import 'flowbite';
export default defineNuxtPlugin(() => {
    return {
    provide: {
      flowbite: () => import('flowbite'),
    },
  };
})