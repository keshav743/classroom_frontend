<template>
  <div class="mx-auto my-5 md:my-40">
    <div class="backdrop" v-if="loading">
      <loading-spinner class="center mt-56"></loading-spinner>
    </div>
    <div class="absolute z-10 backdrop" v-if="$store.getters['err/loginError']">
      <dialog open class="rounded-lg my-36 p-10 text-center">
        <p class="text-xl font-bold p-2 w-56">Auth Error</p>
        <p class="text-xl font-normal p-2 w-56 mb-5">
          {{ $store.getters["err/loginError"] }}
        </p>
        <a
          @click="clearErr"
          class="underline cursor-pointer"
          style="color: #094d92"
        >
          Okay
        </a>
      </dialog>
    </div>
    <div class="p-6 py-8 border-2 rounded-lg mx-4 md:mx-40 shadow-lg">
      <h1 class="text-2xl font-bold mb-5 my-2" style="color: #094d92">Login</h1>
      <div class="mb-2 w-full mt-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          class="border-2 rounded-md p-2 w-full input-styles"
          v-model="email"
          required
        />
      </div>
      <div class="mb-2 w-full mt-4">
        <input
          type="password"
          placeholder="Password"
          id="password"
          class="border-2 rounded-md p-2 w-full input-styles"
          v-model="password"
          required
        />
      </div>
      <div class="text-center">
        <button
          class="text-white mt-3 px-4 py-2 rounded-lg shadow-xl hover:opacity-90"
          style="background-color: #094d92"
          @click="triggerLoginAction"
        >
          Login Now
        </button>
        <p class="mt-2">
          or
          <router-link
            to="/auth/signup"
            class="underline"
            style="color: #094d92"
            >Signup</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      errorMsg: "",
    };
  },
  methods: {
    clearErr() {
      this.$store.commit("err/setLoginError", { err: null });
    },
    async triggerLoginAction() {
      if (
        this.email.trim() == "" ||
        this.password.trim() == "" ||
        this.email.endsWith(".com") == false
      ) {
        this.errorMsg = "All fields are required! Enter some valid data.";
        return;
      }
      console.log("Ready to perform Login Action...");
      this.loading = true;
      await this.$store.dispatch("performLogin", {
        email: this.email,
        password: this.password,
      });
      this.loading = false;
      this.$router.replace("/classroom/general");
    },
  },
};
</script>

<style scoped>
.input-styles {
  outline-color: #094d92;
}
.input-styles::placeholder {
  color: grey;
}
</style>
