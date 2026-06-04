import api from '@/lib/api';
import { Plan } from '@/features/plan/interfaces/Plan';

const getPlans = async () => {
  const { data } = await api.get<Plan[]>('/plans/user-plans');
  return data;
};

export default getPlans;
