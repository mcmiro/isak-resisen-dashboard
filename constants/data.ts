import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: "dashboard",
    label: "Home",
  },
  {
    title: "Kunden",
    href: "/dashboard/clients",
    icon: "user",
    label: "kunden",
  },
  {
    title: "Chauffeure",
    href: "/dashboard/drivers",
    icon: "driver",
    label: "kunden",
  },
  {
    title: "Buchen",
    href: "/dashboard/order",
    icon: "ticket",
    label: "buchen",
  },
  {
    title: "Fahrzeuge",
    href: "/dashboard/vehicles",
    icon: "bus",
    label: "fahrzeuge",
  },
];
