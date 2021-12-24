<template>
  <div>
    <div class="backdrop" v-if="loading">
      <loading-spinner class="center mt-56"></loading-spinner>
    </div>
    <div v-else>
      <div v-if="err == null && channel != null">
        <p class="hidden" ref="text">{{ channel["_id"] }}</p>
        <div class="flex flex-col sm:flex-row">
          <div class="md:w-4/5">
            <div
              class="flex flex-col md:flex-row border-2 m-2 md:m-4 rounded-xl"
            >
              <img
                class="w-full h-full md:w-44 md:h-44 md:rounded-l-xl rounded-t-xl md:rounded-r-none"
                src="https://media4.giphy.com/avatars/greggunn/DLaiwtfzrZi4.png"
                alt="class-pic"
              />
              <div
                class="ml-2 sm:ml-5 mt-2 flex flex-col justify-evenly break-words w-4/5"
              >
                <h1 class="text-2xl font-bold">
                  {{ channel.roomName }}
                </h1>
                <p class="text-xl font-semibold break-words">
                  {{ channel.roomDescription }}
                </p>
                <p class="text-xl font-semibold break-words">
                  Created By:
                  {{
                    channel.createdBy.firstName +
                    " " +
                    channel.createdBy.lastName
                  }}
                </p>
                <div class="flex flex-row justify-between mr-2">
                  <div class="flex flex-row mb-2">
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
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      ></path>
                    </svg>
                    <p class="text-xl font-semibold ml-2">
                      {{ channel.participants.length }}
                    </p>
                  </div>
                  <!-- <div @click="copy" class="cursor-pointer flex flex-row">
                    <svg
                      class="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                      ></path>
                      <path
                        d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
                      ></path>
                    </svg>
                    <p>Copy Room ID</p>
                  </div> -->
                </div>
              </div>
            </div>
            <div>
              <div v-for="activity in channel.activity" :key="activity['_id']">
                <div
                  v-if="activity.type == 'Text'"
                  class="border-2 rounded-xl mx-2 md:mx-5 mt-2 p-4"
                >
                  <p class="text-lg font-semibold text-green-500">
                    {{
                      channel.createdBy.firstName +
                      " " +
                      channel.createdBy.lastName
                    }}
                  </p>
                  <h1 class="text-xl font-semibold">{{ activity.title }}</h1>
                  <p class="text-md text-gray-500">
                    {{ getFormattedDate(new Date(activity.createdAt)) }}
                  </p>
                </div>
                <div
                  v-if="activity.type == 'Assignment'"
                  class="border-2 rounded-xl mx-2 md:mx-5 mt-2 p-4"
                >
                  <p class="text-lg font-semibold text-green-500">
                    {{
                      channel.createdBy.firstName +
                      " " +
                      channel.createdBy.lastName
                    }}
                  </p>
                  <h1 class="text-xl font-semibold">
                    {{ activity.assignmentRef.title }}
                  </h1>
                  <p class="text-md font-normal">
                    Submit on or before:
                    {{
                      getFormattedSubmitDate(
                        new Date(activity.assignmentRef.deadline)
                      )
                    }}
                  </p>
                  <div class="flex flex-row justify-between">
                    <p class="text-md text-gray-500">
                      {{ getFormattedDate(new Date(activity.createdAt)) }}
                    </p>
                    <a
                      class="text-md text-green-500 font-bold cursor-pointer"
                      :href="`/classroom/submission/${id}/${activity.assignmentRef['_id']}`"
                      v-if="
                        channel.createdBy['_id'] != $store.getters['user/id']
                      "
                      >{{
                        channel.assignments
                          .filter(
                            (e) => e["_id"] == activity.assignmentRef["_id"]
                          )[0]
                          .submittedPeople.includes(
                            $store.getters["user/id"]
                          ) == false
                          ? "Submit Now"
                          : "Submitted ✅"
                      }}</a
                    >
                    <a
                      class="text-md text-green-500 font-bold underline cursor-pointer"
                      :href="`/classroom/showResponses/${id}/${activity.assignmentRef['_id']}`"
                      v-else
                      >Show Responses</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="md:w-1/5 mx-4">
            <h1 class="text-2xl font-semibold md:ml-4 my-4 underline">
              Participants
            </h1>
            <div class="md:ml-4">
              <p class="text-xl break-words font-bold text-green-500">
                {{
                  channel.createdBy.firstName + " " + channel.createdBy.lastName
                }}
              </p>
            </div>
            <div
              v-for="participant in channel.participants"
              :key="participant['_id']"
              class="md:ml-4"
            >
              <p class="text-xl break-words">
                {{ participant.firstName + " " + participant.lastName }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="fixed right-2 bottom-2"
          v-if="channel.createdBy['_id'] == $store.getters['user/id']"
        >
          <button
            class="text-2xl text-white bg-green-500 w-12 h-12 rounded-full shadow-lg hover:bg-green-400"
            @click="moveToCreateActivity()"
          >
            +
          </button>
        </div>
      </div>
      <div class="backdrop" v-else>
        <dialog open class="rounded-lg my-36 p-10 text-center">
          <p class="text-xl font-bold p-2 w-56 mb-5 break-words">
            Permission Denied
          </p>
          <p class="text-xl font-normal p-2 w-56 mb-5 break-words">
            {{ err }}
          </p>
          <a @click="clear" class="underline text-green-500 cursor-pointer">
            Okay
          </a>
        </dialog>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      channel: null,
      loading: false,
      err: null,
    };
  },
  props: ["id"],
  async mounted() {
    this.loading = true;
    const channel = await this.$store.dispatch("channel/getChannel", {
      channelId: this.id,
      userId: this.$store.getters["user/id"],
    });
    if (channel.status == "success") {
      this.channel = channel.data.channelInfo;
    } else {
      this.err = channel.err;
    }
    console.log(this.channel);
    this.loading = false;
  },
  methods: {
    getFormattedDate(givenDate) {
      return moment(givenDate).fromNow();
    },
    getFormattedSubmitDate(givenDate) {
      return moment(givenDate).format("MMMM Do YYYY, h:mm:ss a");
    },
    clear() {
      this.$router.replace("/classroom/channels");
    },
    moveToCreateActivity() {
      this.$router.push(`/classroom/createActivity/${this.id}`);
    },
    copy() {
      console.log("Copying Text....");
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
