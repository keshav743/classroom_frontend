<template>
  <teleport to="body">
    <div class="backdrop"></div>
    <transition name="dialog">
      <dialog open class="rounded-lg my-36 p-10 text-center">
        <p class="text-xl font-semibold p-2">
          {{ $store.getters["err/loginError"] }}
        </p>
        <button
          @click="clearErr"
          class="px-4 py-2 text-white mx-auto rounded-lg cursor-pointer"
          style="background-color: #52ad9c"
        >
          Okay
        </button>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    msg: {
      type: String,
      required: true,
    },
  },
  methods: {
    clearErr() {
      this.$store.commit("err/setLoginError", { err: null });
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  backdrop-filter: blur(4px);
}
dialog {
  position: fixed;
  top: 20vh;
  margin: 0 auto;
  max-width: 50rem;
  width: 90%;
  z-index: 100;
  overflow: hidden;
  border-radius: 1.2rem;
  border: none;
  border: 0.3rem solid var(--purple-1);
}
header {
  display: flex;
  background: var(--purple-2);
  padding: 1.6rem;
}
header h2 {
  color: var(--white-2);
}
section {
  padding: 1.6rem;
  margin: 0;
  margin-top: 1.6rem;
}
menu {
  padding: 1.6rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}
.dialog-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(-40px);
}
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(40px);
}
.dialog-enter-active {
  transition: all 250ms;
}
.dialog-leave-active {
  transition: all 250ms ease-in;
}
</style>
