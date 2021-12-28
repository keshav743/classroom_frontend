import store from "../index.js";

export default {
  namespaced: true,
  state() {
    return {
      joinedChannels: null,
      createdChannels: null,
    };
  },
  mutations: {
    setJoinedChannels(state, payload) {
      state.joinedChannels = payload.joinedChannels;
    },
    setCreatedChannels(state, payload) {
      state.createdChannels = payload.createdChannels;
    },
    setIndividualChannel(state, payload) {
      state.individualChannel = payload.channel;
    },
    clearChannelData(state) {
      state.joinedChannels = null;
      state.createdChannels = null;
    },
  },
  actions: {
    async createChannel(context, payload) {
      const result = await fetch(
        `https://serene-reef-86132.herokuapp.com/api/classroom/create/${payload.userId}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            authorization: store.getters["token"],
            "Content-Type": "application/json",
          },
        }
      );
      const newResult = await result.json();
      return newResult;
    },
    async joinChannel(context, payload) {
      const result = await fetch(
        `https://serene-reef-86132.herokuapp.com/api/classroom/join/${payload.userId}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            authorization: store.getters["token"],
            "Content-Type": "application/json",
          },
        }
      );
      const newResult = await result.json();
      return newResult;
    },
    async getJoinedChannels(context, payload) {
      const result = await fetch(
        `https://serene-reef-86132.herokuapp.com/api/classroom/joinedChannels/${payload.userId}`,
        {
          method: "GET",
          headers: {
            authorization: store.getters["token"],
            "Content-Type": "application/json",
          },
        }
      );
      const newResult = await result.json();
      if (result.status >= 200 && result.status < 400) {
        await context.commit("setJoinedChannels", {
          joinedChannels: newResult.data.fetchedJoinedChannels,
        });
      } else {
        console.log(newResult);
      }
    },
    async getCreatedChannels(context, payload) {
      const result = await fetch(
        `https://serene-reef-86132.herokuapp.com/api/classroom/createdChannels/${payload.userId}`,
        {
          method: "GET",
          headers: {
            authorization: store.getters["token"],
            "Content-Type": "application/json",
          },
        }
      );
      const newResult = await result.json();
      if (result.status >= 200 && result.status < 400) {
        await context.commit("setCreatedChannels", {
          createdChannels: newResult.data.fetchedCreatedChannels,
        });
      } else {
        console.log(newResult);
      }
    },
    async getChannel(context, payload) {
      const fetchedChannel = await fetch(
        `https://serene-reef-86132.herokuapp.com/api/classroom/getChannelInfo/${payload.userId}/${payload.channelId}`,
        {
          method: "GET",
          headers: {
            authorization: store.getters["token"],
            "Content-Type": "application/json",
          },
        }
      );
      const finalChannel = await fetchedChannel.json();
      console.log(finalChannel);
      return finalChannel;
    },
  },
  getters: {
    joinedChannels(state) {
      return state.joinedChannels;
    },
    createdChannels(state) {
      return state.createdChannels;
    },
  },
};
