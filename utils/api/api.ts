// export const API_BASE_URL = "http://127.0.0.1:3000/api/v1"; 
export const API_BASE_URL = "http://192.168.100.25:3000/api/auth"; 

export const signup = async (form: { name: string; email: string; password: string }) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};
