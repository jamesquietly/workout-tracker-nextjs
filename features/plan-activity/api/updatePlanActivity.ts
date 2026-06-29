import api from '@/lib/api';
import { PlanActivity } from '../interfaces/PlanActivity';

export interface UpdatePlanActivityDto {
  id: number;
  planId?: number;
  assignedDate?: Date;
  notes?: string;
}

const updatePlanActivity = async ({
  id,
  planId,
  assignedDate,
  notes,
}: UpdatePlanActivityDto) => {
  const { data } = await api.patch<PlanActivity>(`/plan-activities/${id}`, {
    planId,
    assignedDate: assignedDate?.toISOString(),
    notes,
  });
  return data;
};

export default updatePlanActivity;
