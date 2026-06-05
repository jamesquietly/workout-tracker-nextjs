import { useQuery } from '@tanstack/react-query';
import getPlanActivities from '@/features/plan-activity/api/getPlanActivities';

export const PLAN_ACTIVITY_QUERY_KEY = 'plan-activities';

const useGetPlanActivities = () => {
  return useQuery({
    queryKey: [PLAN_ACTIVITY_QUERY_KEY],
    queryFn: getPlanActivities,
  });
};

export default useGetPlanActivities;
