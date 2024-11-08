import axios from 'axios';
import { AUTHORIZATION, REQUEST_URL } from '../constants/request';

const instance = axios.create();
instance.defaults.timeout = 25000;
instance.defaults.baseURL = REQUEST_URL;
instance.defaults.withCredentials = true;

instance.interceptors.request.use(
  function (config) {
    if (localStorage.getItem(AUTHORIZATION)) {
      config.headers['Authorization'] = localStorage.getItem(AUTHORIZATION);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    if (response.data.authorization) {
      localStorage.setItem(AUTHORIZATION, response.data.authorization);
    }
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default instance;
