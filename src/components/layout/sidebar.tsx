"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  BarChart2,
  Settings,
  AreaChart,
  Wallet,
  LogOut,
  List,
  Shapes,
  Target,
  PiggyBank,
  Repeat,
  FileDown,
  HelpCircle,
} from "lucide-react"
import { TransactionForm } from "../dashboard/transaction-form"
import { Button } from "../ui/button"
import { PlusCircle } from "lucide-react"
import { type Transaction } from "@/lib/data"

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()

  const menuItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/transactions",
      label: "Transactions",
      icon: List,
    },
    {
      href: "/categories",
      label: "Categories",
      icon: Shapes,
    },
    {
      href: "/budget",
      label: "Budget Planner",
      icon: Target,
    },
    {
      href: "/reports",
      label: "Reports",
      icon: BarChart2,
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: AreaChart,
    },
    {
      href: "/savings",
      label: "Savings Goals",
      icon: PiggyBank,
    },
    {
      href: "/recurring",
      label: "Recurring",
      icon: Repeat,
    },
    {
      href: "/export",
      label: "Export Data",
      icon: FileDown,
    },

  ]

  const bottomMenuItems = [
     {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
    {
      href: "/help",
      label: "Help & Support",
      icon: HelpCircle
    }
  ]

  // A dummy onSave function for now
  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'> & { date: Date }) => {
    console.log("New transaction added:", transaction);
  };


  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Wallet className="h-6 w-6 text-primary-foreground" />
          </div>
          {state === "expanded" && (
            <h1 className="text-xl font-bold">TrackWise</h1>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <TransactionForm onSave={addTransaction}>
               <SidebarMenuButton
                  icon={<PlusCircle />}
                  tooltip="Add Transaction"
                  className="w-full justify-start"
                >
                  Add Transaction
                </SidebarMenuButton>
            </TransactionForm>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  icon={<item.icon />}
                  tooltip={item.label}
                >
                  {item.label}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            {bottomMenuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    icon={<item.icon />}
                    tooltip={item.label}
                  >
                    {item.label}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
             <SidebarMenuItem>
                <SidebarMenuButton
                  icon={<LogOut />}
                  tooltip="Logout"
                >
                  Logout
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  )
}
