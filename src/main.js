import { createApp } from "vue";
import App from "./App.vue";

import store from "./store/index.js";
import router from "./router.js";

import BaseCard from "./components/BaseCard.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";
import DialogBox from "./components/DialogBox";

import "./index.css";

const app = createApp(App);

app.use(store);
app.use(router);

app.component("base-card", BaseCard);
app.component("loading-spinner", LoadingSpinner);
app.component("dialog-box", DialogBox);

app.mount("#app");
