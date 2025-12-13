import { ChevronRight, type LucideIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from './ui/sidebar';
import { Link, useLocation } from 'react-router';
import { cn } from '~/lib/utils';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    iconColor?: string;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const location = useLocation();
  const pathname = location.pathname;

  const isPathActive = (path: string) => {
    return pathname === path;
  };

  const hasActiveChild = (item: (typeof items)[0]) => {
    if (!item.items) return false;
    return item.items.some(subItem => {
      const fullPath = item.url + subItem.url;
      return isPathActive(fullPath);
    });
  };

  const shouldBeOpen = (item: (typeof items)[0]) => {
    return item.isActive || isPathActive(item.url) || hasActiveChild(item);
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map(item => {
          const isMainActive = item.isActive || isPathActive(item.url);
          const hasActiveChildren = hasActiveChild(item);
          const isOpen = shouldBeOpen(item);

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isOpen}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      'h-10 transition-colors duration-200 py-0.5',
                      (isMainActive || hasActiveChildren) && [
                        'bg-primary/10 text-primary font-medium',
                        'hover:bg-primary/15',
                        'data-[state=open]:bg-primary/10',
                      ],
                      !isMainActive && !hasActiveChildren && 'hover:bg-accent'
                    )}
                    asChild={!item.items}
                  >
                    {item.items ? (
                      <div className="flex items-center w-full">
                        {item.icon && <item.icon className={`h-4 w-4 shrink-0`} />}
                        <span className="flex-1 ml-2">{item.title}</span>
                        <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </div>
                    ) : (
                      <Link to={item.url} className="flex items-center w-full">
                        {item.icon && <item.icon className={`${item.iconColor} h-5 w-5`} />}
                        <span className="ml-1">{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {item.items && (
                  <CollapsibleContent>
                    <SidebarMenuSub className="mt-0.5">
                      {item.items.map(subItem => {
                        const fullPath = item.url + subItem.url;
                        const isSubActive = isPathActive(fullPath);
                        return (
                          <SidebarMenuSubItem
                            key={subItem.title}
                            className={cn(
                              'transition-colors duration-150',
                              isSubActive && 'bg-primary/5 border-l-2 border-primary'
                            )}
                          >
                            <SidebarMenuSubButton
                              asChild
                              className={cn(
                                'rounded-sm hover:bg-accent',
                                isSubActive && 'text-primary font-medium'
                              )}
                            >
                              <Link to={fullPath}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
