import axios from "axios";
import { Diary } from "../types";

const apiBaseUrl = 'http://localhost:3000/api';

const getAll = async () => {
  try {
    const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`);
    return data;
  } catch (error) {
    console.error("Failed to fetch diaries", error);
    throw error;
  }
};

export default {
  getAll,
};
