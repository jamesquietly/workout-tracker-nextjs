import { useQuery } from '@tanstack/react-query';
import getPlans from '@/features/plan/api/getPlans';

export const PLAN_QUERY_KEY = 'plans';

const useGetPlans = () => {
  return useQuery({
    queryKey: [PLAN_QUERY_KEY],
    queryFn: getPlans,
  });
};

export default useGetPlans;
