<template>
  <div>
    <div class="backdrop" v-if="loading">
      <loading-spinner class="center mt-56"></loading-spinner>
    </div>
    <div class="backdrop" v-if="success != null">
      <dialog open class="rounded-lg my-36 p-8 text-center">
        <p class="text-xl font-bold p-2 w-56 mb-5 break-words">
          Successfully
          {{ success.type == "deletion" ? "Deleted" : "Submitted" }}
        </p>
        <p
          class="text-xl font-bold p-2 w-56 mb-5 break-words"
          v-if="success.type == 'submission'"
        >
          You will be redirected to the channel in 3 seconds...
        </p>
        <a
          @click="clear"
          class="underline cursor-pointer"
          style="color: #094d92"
        >
          Okay
        </a>
      </dialog>
    </div>
    <div class="backdrop" v-if="err != null">
      <dialog open class="rounded-lg my-36 p-10 text-center">
        <p class="text-xl font-bold p-2 w-56 mb-5 break-words">
          {{ err }}
        </p>
        <a
          @click="clear"
          class="underline cursor-pointer"
          style="color: #094d92"
        >
          Okay
        </a>
      </dialog>
    </div>
    <div v-if="assignment != null">
      <div class="p-4 m-4 border-2 rounded-lg">
        <h1 class="text-xl font-bold mb-2">
          {{ assignment.title }} ---> {{ assignment.belongsToRoom.roomName }}
        </h1>

        <p class="font-semibold break-words">
          {{ assignment.instructions }}
        </p>
        <a
          @click="openFileUrl"
          class="font-bold underline cursor-pointer block"
          style="color: #094d92"
          >View Question Paper Here...</a
        >
        <div class="flex md:flex-row flex-col justify-between mt-4">
          <p class="font-semibold break-words text-left">
            Created On:
            {{ getFormattedDate(new Date(assignment.createdAt)) }}
          </p>
          <p
            class="font-semibold break-words text-left"
            :class="
              Date.now() - new Date(assignment.deadline) > 0
                ? 'text-red-700'
                : 'text-green-700'
            "
          >
            Deadline:
            {{ getFormattedDate(new Date(assignment.deadline)) }}
          </p>
        </div>
      </div>
      <div
        class="p-4 m-4 border-2 rounded-lg"
        v-if="
          assignment.submittedPeople.filter(
            (e) => e['_id'] == $store.getters['user/id']
          ).length == 0
        "
      >
        <p class="text-xl font-semibold">Your Work:</p>
        <input type="file" @change="onFileChange" class="my-2" />
        <button
          class="text-white my-3 px-4 py-2 rounded-lg shadow-xl hover:opacity-90"
          style="background-color: #094d92"
          @click="submitAssignment"
        >
          Submit Assignment
        </button>
      </div>
      <div v-else class="p-4 m-4 border-2 rounded-lg">
        <p class="text-lg font-semibold">Your Work:</p>
        <div class="my-2 cursor-pointer">
          <div class="flex flex-row justify-between">
            <p
              class="font-bold underline"
              style="color: #094d92"
              @click="getResponseFile"
            >
              {{ getResponseDetails.path.split("/")[1] }}
            </p>
            <div @click="deleteAssignment">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
          </div>
          <p class="text-gray-500">
            {{ getFormattedDate(new Date(getResponseDetails.createdAt)) }}
          </p>
        </div>
      </div>
      <!-- <div class="m-2 text-2xl font-bold border-2 rounded-lg">
        <h1 class="ml-4 text-2xl font-bold">Comments</h1>
      </div> -->
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      assignment: null,
      assignmentFile: "",
      loading: false,
      err: null,
      success: null,
      fileUrl: null,
      responseFileUrl: null,
    };
  },
  props: ["id", "assignmentId"],
  async mounted() {
    this.loading = true;
    const fetchedAssignment = await this.$store.dispatch(
      "activity/getAssignment",
      {
        userId: this.$store.getters["user/id"],
        roomId: this.id,
        assignmentId: this.assignmentId,
      }
    );
    console.log(fetchedAssignment);
    if (
      fetchedAssignment.data.assignment.createdBy["_id"] ==
      this.$store.getters["user/id"]
    ) {
      this.$router.replace(
        `/classroom/showResponses/${this.id}/${this.assignmentId}`
      );
      return;
    }
    this.assignment = fetchedAssignment.data.assignment;
    this.fileUrl = fetchedAssignment.data.fileUrl;
    console.log(this.assignment.title);
    this.loading = false;
  },
  methods: {
    openFileUrl() {
      window.open(this.fileUrl);
    },
    onFileChange(e) {
      const selectedFile = e.target.files[0];
      this.assignmentFile = selectedFile;
    },
    clear() {
      if (this.success || this.success.type == "deletion") {
        this.success = null;
        this.$router.go();
      } else {
        this.err = null;
      }
    },
    async getResponseFile() {
      this.loading = true;
      const responseFileUrl = await this.$store.dispatch(
        "activity/getResponseFile",
        {
          userId: this.$store.getters["user/id"],
          assignmentId: this.responseId,
          responseId: this.getResponseDetails["_id"],
          roomId: this.id,
        }
      );
      this.responseFileUrl = responseFileUrl.data.fileUrl;
      this.loading = false;
      window.open(responseFileUrl.data.fileUrl);
    },
    async deleteAssignment() {
      this.loading = true;
      const result = await this.$store.dispatch("activity/deleteResponseFile", {
        userId: this.$store.getters["user/id"],
        roomId: this.id,
        assignmentId: this.assignmentId,
        responseId: this.getResponseDetails["_id"],
      });
      console.log(result);
      if (result.status == "failure") {
        this.err = result.err;
      } else {
        this.success = {
          type: "deletion",
        };
      }
      this.loading = false;
    },
    async submitAssignment() {
      this.loading = true;
      const formData = new FormData();
      formData.append("response", this.assignmentFile);
      const result = await this.$store.dispatch("activity/submitAssignment", {
        userId: this.$store.getters["user/id"],
        roomId: this.id,
        assignmentId: this.assignmentId,
        data: formData,
      });
      console.log(result);
      if (result.status == "failure") {
        this.err = result.err;
      } else {
        this.success = {
          type: "submission",
        };
      }
      this.loading = false;
      setTimeout(() => {
        this.$router.push(`/classroom/channel/${this.id}`);
      }, 3000);
    },
    getFormattedDate(givenDate) {
      return moment(givenDate).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
  computed: {
    getResponseDetails() {
      const response = this.assignment.responses.filter(
        (e) => e["submittedBy"]["_id"] == this.$store.getters["user/id"]
      );
      console.log(response);
      return response[0];
    },
  },
};
</script>
