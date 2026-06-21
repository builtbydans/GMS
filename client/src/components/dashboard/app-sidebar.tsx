"use client";

import * as React from "react";

import { NavDocuments } from "@/components/dashboard/nav-documents";
import { NavMain } from "@/components/dashboard/nav-main";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  LayoutDashboardIcon,
  UsersIcon,
  CarIcon,
  WrenchIcon,
  ClipboardListIcon,
  ReceiptIcon,
  CommandIcon,
  PoundSterlingIcon,
  PersonStandingIcon,
} from "lucide-react";

import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: <UsersIcon />,
    },
    {
      title: "Vehicles",
      url: "/vehicles",
      icon: <CarIcon />,
    },
    {
      title: "Jobs",
      url: "/jobs",
      icon: <WrenchIcon />,
    },
    {
      title: "Leads",
      url: "/leads",
      icon: <ClipboardListIcon />,
    },
    {
      title: "Invoices",
      url: "/invoices",
      icon: <ReceiptIcon />,
    },
    {
      title: "Quotes",
      url: "/quotes",
      icon: <PoundSterlingIcon />,
    },
    {
      title: "Staff",
      url: "/staff",
      icon: <PersonStandingIcon />,
    },
  ],

  navSecondary: [],
  documents: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">GMS</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
