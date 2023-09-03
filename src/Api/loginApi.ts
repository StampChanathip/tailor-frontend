import axios, { AxiosError } from "axios";

const loginApi = async (formData: LoginFormData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/signin",
      formData
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.data;
  }
};

export default loginApi;
