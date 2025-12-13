import type { Company, CompanyStore } from '~/types/company';
import { create } from 'zustand';

export const useCompanyStore = create<CompanyStore>()((set, get) => ({
  currentCompany: null,
  companies: [],

  setCurrentCompany: (companyId?: string | number) =>
    set(state => {
      const company = state.companies.find(c => c.id === companyId);
      if (!company) {
        return { currentCompany: null };
      }
      return { currentCompany: company };
    }),

  setCompanies: (companies: Company[]) => set({ companies, currentCompany: companies[0] || null }),

  addCompany: (company: Company) =>
    set(state => {
      const existingIndex = state.companies.findIndex(c => c.id === company.id);
      let newCompanies: Company[];

      if (existingIndex >= 0) {
        newCompanies = [...state.companies];
        newCompanies[existingIndex] = { ...newCompanies[existingIndex], ...company };
      } else {
        newCompanies = [...state.companies, company];
      }

      const currentCompany = state.currentCompany || newCompanies[0] || null;
      return { companies: newCompanies, currentCompany };
    }),

  updateCompany: (companyId: string, updates: Partial<Company>) =>
    set(state => {
      const updatedCompanies = state.companies.map(company =>
        company.id === companyId ? { ...company, ...updates } : company
      );

      const currentCompany =
        state.currentCompany?.id === companyId
          ? { ...state.currentCompany, ...updates }
          : state.currentCompany;

      return { companies: updatedCompanies, currentCompany };
    }),

  removeCompany: (companyId: string) =>
    set(state => {
      const filteredCompanies = state.companies.filter(c => c.id !== companyId);

      let currentCompany = state.currentCompany;
      if (state.currentCompany?.id === companyId) {
        currentCompany = filteredCompanies[0] || null;
      }
      return { companies: filteredCompanies, currentCompany };
    }),

  clearCompanies: () => set({ companies: [], currentCompany: null }),

  getCompany: (companyId: string) => {
    return get().companies.find(c => c.id === companyId);
  },
}));

// Hook selectors for easy usage
export const useCurrentCompany = () => useCompanyStore(state => state.currentCompany);
export const useCompanies = () => useCompanyStore(state => state.companies);
export const useSetCurrentCompany = () => useCompanyStore(state => state.setCurrentCompany);
export const useSetCompanies = () => useCompanyStore(state => state.setCompanies);
export const useAddCompany = () => useCompanyStore(state => state.addCompany);
export const useUpdateCompany = () => useCompanyStore(state => state.updateCompany);
export const useRemoveCompany = () => useCompanyStore(state => state.removeCompany);
export const useClearCompanies = () => useCompanyStore(state => state.clearCompanies);
export const useGetCompany = () => useCompanyStore(state => state.getCompany);

// Utility hooks
export const useCompanyActions = () => {
  const setCurrentCompany = useSetCurrentCompany();
  const setCompanies = useSetCompanies();
  const addCompany = useAddCompany();
  const updateCompany = useUpdateCompany();
  const removeCompany = useRemoveCompany();
  const clearCompanies = useClearCompanies();
  const getCompany = useGetCompany();

  return {
    setCurrentCompany,
    setCompanies,
    addCompany,
    updateCompany,
    removeCompany,
    clearCompanies,
    getCompany,
  };
};

export default useCompanyStore;
