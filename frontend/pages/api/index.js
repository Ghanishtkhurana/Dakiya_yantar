import axios from "axios";
import { getCookie } from "cookies-next";

let authorization;

if (typeof window !== "undefined" && window.localStorage) {
  authorization = localStorage.getItem("authorization");
}

export const baseURL = "http://localhost:8080/api";
// export const baseURL = "http://192.168.1.13:8009/api";

export const clientUrl = "http://localhost:3011/";

export const Imageapi = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const api = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    Authorization: authorization ? authorization : getCookie("realsate_toki"),
    "Content-Type": "application/json",
  },
});

export default api;
