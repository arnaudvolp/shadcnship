"use client";

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
  SidebarGroupContent,
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
      <div className="px-2 py-2">
        <TeamSwitcher teams={teams} />
      </div>

      {/* Navigation */}
      <SidebarContent className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {navigation.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
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
