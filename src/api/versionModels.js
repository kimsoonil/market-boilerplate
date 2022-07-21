import axios from "axios";
import { BASIC_API } from "./api";

export const version = async (id) => {
  const response = await axios.get(`${BASIC_API}/api/version-models`);
  return response.data;
};
