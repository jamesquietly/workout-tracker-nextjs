import api from '@/lib/api';
import { PlanActivity } from '../interfaces/PlanActivity';

const getPlanActivities = async () => {
  const { data } = await api.get<PlanActivity[]>(
    '/plan-activities/user-plan-activities',
  );
  return data;
};

export default getPlanActivities;
