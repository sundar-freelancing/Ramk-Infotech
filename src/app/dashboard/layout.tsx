"use client";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboardHelpers/DashboardSidebar";
import { DashboardGuard } from "./dashboardHelpers/DashboardGuard";
import { ContainerFluid } from "@/components/ui/Container";
import ModeToggleV2 from "@/components/helper/ModeToggleV2";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardGuard>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />
          <SidebarInset>
            <div className="flex flex-col h-full">
              <div className="p-3 border-b sticky top-0 bg-background/30 backdrop-blur-xs z-10 flex items-center justify-between">
                <SidebarTrigger />
                <ModeToggleV2 className="w-7 h-7" />
              </div>
              <ContainerFluid className="py-6 flex-1 overflow-auto">
                {children}
              </ContainerFluid>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </DashboardGuard>
  );
}
