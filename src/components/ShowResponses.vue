<template>
  <div>
    <div class="backdrop" v-if="loading">
      <loading-spinner class="center mt-56"></loading-spinner>
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
    <div v-if="assignment">
      <div class="border-2 rounded-lg p-4 m-4">
        <h1 class="text-xl font-bold mb-2">
          {{ assignment.belongsToRoom.roomName }} --->
          {{ assignment.title }}
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
        <div class="flex sm:flex-row flex-col justify-between">
          <p class="font-semibold break-words text-left">
            {{ getFormattedDate(new Date(assignment.createdAt)) }}
          </p>
          <p
            class="font-semibold break-words text-left"
            :class="
              Date.now() - new Date(assignment.deadline) > 0
                ? 'text-red-500'
                : 'text-green-500'
            "
          >
            Deadline:
            {{ getFormattedDate(new Date(assignment.deadline)) }}
          </p>
        </div>
      </div>
      <div
        class="border-2 rounded-lg p-4 m-4"
        v-if="assignment.responses.length != 0"
      >
        <p class="text-xl font-bold">
          Responses :: {{ assignment.responses.length }}
        </p>
        <div v-for="response in assignment.responses" :key="response['_id']">
          <div class="rounded-lg my-2 cursor-pointer">
            <div class="flex flex-row justify-between">
              <p class="text-xl font-bold" style="color: #094d92">
                {{
                  response.submittedBy.firstName +
                  " " +
                  response.submittedBy.lastName
                }}
              </p>
              <div @click="getResponseFile(response['_id'])">
                <p class="underline font-bold cursor-pointer">Open</p>
              </div>
            </div>
            <div class="flex flex-row justify-between">
              <p class="text-sm text-gray-500">
                {{ getFormattedSubmitDate(new Date(response.createdAt)) }}
              </p>
              <p
                :class="
                  new Date(response.createdAt) - new Date(assignment.deadline) >
                  0
                    ? 'text-red-700 font-bold'
                    : 'text-green-500 font-bold'
                "
              >
                {{
                  new Date(response.createdAt) - new Date(assignment.deadline) >
                  0
                    ? "Submitted Late"
                    : "Submitted On Time"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="border-2 p-4 m-4 rounded-lg">
          <p class="font-bold text-xl">
            No submissions has been recieved yet....
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["id", "assignmentId"],
  data() {
    return {
      loading: false,
      err: null,
      assignment: null,
      fileUrl: null,
    };
  },
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
      console.log(fetchedAssignment.data.assignment);
      this.assignment = fetchedAssignment.data.assignment;
      this.fileUrl = fetchedAssignment.data.fileUrl;
      this.loading = false;
    } else {
      this.loading = false;
      this.$router.replace(
        `/classroom/submission/${this.id}/${this.assignmentId}`
      );
      return;
    }
  },
  methods: {
    openFileUrl() {
      window.open(this.fileUrl);
    },
    getFormattedSubmitDate(givenDate) {
      console.log(moment(givenDate).fromNow());
      return moment(givenDate).fromNow();
    },
    getFormattedDate(givenDate) {
      return moment(givenDate).format("MMMM Do YYYY, h:mm:ss a");
    },
    async getResponseFile(id) {
      this.loading = true;
      const responseUrl = await this.$store.dispatch(
        "activity/getResponseFile",
        {
          userId: this.$store.getters["user/id"],
          assignmentId: this.responseId,
          responseId: id,
          roomId: this.id,
        }
      );
      this.loading = false;
      window.open(responseUrl.data.fileUrl);
    },
  },
};
</script>
