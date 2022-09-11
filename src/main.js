import { createApp } from "vue";
import App from "./App.vue";
import storePlugin from "@/store/plugin";

const app = createApp(App);
app.use(storePlugin);
app.mount("#app");
