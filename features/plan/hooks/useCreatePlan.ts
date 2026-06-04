import { useMutation } from '@tanstack/react-query';
import createPlan from '@/features/plan/api/createPlan';

const useCreatePlan = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: createPlan,
    onSuccess: () => {
      onSuccess?.();
    },
  });
};

export default useCreatePlan;
