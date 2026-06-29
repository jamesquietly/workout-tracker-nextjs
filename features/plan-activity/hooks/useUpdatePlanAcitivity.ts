import { useMutation, useQueryClient } from '@tanstack/react-query';
import updatePlanActivity from '@/features/plan-activity/api/updatePlanActivity';

import { PLAN_ACTIVITY_QUERY_KEY } from './useGetPlanActivities';

const useUpdatePlanActivity = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePlanActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLAN_ACTIVITY_QUERY_KEY] });
      onSuccess?.();
    },
  });
};

export default useUpdatePlanActivity;
