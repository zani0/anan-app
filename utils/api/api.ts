import axios from "axios";

export const API_BASE_URL = "https://anansesem.onrender.com/api/v1"; 
// export const API_BASE_URL = "http://192.168.100.25:3000/api/auth";

interface SignupForm {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phoneNumber: string;
}

interface SignupResponse {
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    // Add more fields as needed
  };
}

interface LoginForm {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export const signup = async (form: SignupForm): Promise<SignupResponse> => {
  try {
    console.log('form', form)

    const response = await axios({
      method: 'post',
      baseURL: API_BASE_URL,
      url: '/register',
      data: {
        ...form,
        password: 'P@ssw0rd123'
      }
    })
    // const response = await axios.post(`${API_BASE_URL}/register`, form);

    return response.data;

  } catch (error: any) {

  console.error(error?.response.data);
  
  throw new Error(error.message)
  
    // if (axios.isAxiosError(error)) {
    //   const message = error.response?.data?.message || "Signup failed (Axios)";
    //   console.error("Signup failed:", message);
    //   throw new Error(message);
    // } else {
    //   console.error("Unexpected signup error:", error);
    //   throw new Error("Unexpected error occurred during signup.");
    // }
  }
};

// lib/api.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "https://anansesem.onrender.com/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    console.log("token within api client", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
