import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./ListApp.vue";

import "../assets/main.css";

const app = createApp(App);

app.use(createPinia());

app.mount("#app");
