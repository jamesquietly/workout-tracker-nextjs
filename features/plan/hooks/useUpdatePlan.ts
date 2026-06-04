import { useMutation, useQueryClient } from '@tanstack/react-query';
import updatePlan from '@/features/plan/api/updatePlan';
import { PLAN_QUERY_KEY } from '@/features/plan/hooks/useGetPlans';

const useUpdatePlan = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLAN_QUERY_KEY] });
      onSuccess?.();
    },
  });
};

export default useUpdatePlan;
