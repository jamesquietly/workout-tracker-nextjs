import { useMutation } from '@tanstack/react-query';
import createPlanActivity from '@/features/plan-activity/api/createPlanActivity';

const useCreatePlanActivity = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: createPlanActivity,
    onSuccess: () => {
      onSuccess?.();
    },
  });
};

export default useCreatePlanActivity;
