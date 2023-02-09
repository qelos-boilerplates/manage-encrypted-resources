import { createApp } from "vue";
import { createPinia } from "pinia";

import "../assets/main.css";
import CreateApp from "@/pages/CreateApp.vue";

const app = createApp(CreateApp);

app.use(createPinia());

app.mount("#app");
