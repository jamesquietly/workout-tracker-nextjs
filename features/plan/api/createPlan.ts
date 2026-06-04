import api from '@/lib/api';
import { Plan } from '@/features/plan/interfaces/Plan';

export interface CreatePlanDto {
  title: string;
  description: string;
}

const createPlan = async ({ title, description }: CreatePlanDto) => {
  const { data } = await api.post<Plan>('/plans', { title, description });
  return data;
};

export default createPlan;
