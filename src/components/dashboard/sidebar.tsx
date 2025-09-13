"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { useAuth } from "@/contexts/AuthContext";

import {
  LayoutDashboard, PhoneCall, Users, BarChart,
  Settings, HelpCircle, LogOut, ChevronLeft,
  Menu, Plus, Contact, Shield,
  Megaphone
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // live agent count
  const { data: agentsData } = useSWR<{ agents: any[] }>("/api/agents", fetcher);
  const agentCount = agentsData?.agents?.length ?? 0;

  // Active calls
  const { data: callsData } = useSWR<{ calls: any[], pagination: any }>("/api/calls?status=in-progress", fetcher);
  const activeCallCount = callsData?.calls?.length ?? 0;

  const navItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      href: "/dashboard"
    },
    {
      icon: <PhoneCall className="h-5 w-5" />,
      label: "Calls",
      href: "/dashboard/calls",
      badge: activeCallCount > 0 ? activeCallCount : undefined
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Agents",
      href: "/dashboard/agents",
      badge: agentCount,
    },
    {
      icon: <Contact className="h-5 w-5" />,
      label: "Contacts",
      href: "/dashboard/contacts"
    },
    {
      icon: <Megaphone className="h-5 w-5" />,
      label: "Campaigns",
      href: "/dashboard/campaigns"
    },
    {
      icon: <BarChart className="h-5 w-5" />,
      label: "Analytics",
      href: "/dashboard/analytics"
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/dashboard/settings"
    },
  ];

  /* ---------- local handlers ---------- */
  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);
  const handleLogout = () => {
    logout();
  };

  /* ---------- render ---------- */
  return (
    <>
      {/* mobile hamburger */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-background/95 backdrop-blur-sm border shadow-sm"
        onClick={toggleMobileSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed h-screen top-0 left-0 z-50",
          "transition-all duration-300 ease-in-out flex flex-col",
          "md:relative md:translate-x-0",
          "bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Header */}
        <div className={cn(
          "flex items-center h-16 px-4 border-b border-sidebar-border",
          collapsed ? "justify-center" : "justify-between"
        )}>
          <Link href="/dashboard" className="flex items-center gap-3 ">
            <div className={`relative w-full p-6 rounded-lg ${collapsed ?
              "ml-7" : ""
              }  bg- -primary/10 p-6  scale- w-full `}>
              <Image src="/zapllo.png" width={80} height={80} alt="Zapllo AI"  className="w-full p" />
            </div>
            {/* {!collapsed && (
              <span className="font-semibold text-lg  text-sidebar-foreground">
                Zapllo Voice
              </span>
            )} */}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={`hidden md:flex h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 ${collapsed ? "ml-2 border rounded-full border-border dark:bg-primary  text-black" : ""}`}
          >
            <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180 " : ""}`} />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col min-h-0">
          {collapsed ? (
            <div className="flex-1 py-4 px-2 space-y-2">
              {navItems.map(({ icon, label, href, badge }) => {
                const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
                return (
                  <TooltipProvider key={href} delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className="block"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "w-12 h-12 relative rounded-lg",
                              active
                                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                                : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                            )}
                          >
                            {icon}
                            {badge !== undefined && (
                              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                                {typeof badge === 'number' && badge > 9 ? '9+' : badge}
                              </Badge>
                            )}
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="font-medium">
                        {label}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
          ) : (
            <ScrollArea className="flex-1">
              <nav className="py-4 px-3 space-y-1">
                {navItems.map(({ icon, label, href, badge }) => {
                  const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="block"
                    >
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start gap-3 px-3 py-2.5 h-10 text-sm font-medium rounded-lg",
                          active
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                            : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                      >
                        {icon}
                        <span className="truncate">{label}</span>
                        {badge !== undefined && (
                          <Badge
                            variant="secondary"
                            className="ml-auto h-5 px-2 text-xs bg-sidebar-primary/10 text-sidebar-primary border-0"
                          >
                            {badge}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </ScrollArea>
          )}
        </div>

        {/* Footer */}
        <div className={cn(
          "p-3 border-t border-sidebar-border space-y-3",
          collapsed && "flex flex-col  items-center "
        )}>
          {/* New Agent Button */}
          <Link href="/dashboard/new-agent" onClick={() => setMobileOpen(false)}>
            <Button
              className={cn(
                "bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground shadow-sm",
                "font-medium rounded-lg h-9",
                collapsed ? "w-12 px-0 " : "w-full"
              )}
            >
              <Plus className="h-4 w-4" />
              {!collapsed && <span className="ml-2">New Agent</span>}
            </Button>
          </Link>

          {/* Support & Logout */}
          <div className={cn("space-y-1", collapsed && "flex flex-col items-center space-y-2")}>
            <TooltipProvider delayDuration={collapsed ? 100 : 1000}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size={collapsed ? "icon" : "sm"}
                    className={cn(
                      "text-sidebar-foreground/70 mt-3 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-lg",
                      collapsed ? "w-8 h-8" : "w-full justify-start"
                    )}
                    asChild
                  >
                    <Link href="/dashboard/support">
                      <HelpCircle className="h-4 w-4" />
                      {!collapsed && <span className="ml-2 text-xs">Help & Support</span>}
                    </Link>
                  </Button>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">Help & Support</TooltipContent>}
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={collapsed ? 100 : 1000}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size={collapsed ? "icon" : "sm"}
                    className={cn(
                      "text-destructive/70 hover:text-destructive hover:bg-destructive/10 rounded-lg",
                      collapsed ? "w-8 h-8" : "w-full justify-start"
                    )}
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    {!collapsed && <span className="ml-2 text-xs">Log Out</span>}
                  </Button>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">Log Out</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Version */}
          {!collapsed && (
            <div className="pt-3 border-t border-sidebar-border">
              <div className="flex items-center gap-2 px-1">
                <Shield className="h-3 w-3 text-sidebar-primary" />
                <span className="text-xs font-medium text-sidebar-foreground/90">Zapllo AI</span>
              </div>
              <p className="text-[10px] text-sidebar-foreground/60 mt-0.5 px-1">
                Version {process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'}
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
