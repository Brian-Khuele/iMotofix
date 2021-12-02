import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(() => {
  Vue.prototype.$axios = axios;
});
