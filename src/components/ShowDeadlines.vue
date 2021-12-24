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
    <div v-if="fetchedDeadlines && completed">
      <div v-if="fetchedDeadlines.length == 0">
        <div class="rounded-lg border-2 m-2 p-4">
          <p class="text-xl p-2 break-words text-center">
            <span class="font-bold"
              >You are on track!!! No deadlines. Sit back and relax for a
              while</span
            ><span>😊</span>.
          </p>
        </div>
      </div>
      <div class="border-2 rounded-lg p-4 m-2" v-else>
        <p class="text-xl font-bold text-red-700">Upcoming Deadlines</p>
        <div
          v-for="deadline in fetchedDeadlines"
          :key="deadline['_id']"
          class="my-2"
        >
          <div class="flex flex-row justify-between">
            <p
              class="font-bold cursor-pointer hover:underline"
              @click="
                moveToSubmit(deadline.belongsToRoom['_id'], deadline['_id'])
              "
            >
              {{ deadline.title }}
            </p>
            <p
              class="font-bold underline cursor-pointer"
              @click="
                moveToSubmit(deadline.belongsToRoom['_id'], deadline['_id'])
              "
            >
              Due to Submit
            </p>
          </div>
          <div class="flex flex-col sm:flex-row justify-between">
            <p
              class="text-gray-500 cursor-pointer hover:underline"
              @click="moveToChannel(deadline.belongsToRoom['_id'])"
            >
              {{ deadline.belongsToRoom.roomName }}
            </p>
            <p
              class="text-green-500 font-semibold"
              v-if="new Date(deadline.deadline) - Date.now() > 0"
            >
              due
              {{ getFormattedDate(new Date(deadline.deadline)) }}
            </p>
            <p class="text-red-500 font-semibold" v-else>
              due past
              {{ getFormattedDate(new Date(deadline.deadline)) }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="completed.length > 0" class="border-2 rounded-lg p-4 m-2">
        <p class="text-xl font-bold text-green-700">Completed</p>
        <div v-for="deadline in completed" :key="deadline['_id']" class="my-2">
          <div class="flex flex-row justify-between">
            <p
              class="font-bold cursor-pointer hover:underline"
              @click="
                moveToSubmit(deadline.belongsToRoom['_id'], deadline['_id'])
              "
            >
              {{ deadline.title }}
            </p>
            <p
              class="text-green-500 font-bold underline cursor-pointer"
              @click="
                moveToSubmit(deadline.belongsToRoom['_id'], deadline['_id'])
              "
            >
              Submitted
            </p>
          </div>
          <div class="flex flex-col sm:flex-row justify-between">
            <p
              class="text-gray-500 cursor-pointer hover:underline"
              @click="moveToChannel(deadline.belongsToRoom['_id'])"
            >
              {{ deadline.belongsToRoom.roomName }}
            </p>
            <p class="text-gray-500">
              Submitted:
              {{
                getFormattedDate(
                  new Date(
                    deadline.responses.filter(
                      (e) => e["submittedBy"] == $store.getters["user/id"]
                    )[0].createdAt
                  )
                )
              }}
            </p>
          </div>
        </div>
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
      err: null,
      fetchedDeadlines: null,
      completed: null,
    };
  },
  async mounted() {
    this.loading = true;
    const deadlines = await this.$store.dispatch("activity/getDeadlines", {
      userId: this.$store.getters["user/id"],
    });
    console.log(deadlines);
    if (deadlines.status == "success") {
      this.fetchedDeadlines = deadlines.data.deadlines;
      this.completed = deadlines.data.completed;
    } else {
      this.err = deadlines.err;
    }
    this.loading = false;
  },
  methods: {
    moveToSubmit(roomId, assignmentId) {
      this.$router.push(`/classroom/submission/${roomId}/${assignmentId}`);
    },
    moveToChannel(roomId) {
      this.$router.push(`/classroom/channel/${roomId}`);
    },
    getFormattedDate(givenTime) {
      return moment(givenTime).fromNow();
    },
  },
};
</script>
