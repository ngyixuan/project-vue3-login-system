import { useCookies } from "@vueuse/integrations/useCookies";
const TokenKey = "token"
const cookies = useCookies();

export const setToken=(token)=>{
    return cookies.set(TokenKey, token);
}

export const getToken=()=>{
    return  cookies.get(TokenKey);
}

export const removeToken=()=>{
    return  cookies.remove(TokenKey);
}
        