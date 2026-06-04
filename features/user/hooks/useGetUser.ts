import { useQuery } from '@tanstack/react-query';
import getUser from '@/features/user/api/getUser';

const GET_USER_QUERY_KEY = 'getUser';

const useGetUser = () => {
  return useQuery({
    queryKey: [GET_USER_QUERY_KEY],
    queryFn: getUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetUser;
