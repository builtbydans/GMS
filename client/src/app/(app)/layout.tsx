import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { WorkInProgressBanner } from "@/components/work-in-progress-banner";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar />

      <SidebarInset>
        <WorkInProgressBanner />
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
