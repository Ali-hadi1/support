import type * as React from 'react';
import { Gauge, Headset, FileHeadphone } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from './ui/sidebar';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { CompanySwitcher } from './nav-company';
import { useUser } from '~/stores/userStore';
import { useCompanies } from '~/stores/companyStore';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      isActive: false,
      icon: Gauge,
      iconColor: 'text-purple-700',
    },
    {
      title: 'Support Services',
      url: '/support-services',
      isActive: false,
      icon: Headset,
      iconColor: 'text-orange-600',
    },
    {
      title: 'Tickets',
      url: '/support-tickets',
      icon: FileHeadphone,
      isActive: false,
      iconColor: 'text-green-600',
      // items: [
      //   {
      //     title: 'Tickets',
      //     url: '/tickets',
      //   },
      // ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUser();
  const companies = useCompanies();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanySwitcher companies={companies} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
