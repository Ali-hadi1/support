import type { AbstractResponse, HookReturn } from './types';

export type Company = {
  id?: string | number;
  company_name?: string;
  logo?: string;
  partner_id: string | number;
};

export interface CompanyStore {
  currentCompany: Company | null;
  companies: Company[];
  setCurrentCompany: (companyId?: string | number) => void;
  setCompanies: (companies: Company[]) => void;
  addCompany: (company: Company) => void;
  updateCompany: (companyId: string, updates: Partial<Company>) => void;
  removeCompany: (companyId: string) => void;
  clearCompanies: () => void;
  getCompany: (companyId: string) => Company | undefined;
}

export interface UseGetCompaniesReturn extends HookReturn {}

export interface GetCompaniesResponse extends AbstractResponse {
  companies: Company[];
}
