import api from "./api";
import { useUserStore } from "../stores/userStore";

interface CreatePayload {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const createAccountUser = async ({ username, first_name, last_name, email, password }: CreatePayload) => {
  
  try{
    const res = await api.post("/api/create-account/", {
      user:{
        username,
        first_name,
        last_name,
        email,
        password,
      },
    });
    
    const { access, refresh } = res.data;
    
  
    const profileRes = await api.get("/auth/me/", {
      headers: { Authorization: `Bearer ${access}` },
    });
  
    const user = profileRes.data;
  
    useUserStore.getState().setAuth(user, access, refresh);
  } catch (error:any) { 
      return {status:error.response.status, data: error.response.data}
  }}
