import axios from "axios";
import { InputValidator } from "./validator";

export const predictInput = async (input: string) => {
  const payload = InputValidator.parse({ input });
  const { data } = await axios.post("/api/predict", payload);
  return data as string;
};
