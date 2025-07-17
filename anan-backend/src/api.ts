const LOCAL_IP = "http://192.168.100.25:3001/api"; 

export const signup = async (name: string, email: string, password: string) => {
  const res = await fetch(`${LOCAL_IP}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};

export const login = async (email: string, password: string) => {
  const res = await fetch(`${LOCAL_IP}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const createProfile = async (userId: string, profile: any) => {
  const res = await fetch(`${LOCAL_IP}/profiles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, profile }),
  });
  return res.json();
};
