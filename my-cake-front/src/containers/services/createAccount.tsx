import api from "./api";
import { useUserStore } from "../stores/userStore";

interface CreatePayload {
  username: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const createAccountUser = async ({ username, name, lastname, email, password, passwordConfirmation }: CreatePayload) => {
  
  try{
    const res = await api.post("/api/create-account/", {
      user:{
        username,
        name,
        lastname,
        email,
        password,
        passwordConfirmation,
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
