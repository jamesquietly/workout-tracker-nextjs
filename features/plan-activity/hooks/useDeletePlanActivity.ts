import { useMutation, useQueryClient } from '@tanstack/react-query';
import deletePlanActivity from '@/features/plan-activity/api/deletePlanActivity';

import { PLAN_ACTIVITY_QUERY_KEY } from './useGetPlanActivities';

const useDeletePlanActivity = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePlanActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLAN_ACTIVITY_QUERY_KEY] });
      onSuccess?.();
    },
  });
};

export default useDeletePlanActivity;
