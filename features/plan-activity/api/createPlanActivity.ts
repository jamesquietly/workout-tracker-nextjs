import api from '@/lib/api';
import { PlanActivity } from '../interfaces/PlanActivity';

export interface CreatePlanActivityDto {
  planId: number;
  assignedDate: Date;
  notes?: string;
}

const createPlanActivity = async ({
  planId,
  assignedDate,
  notes,
}: CreatePlanActivityDto) => {
  const { data } = await api.post<PlanActivity>('/plans', {
    planId,
    assignedDate: assignedDate.toISOString(),
    notes,
  });
  return data;
};

export default createPlanActivity;
