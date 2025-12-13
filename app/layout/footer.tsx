import { useCurrentCompany } from '~/stores/companyStore';

export default function Footer() {
  const company = useCurrentCompany();

  return (
    <div className="w-full flex justify-center h-10 bg-zinc-50">
      <div className="container px-1 md:px-3 lg:px-4 text-gray-700 h-full w-full flex justify-between items-center text-xs font-medium">
        <span>
          {new Date().getFullYear()} &copy; {company?.company_name}
        </span>
        <span>Design & Developed by NETLINKS Ltd</span>
      </div>
    </div>
  );
}
