<template>
  <div>
    <div class="backdrop" v-if="loading">
      <loading-spinner class="center mt-56"></loading-spinner>
    </div>
    <div class="backdrop" v-if="success">
      <dialog open class="rounded-lg my-36 p-10 text-center">
        <p class="text-xl font-bold p-2 w-56 mb-5 break-words">
          {{
            success.type == "message" ? "Message Sent" : "Assignment Created"
          }}
        </p>
        <a @click="clear" class="underline text-green-500 cursor-pointer">
          Okay
        </a>
      </dialog>
    </div>
    <div class="backdrop" v-if="err">
      <dialog open class="rounded-lg my-36 p-10 text-center">
        <p class="text-xl font-normal p-2 w-56 mb-5 break-words">
          {{ err }}
        </p>
        <a @click="clear" class="underline text-green-500 cursor-pointer">
          Okay
        </a>
      </dialog>
    </div>
    <div class="border-2 m-5 p-5 rounded-xl shadow-md">
      <h1 class="font-bold text-xl">Send Message</h1>
      <div class="mb-2 w-full mt-4">
        <input
          type="text"
          placeholder="Enter your message here...."
          id="message"
          class="border-2 rounded-md p-2 w-full input-styles mb-4"
          v-model="message"
          required
        />
        <button
          class="text-white my-3 px-4 py-2 rounded-lg shadow-xl hover:opacity-90"
          style="background-color: #52ad9c"
          @click="sendMessage"
        >
          Send
        </button>
      </div>
    </div>
    <div class="border-2 m-5 p-5 rounded-xl shadow-md">
      <h1 class="font-bold text-xl">Create Assignment</h1>
      <div class="mb-2 w-full mt-4">
        <input
          type="text"
          placeholder="Assignment Title"
          id="assignmentMessage"
          class="border-2 rounded-md p-2 w-full input-styles mb-4"
          v-model="assignmentMessage"
          required
        />
        <textarea
          type="text"
          placeholder="Assignment Instructions"
          id="assignmentInstructions"
          class="border-2 rounded-md p-2 w-full input-styles mb-4"
          v-model="assignmentInstructions"
          cols="12"
          rows="6"
          required
        />
        <input type="file" @change="onFileChange" class="mb-2" />
        <div class="mt-2">
          <Datepicker v-model="date" />
        </div>
        <button
          class="text-white my-3 px-4 py-2 rounded-lg shadow-xl hover:opacity-90"
          style="background-color: #52ad9c"
          @click="createAssignment"
        >
          Create Assignment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";

export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      message: "",
      assignmentMessage: "",
      assignmentInstructions: "",
      assignmentFile: "",
      date: null,
      loading: false,
      success: null,
      err: null,
    };
  },
  props: ["id"],
  methods: {
    onFileChange(e) {
      const selectedFile = e.target.files[0];
      this.assignmentFile = selectedFile;
    },
    clear() {
      this.err = null;
      this.success = null;
    },
    async sendMessage() {
      if (this.message.trim == "") {
        return;
      }
      this.loading = true;
      const result = await this.$store.dispatch("activity/sendMessage", {
        userId: this.$store.getters["user/id"],
        message: this.message,
        roomId: this.id,
      });
      this.loading = false;
      if (result.status == "failure") {
        this.err = result.err;
      } else {
        this.success = {
          type: "message",
        };
        this.message = "";
      }
      console.log(result);
    },
    async createAssignment() {
      if (this.message.trim == "") {
        return;
      }
      this.loading = true;
      const formData = new FormData();
      console.log(this.date);
      formData.append("assignment", this.assignmentFile);
      formData.append("title", this.assignmentMessage);
      formData.append("instructions", this.assignmentInstructions);
      formData.append("roomId", this.id);
      formData.append("deadline", this.date);
      formData.append("userId", this.$store.getters["user/id"]);
      const result = await this.$store.dispatch("activity/createAssignment", {
        userId: this.$store.getters["user/id"],
        data: formData,
      });
      if (result.status == "failure") {
        this.err = result.err;
      } else {
        this.success = {
          type: "assignment",
        };
      }
      this.message = "";
      this.assignmentMessage = "";
      this.assignmentInstructions = "";
      this.assignmentFile = null;
      this.date = null;
      this.loading = false;
      console.log(result);
    },
  },
};
</script>
