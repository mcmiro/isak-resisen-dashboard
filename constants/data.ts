import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: "dashboard",
    label: "Home",
  },
  {
    title: "Fahrplan",
    href: "/dashboard/schedule",
    icon: "dashboard",
    label: "Fahrplan",
  },
  {
    title: "Buchungen",
    href: "/dashboard/orders",
    icon: "ticket",
    label: "buchen",
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
    title: "Fahrzeuge",
    href: "/dashboard/vehicles",
    icon: "bus",
    label: "fahrzeuge",
  },
];
