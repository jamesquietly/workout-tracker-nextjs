import { useMutation, useQueryClient } from '@tanstack/react-query';
import createPlanActivity from '@/features/plan-activity/api/createPlanActivity';

import { PLAN_ACTIVITY_QUERY_KEY } from './useGetPlanActivities';

const useCreatePlanActivity = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPlanActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLAN_ACTIVITY_QUERY_KEY] });
      onSuccess?.();
    },
  });
};

export default useCreatePlanActivity;
