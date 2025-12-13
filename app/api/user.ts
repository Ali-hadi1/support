import { getRequest } from '~/lib/http';
import type { User } from '../types/user';
import { useEffect, useState } from 'react';
import { useUser, useSetUser } from '~/stores/userStore';

/* 
/ --------------------------------------------------------------------
/ Get User
/ --------------------------------------------------------------------
*/

export function useGetUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useUser();
  const setUser = useSetUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await getRequest<{ user: User }>('/user');
        setUser(userData?.user);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
