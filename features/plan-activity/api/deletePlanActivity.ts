import api from '@/lib/api';
import { PlanActivity } from '../interfaces/PlanActivity';

export interface DeletePlanActivityDto {
  id: number;
}

const deletePlanActivity = async ({
  id,
}: DeletePlanActivityDto) => {
  const { data } = await api.delete<PlanActivity>(`/plan-activities/${id}`);
  return data;
};

export default deletePlanActivity;
