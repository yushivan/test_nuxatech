<script setup lang="ts">
import { ref } from "vue";
import { getListUser } from "~/server/auth";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const currentPage = ref(1);
const totalPages = ref(1);
const users = ref<User[]>([]);

const fetchUsers = async (page = 1) => {
  const res = await getListUser(page);
  users.value = res.data;
  totalPages.value = res.total_pages;
  currentPage.value = res.page;
};

await fetchUsers(currentPage.value);

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    fetchUsers(currentPage.value + 1);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    fetchUsers(currentPage.value - 1);
  }
};
</script>

<template>
  <div class="w-screen h-[40dvh] relative">
    <img src="/images/background.webp" alt="header-image" class="w-full h-full object-cover" />
  </div>
  <div class="p-10">
    <p class="text-center text-3xl md:text-4xl lg:text-5xl uppercase mb-8 font-medium">Our Team</p>
    <div class="flex flex-row flex-wrap items-start justify-center">
      <div v-for="user in users" :key="user.id" class="text-center mx-5 mb-3">
        <img :src="user.avatar" class="w-[100px] h-[100px] md:w-[90px] md:h-[90px] lg:w-[120px] lg:h-[120px] rounded-full" alt="team image" />
        <p class="mt-2 text-lg font-medium">{{ user.first_name }}</p>
      </div>
    </div>

    <!-- Pagination Buttons -->
    <div class="flex justify-center mt-6 gap-4">
      <button @click="prevPage" :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
        Prev
      </button>
      <span class="px-4 py-2">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
        Next
      </button>
    </div>
  </div>
</template>
