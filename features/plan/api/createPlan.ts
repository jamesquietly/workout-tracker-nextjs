import api from '@/lib/api';

export interface CreatePlanDto {
  title: string;
  description: string;
}

const createPlan = async ({ title, description }: CreatePlanDto) => {
  const { data } = await api.post('/plans', { title, description });
  return data;
};

export default createPlan;
