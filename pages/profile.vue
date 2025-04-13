<script setup>
import { useAuth } from "~/composables/useAuth";
import Cookies from "js-cookie";
import { getListUser, userDelete, userUpdate } from "~/server/auth";

const { checkAuth } = useAuth();

onMounted(() => checkAuth());

const router = useRouter();
const notyf = useNuxtApp().$notyf;
const userEmail = Cookies.get("email");
const id = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");

const { data: users, pending: usersPending } = await useAsyncData(
  "users",
  getListUser
);

watchEffect(() => {
  if (users.value && userEmail) {
    const matchedUser = users.value.find((u) => u.email === userEmail);
    if (matchedUser) {
      id.value = matchedUser.id;
      firstName.value = matchedUser.first_name;
      lastName.value = matchedUser.last_name;
      email.value = matchedUser.email;
    }
  }
});

const handleUpdate = async () => {
  try {
    const res = await userUpdate(id.value, firstName.value, lastName.value);
    if (res.updatedAt) {
      notyf.success("Update Success!");
      router.push("/");
    } else {
      notyf.error("Update Failed!");
    }
  } catch (err) {
    notyf.error("Update Failed!");
  }
};

const handleDelete = async () => {
  try {
    const res = await userDelete(id.value);
    notyf.success("Delete Success!");
    router.push("/");
  } catch (err) {
    notyf.error("Delete Failed!");
  }
};
</script>

<template>
  <div class="w-screen h-[100dvh] relative">
    <img src="/images/background.webp" alt="background-image" class="w-full h-full object-cover" />

    <div
      class="absolute top-[50%] start-[50%] translate-x-[-50%] translate-y-[-50%] w-full p-5"
    >
      <div
        class="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto mt-10 p-4 border rounded-xl bg-white"
      >
        <h1 class="text-2xl font-bold mb-4">User Profile</h1>

        <form @submit.prevent="handleUpdate">
          <input v-model="id" type="hidden" />
          <input
            v-model="firstName"
            type="text"
            class="border rounded w-full px-3 py-2"
            placeholder="First Name"
          />
          <input
            v-model="lastName"
            type="text"
            class="border rounded w-full px-3 py-2 mt-2"
            placeholder="Last Name"
          />
          <input
            v-model="email"
            type="email"
            class="border rounded w-full px-3 py-2 mt-2"
            placeholder="Email"
            disabled
          />
          <button
            class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4 w-full"
          >
            Update
          </button>
        </form>

        <button
          class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 mt-4 w-full"
          data-modal-target="popup-modal"
          data-modal-toggle="popup-modal"
        >
          Delete User
        </button>
      </div>
    </div>
  </div>

  <div
    id="popup-modal"
    tabindex="-1"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <svg
            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete it?
          </h3>
          <button
            data-modal-hide="popup-modal"
            type="button"
            @click="handleDelete"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
            Yes, I'm sure
          </button>
          <button
            data-modal-hide="popup-modal"
            type="button"
            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
