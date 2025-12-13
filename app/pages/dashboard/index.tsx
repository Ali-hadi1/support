import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';
import { SidebarTrigger } from '~/components/ui/sidebar';
import { Separator } from '~/components/ui/separator';
import InfoCard from '~/components/info-card';
import { Headset } from 'lucide-react';
import type { Route } from '../../+types/root';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Dashboard' }, { name: 'description', content: 'Welcome to MSP Dashboard!' }];
}

export default function HomePage() {
  return (
    <>
      <header className="flex h-14 shrink-0 items-center bg-zinc-50 justify-between gap-2 transition-[width,height] ease-linear group-has-data[[collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 cursor-pointer" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage className="text-gray-500">Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 auto-rows-fr">
          <InfoCard
            loading={false}
            title="Total Suppot Services"
            value={10}
            icon={Headset}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 md:grid-cols-3">
            <div className={`col-span-3 lg:col-span-2`}>
              <div className="w-full flex flex-col gap-4">ABC</div>
            </div>
            <div className={`col-span-3 lg:col-span-1 flex flex-col gap-4`}>CBA</div>
          </div>
        </div>
      </div>
    </>
  );
}
