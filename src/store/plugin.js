import { Store } from "./index";

export default {
  install(app, options) {
    app.config.globalProperties.$myStore = new Store();
  },
};
