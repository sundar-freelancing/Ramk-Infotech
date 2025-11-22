"use client";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboardHelpers/DashboardSidebar";

export const DashboardV2 = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <SidebarInset>
          <div className="flex flex-col h-full">
            <div className="p-6 pb-4">
              <SidebarTrigger />
            </div>
            <div className="flex-1 p-6 pt-0">
              {/* Your dashboard content goes here */}
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
