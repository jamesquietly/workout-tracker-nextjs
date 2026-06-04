import api from '@/lib/api';

export interface RegisterDto {
  email: string;
  password: string;
}

const postRegister = async ({ email, password }: RegisterDto) => {
  const { data } = await api.post('/users/register', { email, password });
  return data;
};

export default postRegister;
