"use client";

import { cn } from "@/lib/utils";
import { NavUser, type User } from "./nav-user";
import { TeamSwitcher, type Team } from "./team-switcher";
import {
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarContent,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroupContent,
  SidebarGroupAction,
} from "@/components/ui/sidebar";
export interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

interface SidebarProps {
  teams: Team[];
  user: User;
  navigation: NavSection[];
}

export function Sidebar({ teams, user, navigation }: SidebarProps) {
  return (
    <aside className="flex w-64 flex-col border-r bg-card">
      {/* Team Switcher */}
      <div className="px-4 py-2">
        <TeamSwitcher teams={teams} />
      </div>

      {/* Navigation */}
      <SidebarContent>
        {navigation.map((section, sectionIndex) => (
          <SidebarGroup>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item, itemIndex) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      tooltip={item.label}
                      className="text-muted-foreground"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* User Menu - Fixed at bottom */}
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </aside>
  );
}
