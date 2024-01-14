import axios from "axios";
import { API } from "@/constants";

export const fetchLoginByUsername = async (username: string, password: string) => {
  try {
    const { data } = await axios.post(`${API}/login`, { username, password });
    return data;
  } catch (error) {
  }
}