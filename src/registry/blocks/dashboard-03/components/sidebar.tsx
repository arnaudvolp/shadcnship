"use client";

import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
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
import type { Team, User, NavSection } from "../types/dashboard";

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
                      className={item.active ? "" : "text-muted-foreground"}
                      isActive={item.active}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {item.badge !== undefined && (
                        <span className="ml-auto text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
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
