"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import UseAdminDataStore from "@/store/adminDataStore";
import { signOutUser } from "@/firebase/authService";
import { getInitials } from "@/constant/helperFunction";
import { AppLogo } from "@/components/helper/AppLogo";
import { pageLink } from "@/constant/pageURL";
import { images } from "@/constant/images";
import {
  BarChart3,
  BookOpen,
  ChevronsUpDown,
  LayoutDashboard,
  LogOut,
  Mail,
  User,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { users, userData, clearUser } = UseAdminDataStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await signOutUser();
      clearUser();
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      clearUser();
      router.push("/dashboard");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const userEmail = users?.email || userData?.email || "user@example.com";
  const userName = userEmail.split("@")[0];
  const userInitials = getInitials(userName);

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
    },
    {
      title: "Courses",
      icon: BookOpen,
      href: "/dashboard/courses",
    },
    {
      title: "Trainers",
      icon: Users,
      href: "/dashboard/trainers",
    },
    {
      title: "Contact",
      icon: Mail,
      href: "/dashboard/contact",
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="py-4">
          {isCollapsed ? (
            <Link
              href={pageLink.dashboard}
              aria-label="RamK Infotech Home"
              className="h-[32px]"
            >
              <Image
                src={images.favicon512x512}
                alt="RamK Infotech"
                width={32}
                height={32}
                className="rounded object-cover"
                priority
              />
            </Link>
          ) : (
            <AppLogo href={pageLink.dashboard} height={32} />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2">
            Dashboard Menus
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "flex w-full items-center rounded-lg p-2 text-left text-sm transition-all",
              "bg-sidebar cursor-pointer",
              "",
              "",
              isCollapsed
                ? "justify-center gap-0"
                : "gap-3 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <Avatar className="size-8 shrink-0">
              <AvatarImage src="" alt={userName} />
              <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>

            <>
              <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                <span className="truncate font-medium">{userName}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {userEmail}
                </span>
              </div>
              {isCollapsed ? null : (
                <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
              )}
            </>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side="right"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0">
              <div className="flex items-center gap-2 px-1 py-1.5">
                <Avatar className="size-8">
                  <AvatarImage src="" alt={userName} />
                  <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <span className="truncate font-medium">{userName}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {userEmail}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/settings/account"
                className="cursor-pointer"
              >
                <User className="size-4" />
                <span>Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="destructive"
              className="cursor-pointer"
            >
              <LogOut className="size-4" />
              <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
