import { useMutation } from '@tanstack/react-query';
import postLogin from '@/features/auth/api/postLogin';
import { useUser } from '@/features/user/contexts/UserContext';

const useLogin = (onSuccess?: () => void) => {
  const { setUser } = useUser();
  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      setUser(data.user);
      onSuccess?.();
    },
  });
};

export default useLogin;
