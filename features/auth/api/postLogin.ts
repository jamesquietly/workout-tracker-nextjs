import api from '@/lib/api';

export interface LoginDto {
  email: string;
  password: string;
}

const postLogin = async ({ email, password }: LoginDto) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export default postLogin;
