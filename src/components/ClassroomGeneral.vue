<template>
  <div>
    <base-card class="mx-4 mb-8 p-5 border-2">
      <h1 class="text-2xl font-bold mb-2 inline" style="color: #094d92">
        Welcome, {{ $store.getters["user/fullName"] }}
      </h1>
      <p class="inline text-2xl">😊</p>
      <h1>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at leo
        consectetur, maximus lacus ac, hendrerit dolor. Aenean quis accumsan
        nulla, at facilisis neque. Fusce ac molestie lorem. Nullam non purus
        neque. Quisque venenatis, augue nec posuere tincidunt, felis urna
        pharetra neque, vel hendrerit mauris nisi ut nunc. Vivamus quis mauris
        metus. Pellentesque tempor accumsan lacus, non sodales ipsum dictum
        lobortis. Donec vitae urna eget nisi iaculis porta. Nam quis dignissim
        tortor. Phasellus eget auctor est. Sed eu pulvinar ipsum. In posuere,
        lorem eu tempor consectetur, metus diam condimentum nulla, vel viverra
        lacus leo nec dolor. Morbi consequat accumsan dolor, ut pretium sem.
        Pellentesque commodo nisi mauris, sed convallis eros iaculis id.
        Pellentesque lobortis elit sed lectus egestas posuere.
      </h1>
    </base-card>
    <div
      class="grid md:grid-cols-3 md:grid-rows-2 lg:grid-cols-5 lg:grid-rows-1 gap-10 mx-4 mb-2"
    >
      <div v-for="item in items" :key="item.id">
        <base-card
          class="hover:shadow-md cursor-pointer"
          @click="moveTo(item.redirect)"
        >
          <div class="w-full h-3/6">
            <img
              class="object-center object-cover w-full h-60 rounded-t-xl"
              :src="item.coverImage"
              alt="recipe-photo"
            />
            <hr />
            <p class="text-lg font-semibold mx-2 mt-2">{{ item.name }}</p>
            <p
              class="text-sm text-gray-400 mx-2 my-2 h-20 overflow-ellipsis overflow-hidden"
              style="white-space: initial"
            >
              {{ item.description }}
            </p>
          </div>
        </base-card>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCard from "./BaseCard.vue";
export default {
  components: { BaseCard },
  data() {
    return {
      items: [
        {
          id: 1,
          name: "Channel",
          coverImage:
            "https://image.freepik.com/free-vector/computer-class-open-space-office-empty-interior_107791-2137.jpg",
          description: "Channels you joined and created will be visible here.",
          redirect: "channels",
        },
        {
          id: 2,
          name: "Deadlines",
          coverImage:
            "https://image.freepik.com/free-vector/businessman-working-clock-hand-businesswoman-with-laptop-productivity-efficiency-production-qualification-concept-white-background_335657-1703.jpg",
          description:
            "Your Upcoming deadlines for assignments will be shown here.",
          redirect: "deadlines",
        },
        {
          id: 3,
          name: "History",
          coverImage:
            "https://image.freepik.com/free-vector/personal-files-concept-illustration_114360-5289.jpg",
          description:
            "The assignments that you submitted and the activities you did will be visible here.",
          redirect: "history",
        },
        {
          id: 4,
          name: "Create/Join Channel",
          coverImage:
            "https://image.freepik.com/free-vector/learning-concept-illustration_114360-6186.jpg",
          description: "You can create new channels and join new channels",
          redirect: "create",
        },
        {
          id: 5,
          name: "About Us",
          coverImage:
            "https://image.freepik.com/free-vector/company-employees-sharing-thoughts-ideas_74855-5469.jpg",
          description: "A small segment to introduce myself 😊.",
          redirect: "about",
        },
      ],
    };
  },
  methods: {
    moveTo(url) {
      this.$router.push(`${url}`);
    },
  },
};
</script>
