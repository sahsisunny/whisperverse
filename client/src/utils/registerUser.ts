import axios from "axios";
import { API } from "@/constants";

export const registerUser = async (name: string, username: string, email: string, password: string) => {
  try {
    const { data } = await axios.post(`${API}/register`, { username,name , email, password });
    return data;
  } catch (error) {
  }
}