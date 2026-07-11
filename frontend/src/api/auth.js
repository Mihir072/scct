import api, { setClientToken } from './client';

export const loginAdmin = async (username, password) => {
  const response = await api.post('/api/auth/login', { username, password });
  const { token } = response.data;
  setClientToken(token);
  return response.data;
};

export const logoutAdmin = () => {
  setClientToken(null);
};
