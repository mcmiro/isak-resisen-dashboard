"use client";
import { DashboardNav } from "@/components/dashboard-nav";
import { navItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";
import { signOut } from "next-auth/react";
import { Icons } from "@/components/icons";

type UserInfoProps = {
  user: User;
};

export default function Sidebar({ user }: UserInfoProps) {
  const handleLogout = async () => {
    await signOut();
  };

  const Icon = Icons["login"];

  return (
    <nav
      className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72`)}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview
            </h2>
            <DashboardNav items={navItems} />
            <div onClick={handleLogout}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transparent cursor-pointer",
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
