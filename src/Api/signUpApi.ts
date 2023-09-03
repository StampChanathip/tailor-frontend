import axios, { AxiosError } from "axios";

const signUpApi = async (formData: SignUpFormData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/signup",
      formData
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.data;
  }
};

export default signUpApi;
