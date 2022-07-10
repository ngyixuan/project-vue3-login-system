import axios from "@/axios";
import qs from 'qs'
export function login(username, password) {
  return axios.post("/api/login", {
   username,
   password
  });
}

export function getUserInfo() {
    return axios.get("/my/userinfo");
  }
  
