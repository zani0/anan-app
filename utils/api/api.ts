import axios from "axios";

export const API_BASE_URL = "https://anansesem.onrender.com/api/v1"; 
// export const API_BASE_URL = "http://192.168.100.25:3000/api/auth";

interface SignupForm {
  name: string;
  email: string;
  password: string;
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
    const response = await axios.post(`${API_BASE_URL}/register`, form);

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Signup failed (Axios)";
      console.error("Signup failed:", message);
      throw new Error(message);
    } else {
      console.error("Unexpected signup error:", error);
      throw new Error("Unexpected error occurred during signup.");
    }
  }
};

export const login = async (form: LoginForm): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, form);

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Login failed (Axios)";
      console.error("Login failed:", message);
      throw new Error(message);
    } else {
      console.error("Unexpected Login error:", error);
      throw new Error("Unexpected error occurred during Login.");
    }
  }
};
