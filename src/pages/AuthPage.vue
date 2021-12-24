<template>
  <div class="flex flex-col md:flex-row h-screen">
    <div class="bg-green-custom w-full h-28 md:w-1/3 md:h-screen">
      <div class="mx-4 mt-6 md:text-center md:mt-64">
        <h1 class="text-white text-2xl font-bold md:text-3xl">
          Classroom Portal
        </h1>
        <p class="text-white mt-2">A Minified Classroom</p>
      </div>
    </div>
    <router-view v-slot="{ Component }" class="w-full">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.bg-green-custom {
  background-color: #52ad9c;
}
</style>
