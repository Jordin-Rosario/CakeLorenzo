import api from "./api";
import { useUserStore } from "../stores/userStore";

interface LoginPayload {
  username: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export const createAccountUser = async ({ username, name, lastname, email, password }: LoginPayload) => {
  console.log()
  const res = await api.post("/api/create-account/", {
      user:{
        username,
        name,
        lastname,
        email,
        password,
      },
    });
  
  // ? Usar api token para loguearse, luego de crear la cuenta
  const { access, refresh } = res.data;
  

  const profileRes = await api.get("/auth/me/", {
    headers: { Authorization: `Bearer ${access}` },
  });

  const user = profileRes.data;

  useUserStore.getState().setAuth(user, access, refresh);
};
