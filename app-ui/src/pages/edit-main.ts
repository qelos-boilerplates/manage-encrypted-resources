import { createApp } from "vue";
import { createPinia } from "pinia";

import "../assets/main.css";
import EditApp from "@/pages/EditApp.vue";

const app = createApp(EditApp);

app.use(createPinia());

app.mount("#app");
