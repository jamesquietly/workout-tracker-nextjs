import { useMutation } from '@tanstack/react-query';
import postRegister from '@/features/user/api/postRegister';

const useRegister = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: postRegister,
    onSuccess,
  });
};

export default useRegister;
