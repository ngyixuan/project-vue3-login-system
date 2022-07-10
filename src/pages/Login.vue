<template>
  <el-row class="h-screen bg-indigo-500">
    <el-col :span="16" class="flex items-center justify-center">
      <div>
        <div class="font-bold text-5xl text-light-50 mb-1">欢迎回来</div>
        <div>此站点是后台管理系统</div>
      </div>
    </el-col>
    <el-col
      :span="8"
      class="bg-light-50 flex items-center justify-center flex-col"
    >
      <h2 class="font-bold text-3xl text-gray-800">登录</h2>
      <div class="flex items-center justify-center my-5 text-gray-300">
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div>
      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="账号名" prop="username">
          <el-input v-model="form.username" :prefix-icon="Search"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            :prefix-icon="Lock"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" :loading="loading" @click="onSubmit"
        >登录</el-button
      >
    </el-col>
  </el-row>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import { Search, Lock } from "@element-plus/icons-vue";
import { login, getUserInfo } from "@/api/login";
import { success, warning } from "@/auth/notification";
import { setToken } from "@/auth/auth";
import qs from "qs";
import router from "../router";
import { useStore } from "vuex ";
// do not use same name with ref
const store = useStore();
const form = reactive({
  username: "",
  password: "",
});
const rules = reactive({
  username: [{ required: true, message: "用户名不可为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不可为空", trigger: "blur" }],
});
const ruleFormRef = ref(null);
const loading = ref(false);
function onSubmit() {
  ruleFormRef.value.validate((valid) => {
    loading.value = true;
    if (!valid) {
      return false;
    }

    store.dispatch("login", form).
      then((res) => {
        success("登录成功");
        router.push("Home");
      }).finally(() => {
        loading.value = false;
      });
    // login(form.username, form.password).then((res) => {
    //   console.log(res);
    //   if (res.status == 0) {
    //     success("登录成功")

    //     // const cookies = useCookies();
    //     // cookies.set("token", res.token);
    //     setToken(res.token)
    //     router.push("Home");

    //     //直接放到全局前置守卫
    //     // getUserInfo().then((res) => {
    //     //   console.log(res);
    //     //   store.commit("SET_USERINFO",res.data)
    //     // });
    //   } else {
    //     warning("登录失败")

    //   }
    //    loading.value = false;
    // });
  });
}
const onKeyUp=(e)=>{
  if(e.key == "Enter") onSubmit()
}
onMounted(()=>{
  document.addEventListener("keyup",onKeyUp)
}),
onBeforeUnmount(()=>{
  document.addEventListener("keyup",onKeyUp)
})
</script>
