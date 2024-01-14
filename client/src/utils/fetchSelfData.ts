import axios from "axios";
import { API } from "@/constants";

export const fetchSelfData = async () => {
  try {
    const { data } = await axios.get(`${API}/self`, { withCredentials: true });
    return data;
  } catch (error) {
  }
}