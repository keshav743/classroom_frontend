<template>
  <div>
    <div class="backdrop" v-if="loading">
      <loading-spinner class="center mt-56"></loading-spinner>
    </div>
    <div class="backdrop w-screen" v-if="successModal">
      <dialog
        :open="openModal"
        class="rounded-lg my-36 p-10 text-center mx-2 sm:mx-auto"
      >
        <p class="text-xl font-bold w-56 mb-2 text-green-500 text-left">
          Successfully
          {{
            successModal.createdBy == $store.getters["user/id"]
              ? " Created"
              : " Joined"
          }}
        </p>
        <p class="font-semibold text-left">
          Channel Name: {{ successModal.roomName }}
        </p>
        <p class="font-semibold text-left">Channel ID: {{ successModal.id }}</p>
        <p class="font-semibold text-left">
          No of Participants: {{ successModal.participants.length }}
        </p>
        <div class="flex flex-row justify-between mt-2">
          <a
            :href="`channel/${successModal.id}`"
            class="underline text-green-500 cursor-pointer"
            >Go To Channel</a
          >
          <a @click="clear" class="underline text-green-500 cursor-pointer">
            Okay
          </a>
        </div>
      </dialog>
    </div>
    <div class="backdrop" v-if="errModal">
      <dialog :open="openModal" class="rounded-lg my-36 p-10 text-center">
        <p class="text-xl font-normal p-2 w-56 mb-5 break-words">
          {{ errModal }}
        </p>
        <a @click="clear" class="underline text-green-500 cursor-pointer">
          Okay
        </a>
      </dialog>
    </div>
    <div class="border-2 m-5 p-5 rounded-xl shadow-md">
      <h1 class="font-bold text-xl">Create Channel</h1>
      <div class="mb-2 w-full mt-4">
        <input
          type="text"
          placeholder="Channel Name"
          id="newClassName"
          class="border-2 rounded-md p-2 w-full input-styles mb-4"
          v-model="newClassName"
          required
        />
        <input
          type="text"
          placeholder="Channel Description"
          id="newClassDescription"
          class="border-2 rounded-md p-2 w-full input-styles"
          v-model="newClassDescription"
          required
        />
        <button
          class="text-white my-3 px-4 py-2 rounded-lg shadow-xl hover:opacity-90"
          style="background-color: #52ad9c"
          @click="createChannel"
        >
          Create Channel
        </button>
      </div>
    </div>
    <div class="border-2 m-5 p-5 rounded-xl shadow-md">
      <h1 class="font-bold text-xl">Join Channel</h1>
      <div class="mb-2 w-full mt-4">
        <input
          type="text"
          placeholder="Channel Code"
          id="joinClassCode"
          class="border-2 rounded-md p-2 w-full input-styles"
          v-model="joinClassCode"
          required
        />
        <button
          class="text-white my-3 px-4 py-2 rounded-lg shadow-xl hover:opacity-90"
          style="background-color: #52ad9c"
          @click="joinChannel"
        >
          Join Channel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newClassName: "",
      newClassDescription: "",
      joinClassCode: "",
      loading: false,
      errModal: null,
      successModal: null,
      openModal: true,
    };
  },
  methods: {
    clear() {
      this.successModal = null;
      this.errModal = null;
    },
    async createChannel() {
      if (
        this.newClassName.trim() == "" ||
        this.newClassDescription.trim() == ""
      ) {
        return;
      }
      this.loading = true;
      console.log("Ready to send request");
      const result = await this.$store.dispatch("channel/createChannel", {
        roomName: this.newClassName,
        roomDescription: this.newClassDescription,
        userId: this.$store.getters["user/id"],
      });
      this.newClassName = "";
      this.newClassDescription = "";
      this.loading = false;
      if (result.status == "success") {
        this.successModal = result.data.channel;
      } else {
        this.errModal = result.err;
      }
    },
    async joinChannel() {
      if (this.joinClassCode.trim() == "") {
        return;
      }
      console.log("Ready to send request");
      this.loading = true;
      const result = await this.$store.dispatch("channel/joinChannel", {
        roomCode: this.joinClassCode,
        userId: this.$store.getters["user/id"],
      });
      console.log(result);
      this.joinClassCode = "";
      this.loading = false;
      if (result.status == "success") {
        this.successModal = result.data.channel;
      } else {
        this.errModal = result.err;
      }
    },
  },
};
</script>

<style scoped>
.input-styles {
  outline-color: #52ad9c;
}
.input-styles::placeholder {
  color: grey;
}
</style>
