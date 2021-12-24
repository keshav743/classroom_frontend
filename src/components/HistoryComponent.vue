<template>
  <div>
    <div class="absolute z-10 backdrop" v-if="loading">
      <loading-spinner class="center mt-56"></loading-spinner>
    </div>
    <div v-if="err" class="backdrop">
      <dialog open class="rounded-lg my-36 p-10 text-center">
        <p class="text-xl font-bold p-2 w-56 mb-5 break-words">
          {{ err }}
        </p>
        <a
          class="text-green-500 underline cursor-pointer"
          @click="() => $router.go()"
          >Reload</a
        >
      </dialog>
    </div>
    <div v-if="histories">
      <div class="rounded-lg m-2 px-2" v-if="histories.length != 0">
        <p class="text-xl font-bold mb-2">Your Activities</p>
        <div v-for="history in histories" :key="history['_id']">
          <div
            v-if="history.type == 'Text'"
            class="border-2 p-2 rounded-lg mb-2"
            mb-2
          >
            <p class="font-bold">
              You Created a Announcement in the channel -
              {{ history.belongsToRoom.roomName }}
            </p>
            <p class="text-gray-500">
              You submitted it on
              {{ getFormattedDate(new Date(history.createdAt)) }}
            </p>
          </div>
          <div
            v-if="history.type == 'Submission'"
            class="border-2 p-2 rounded-lg mb-2"
          >
            <p class="font-bold">
              You Submitted your response to
              <a
                class="underline"
                :href="`/classroom/submission/${history.belongsToRoom['_id']}/${history.assignmentRef['_id']}`"
                >{{ history.assignmentRef.title }}</a
              >
              in the channel -
              {{ history.belongsToRoom.roomName }}
            </p>
            <p class="text-gray-500">
              You submitted it on
              {{ getFormattedDate(new Date(history.createdAt)) }}
            </p>
          </div>
          <div
            v-if="history.type == 'Assignment'"
            class="border-2 p-2 rounded-lg mb-2"
          >
            <p class="font-bold">
              You Created
              <a
                class="underline"
                :href="`/classroom/showResponses/${history.belongsToRoom['_id']}/${history.assignmentRef['_id']}`"
                >{{ history.assignmentRef.title }}</a
              >
              in the channel -
              {{ history.belongsToRoom.roomName }}
            </p>
            <p class="text-gray-500">
              You submitted it on
              {{ getFormattedDate(new Date(history.createdAt)) }}
            </p>
          </div>
          <div
            v-if="history.type == 'Deletion'"
            class="border-2 p-2 rounded-lg mb-2"
          >
            <p class="font-bold">
              You Deleted your response to
              <a
                class="underline"
                :href="`/classroom/showResponses/${history.belongsToRoom['_id']}/${history.assignmentRef['_id']}`"
                >{{ history.assignmentRef.title }}</a
              >
              in the channel -
              {{ history.belongsToRoom.roomName }}
            </p>
            <p class="text-gray-500">
              You submitted it on
              {{ getFormattedDate(new Date(history.createdAt)) }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class="backdrop">
        <dialog open class="rounded-lg my-36 p-10 text-center">
          <p class="text-xl font-bold p-2 w-56 mb-5 break-words">
            No Activities to show....
          </p>
          <p class="text-xl font-normal p-2 w-56 mb-5 break-words">
            It will automatically get populated as you indulge in your classes.
          </p>
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
      loading: false,
      histories: null,
      err: null,
    };
  },
  async mounted() {
    this.loading = true;
    const fetchedHistories = await this.$store.dispatch("activity/getHistory", {
      userId: this.$store.getters["user/id"],
    });
    console.log(fetchedHistories);
    if (fetchedHistories.status == "success") {
      this.histories = fetchedHistories.data.myActivities.reverse();
    } else {
      this.err = fetchedHistories.err;
    }
    this.loading = false;
  },
  methods: {
    getFormattedDate(givenTime) {
      return moment(givenTime).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
};
</script>
