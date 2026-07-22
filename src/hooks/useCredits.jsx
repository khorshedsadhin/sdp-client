import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCredits = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: credits, isLoading, refetch } = useQuery({
    enabled: !loading && !!user?.email,

    queryKey: ['credits', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/credits/me');
      return data;
    }
  });

  return {
    credits,
    availableCredits: credits?.availableCredits || 0,
    purchasedCredits: credits?.purchasedCredits || 0,
    usedCredits: credits?.usedCredits || 0,
    isLoading,
    refetch,
  };
};

export default useCredits;
