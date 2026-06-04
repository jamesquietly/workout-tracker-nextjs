import api from '@/lib/api';
import { Plan } from '@/features/plan/interfaces/Plan';

export interface UpdatePlanDto {
  id: number;
  title: string;
  description: string;
}

const updatePlan = async ({ id, title, description }: UpdatePlanDto) => {
  const { data } = await api.patch<Plan>(`/plans/${id}`, {
    title,
    description,
  });
  return data;
};

export default updatePlan;
