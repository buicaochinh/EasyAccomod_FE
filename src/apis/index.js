import axios from "axios";
import store from "../store";

const getClient = () => {
  const client = axios.create({
    baseURL: process.env.VUE_APP_API
  });

  client.interceptors.request.use(function(config) {
    config.headers.common = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json",
      "x-requested-with": "XMLHttpRequest",
      Accept: "application/json"
    };
    return config;
  });

  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 422) {
        store.commit("setErrors", error.response.data.errors);
      } else if (error.response.status === 401) {
        console.log(error);
        store.commit("AUTH/setUserData", null);
        localStorage.removeItem("authToken");
      } else {
        return Promise.reject(error);
      }
    }
  );

  return client;
};

export default getClient;
