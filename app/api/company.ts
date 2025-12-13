import { useEffect, useState } from 'react';
import { getRequest } from '../lib/http';
import type { GetCompaniesResponse, UseGetCompaniesReturn } from '../types/company';
import { useSetCompanies } from '~/stores/companyStore';
import { toast } from 'sonner';

/* 
/ --------------------------------------------------------------------
/ Get Company
/ --------------------------------------------------------------------
*/

export function useGetCompanies(): UseGetCompaniesReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setCompanies = useSetCompanies();

  useEffect(() => {
    const fetchCompnay = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getRequest<GetCompaniesResponse>('/company');
        if (response.success) {
          setCompanies(response?.companies);
        } else {
          toast.error(response.message || 'Failed to fetch companies');
          setError(response.error || 'Failed to fetch companies');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompnay();
  }, [setCompanies]);

  return { loading, error };
}
