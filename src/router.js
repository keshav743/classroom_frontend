import { createWebHistory, createRouter } from "vue-router";
import store from "./store/index.js";

import AuthPage from "./pages/AuthPage.vue";
import ClassroomContainer from "./pages/ClassroomContainer.vue";
import LoginForm from "./components/LoginForm.vue";
import SignupForm from "./components/SignupForm.vue";
import ClassroomGeneral from "./components/ClassroomGeneral.vue";
import CreateClassroom from "./components/CreateClassroom.vue";
import ShowChannels from "./components/ShowChannels.vue";
import IndividualChannel from "./components/IndividualChannel.vue";
import CreateActivity from "./components/CreateActivity.vue";
import SubmitAssignment from "./components/SubmitAssignment.vue";
import ShowResponses from "./components/ShowResponses.vue";
import ShowDeadlines from "./components/ShowDeadlines.vue";
import HistoryComponent from "./components/HistoryComponent.vue";
import AboutMe from "./components/AboutMe.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/auth",
      redirect: "/auth/login",
      component: AuthPage,
      children: [
        {
          path: "login",
          component: LoginForm,
          meta: { requiresUnauth: true },
        },
        {
          path: "signup",
          component: SignupForm,
          meta: { requiresUnauth: true },
        },
      ],
    },
    {
      path: "/classroom",
      redirect: "/classroom/general",
      component: ClassroomContainer,
      children: [
        {
          path: "submission/:id/:assignmentId",
          component: SubmitAssignment,
          meta: { requiresAuth: true },
          props: true,
        },
        {
          path: "showResponses/:id/:assignmentId",
          component: ShowResponses,
          meta: { requiresAuth: true },
          props: true,
        },
        {
          path: "createActivity/:id",
          component: CreateActivity,
          meta: { requiresAuth: true },
          props: true,
        },
        {
          path: "channel/:id",
          component: IndividualChannel,
          meta: { requiresAuth: true },
          props: true,
        },
        {
          path: "general",
          component: ClassroomGeneral,
          meta: { requiresAuth: true },
        },
        {
          path: "create",
          component: CreateClassroom,
          meta: { requiresAuth: true },
        },
        {
          path: "channels",
          component: ShowChannels,
          meta: { requiresAuth: true },
        },
        {
          path: "about",
          component: AboutMe,
          meta: { requiresAuth: true },
        },
        {
          path: "deadlines",
          component: ShowDeadlines,
          meta: { requiresAuth: true },
        },
        {
          path: "history",
          component: HistoryComponent,
          meta: { requiresAuth: true },
        },
      ],
    },
    { path: "/", redirect: "/auth/login" },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresUnauth) {
    if (store.getters.token != null) {
      console.log("Authentication has aldready been done!!!");
      return next({ path: "/classroom/general" });
    }
  }
  if (to.meta.requiresAuth) {
    if (store.getters.token == null) {
      console.log("Requires Authentication");
      return next({ path: "/auth/login" });
    }
  }
  next();
});

export default router;
