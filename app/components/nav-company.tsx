import { ChevronsUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from './ui/sidebar';
import type { Company } from '~/types/company';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useCurrentCompany, useSetCurrentCompany } from '~/stores/companyStore';
import companyLogo from '~/assets/netlinks-Logo.png';

interface CompanySwitcherProps {
  companies: Company[];
}

export function CompanySwitcher({ companies }: CompanySwitcherProps) {
  const { isMobile } = useSidebar();
  const activeCompany = useCurrentCompany();
  const setActiveCompany = useSetCurrentCompany();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={activeCompany?.logo || companyLogo}
                    alt={activeCompany?.company_name}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeCompany?.company_name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Companies
            </DropdownMenuLabel>
            {companies.map(company => (
              <DropdownMenuItem
                key={company.company_name}
                onClick={() => setActiveCompany(company?.id)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={company?.logo || companyLogo} alt={company.company_name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                </div>
                {company.company_name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
