import { createStore } from 'vuex'
import { login, getUserInfo } from "@/api/login";
import router from "../router";
import { setToken } from "@/auth/auth";
import {success, warning} from "@/auth/notification"
// Create a new store instance.
const store = createStore({
  state () {
    return {
      //用户信息
      user:{}
    
    }
  },
  mutations: {
    SET_USERINFO(state,user){
      state.user = user
    }
    
  },
  actions:{
    login({commit},{username,password}){
      return new Promise((resolve,reject)=>{
        login(username, password).then((res) => {
            setToken(res.token)
            
            resolve(res)
            console.log("success");
        }).catch(err=>reject(err))


      })

    },
    getinfo({commit}){
      return new Promise((resolve, reject)=>{
        getUserInfo().then(res=>{
          commit("SET_USERINFO",res)
          resolve(res)
        }).catch(err=>reject(err))
      })
   

    }
  }
})

export default store