<template>
  <div>
    <div class="absolute z-10 backdrop" v-if="loading">
      <loading-spinner class="center mt-56"></loading-spinner>
    </div>
    <div v-else>
      <div
        v-if="
          ($store.getters['channel/joinedChannels'] &&
            $store.getters['channel/joinedChannels'].length > 0) ||
          ($store.getters['channel/createdChannels'] &&
            $store.getters['channel/createdChannels'].length > 0)
        "
      >
        <div
          class="border-2 mx-2 p-4 rounded-xl"
          v-if="
            $store.getters['channel/joinedChannels'] &&
            $store.getters['channel/joinedChannels'].length > 0
          "
        >
          <h1 class="text-2xl font-bold">Channels you Joined</h1>
          <div
            class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-6 mt-2"
          >
            <base-card
              class="hover:shadow-md cursor-pointer"
              @click="moveTo(jChannel['_id'])"
              v-for="jChannel in $store.getters['channel/joinedChannels']"
              :key="jChannel['_id']"
            >
              <div class="w-full h-3/6">
                <img
                  class="object-center object-cover w-full h-60 rounded-t-xl"
                  src="https://media4.giphy.com/avatars/greggunn/DLaiwtfzrZi4.png"
                  alt="recipe-photo"
                />
                <p class="text-lg font-semibold mx-2 mt-2">
                  {{ jChannel.roomName }}
                </p>
                <p
                  class="text-sm text-gray-400 mx-2 my-2 h-20 overflow-ellipsis overflow-hidden"
                  style="white-space: initial"
                >
                  {{ jChannel.roomDescription }}
                </p>
              </div>
            </base-card>
          </div>
        </div>
        <div
          class="border-2 mx-2 p-4 rounded-xl mt-4"
          v-if="
            $store.getters['channel/createdChannels'] &&
            $store.getters['channel/createdChannels'].length > 0
          "
        >
          <h1 class="text-2xl font-bold">Channels you Created</h1>
          <div
            class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-6 mt-2"
          >
            <base-card
              class="hover:shadow-md cursor-pointer"
              v-for="cChannel in $store.getters['channel/createdChannels']"
              :key="cChannel['_id']"
              @click="moveTo(cChannel['_id'])"
            >
              <div class="w-full h-3/6">
                <img
                  class="object-center object-cover w-full h-60 rounded-t-xl"
                  src="https://media4.giphy.com/avatars/greggunn/DLaiwtfzrZi4.png"
                  alt="recipe-photo"
                />
                <p class="text-lg font-semibold mx-2 mt-2">
                  {{ cChannel.roomName }}
                </p>
                <p
                  class="text-sm text-gray-400 mx-2 my-2 h-20 overflow-ellipsis overflow-hidden"
                  style="white-space: initial"
                >
                  {{ cChannel.roomDescription }}
                </p>
              </div>
            </base-card>
          </div>
        </div>
      </div>
      <div v-else class="backdrop">
        <dialog open class="rounded-lg my-36 p-10 text-center">
          <p class="text-xl font-bold p-2 w-full">No Channels to show....</p>
          <p class="text-xl font-normal p-2 w-56 mb-5">
            Create/Join a Channel Now
          </p>
          <a href="create" class="underline text-green-500 cursor-pointer"
            >Create/Join</a
          >
        </dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    moveTo(id) {
      this.$router.push(`channel/${id}`);
    },
  },
  async mounted() {
    this.loading = true;
    await Promise.all([
      this.$store.dispatch("channel/getJoinedChannels", {
        userId: this.$store.getters["user/id"],
      }),
      this.$store.dispatch("channel/getCreatedChannels", {
        userId: this.$store.getters["user/id"],
      }),
    ]);
    this.loading = false;
    console.log(
      this.$store.getters["channel/joinedChannels"],
      this.$store.getters["channel/createdChannels"]
    );
  },
};
</script>
