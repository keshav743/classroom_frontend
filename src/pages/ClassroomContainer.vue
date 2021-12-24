<template>
  <div>
    <div class="flex flex-col">
      <div
        class="w-screen h-12 shadow-xl fixed"
        style="background-color: #52ad9c"
      >
        <div class="flex flex-row justify-between px-4">
          <h1 class="text-white text-2xl py-2 font-bold">Classroom</h1>
          <div>
            <button
              class="text-white rounded-lg p-2 m-1 hover:underline"
              @click="logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div class="mt-16">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/auth");
    },
  },
};
</script>
