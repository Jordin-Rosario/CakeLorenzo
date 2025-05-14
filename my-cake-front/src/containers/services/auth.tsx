import api from "./api";
import { useUserStore } from "../stores/userStore";

interface LoginPayload {
  username: string;
  password: string;
}

export const loginUser = async ({ username, password }: LoginPayload) => {
  const res = await api.post("/api/token/", {
    username,
    password,
  });

  const { access, refresh } = res.data;

  const profileRes = await api.get("/auth/me/", {
    headers: { Authorization: `Bearer ${access}` },
  });

  const user = profileRes.data;
  console.log(user)

  useUserStore.getState().setAuth(user, access, refresh);
};
