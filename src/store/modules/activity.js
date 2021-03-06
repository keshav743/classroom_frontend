import store from "../index.js";

export default {
  namespaced: true,
  actions: {
    async sendMessage(context, payload) {
      let result = await fetch(
        `https://serene-reef-86132.herokuapp.com/api/classroom/sendMessage/${payload.userId}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            authorization: store.getters.token,
            "Content-Type": "application/json",
          },
        }
      );

      if (result.status >= 200 && result.status < 400) {
        result = await result.json();
        return result;
      }
    },
    async createAssignment(context, payload) {
      let result = await fetch(
        `https://serene-reef-86132.herokuapp.com/api/classroom/createAssignment/${payload.userId}`,
        {
          method: "POST",
          body: payload.data,
          headers: {
            authorization: store.getters.token,
          },
        }
      );

      if (result.status >= 200 && result.status < 400) {
        result = await result.json();
        return result;
      }
    },
    async getAssignment(context, payload) {
      let result = await fetch(
        `https://serene-reef-86132.herokuapp.com/api/classroom/getAssignment/${payload.userId}/${payload.roomId}/${payload.assignmentId}`,
        {
          method: "GET",
          headers: {
            authorization: store.getters.token,
          },
        }
      );

      if (result.status >= 200 && result.status < 400) {
        result = await result.json();
        return result;
      }
    },
    async getResponseFile(context, payload) {
      let result = await fetch(
        `https://serene-reef-86132.herokuapp.com/api/classroom/getResponseFile/${payload.userId}/${payload.roomId}/${payload.responseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
            authorization: store.getters.token,
          },
        }
      );
      if (result.status >= 200 && result.status < 400) {
        result = await result.json();
        console.log(result);
        return result;
      }
    },
    async submitAssignment(context, payload) {
      let result = await fetch(
        `https://serene-reef-86132.herokuapp.com/api/classroom/submitAssignment/${payload.userId}/${payload.roomId}/${payload.assignmentId}`,
        {
          method: "POST",
          body: payload.data,
          headers: {
            authorization: store.getters.token,
          },
        }
      );

      if (result.status >= 200 && result.status < 400) {
        result = await result.json();
        return result;
      }
    },
    async deleteResponseFile(context, payload) {
      let result = await fetch(
        `https://serene-reef-86132.herokuapp.com/api/classroom/deleteResponseFile/${payload.userId}/${payload.roomId}/${payload.assignmentId}/${payload.responseId}`,
        {
          method: "DELETE",
          headers: {
            authorization: store.getters.token,
          },
        }
      );

      if (result.status >= 200 && result.status < 400) {
        result = await result.json();
        return result;
      }
    },
    async getDeadlines(context, payload) {
      let result = await fetch(
        `https://serene-reef-86132.herokuapp.com/api/classroom/getDeadlines/${payload.userId}`,
        {
          method: "GET",
          headers: {
            authorization: store.getters.token,
          },
        }
      );

      if (result.status >= 200 && result.status < 400) {
        result = await result.json();
        return result;
      }
    },
    async getHistory(context, payload) {
      let result = await fetch(
        `https://serene-reef-86132.herokuapp.com/api/classroom/getHistory/${payload.userId}`,
        {
          method: "GET",
          headers: {
            authorization: store.getters.token,
          },
        }
      );
      return await result.json();
    },
  },
};
