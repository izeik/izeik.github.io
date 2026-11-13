import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "./style.css";
import App from "./App.vue";
const vuetify = createVuetify({
  defaults: {
    VCard: { elevation: 0 },
    VBtn: { rounded: "lg", style: "text-transform: none; letter-spacing: 0" },
    VTextField: { variant: "outlined", density: "compact" },
    VSelect: { variant: "outlined", density: "compact" },
    VTextarea: { variant: "outlined", density: "compact" },
    VList: { density: "compact" },
  },
  components,
  directives,
  icons: { defaultSet: "mdi", aliases, sets: { mdi } },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#6757d9",
          secondary: "#27a89b",
          background: "#f6f7fb",
          surface: "#ffffff",
          success: "#219b79",
          warning: "#e7a348",
        },
      },
    },
  },
});
createApp(App).use(createPinia()).use(vuetify).mount("#app");
