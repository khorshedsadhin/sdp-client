import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useSubscription = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: subscription, isLoading, refetch } = useQuery({
    enabled: !loading && !!user?.email,

    queryKey: ['subscription', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/subscription/me');
      return data;
    }
  });

  return {
    subscription,
    isActive: !!subscription?.isActive,
    daysRemaining: subscription?.daysRemaining || 0,
    isLoading,
    refetch,
  };
};

export default useSubscription;
