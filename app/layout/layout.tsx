import { Suspense, useEffect } from 'react';
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import { AppSidebar } from '~/components/app-sidebar';
import { Outlet } from 'react-router';
import { useGetCompanies } from '~/api/company';
import { useGetUser } from '~/api/user';
import LoadingSpinner from '~/components/loading';
import { Toaster } from 'sonner';
import Footer from './footer';
import { useSetCurrentCompany } from '~/stores/companyStore';

export default function RootLayout() {
  const { error, loading } = useGetCompanies();
  const { user, error: userError, loading: userLoading } = useGetUser();
  const setCurrentCompany = useSetCurrentCompany();

  useEffect(() => {
    if (user) {
      setCurrentCompany(user.company_id);
    }
  }, [user, setCurrentCompany]);

  if (loading || userLoading) {
    <LoadingSpinner text="Loading" />;
  }

  if (error || userError) {
    return (
      <div className="app-layout">
        <main className="main-content">
          <div className="error-container">Error loading: {error || userError}</div>
        </main>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Toaster position="top-right" duration={5000} className="mt-8" />
          <Outlet />
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </Suspense>
  );
}
