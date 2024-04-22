import { NavItem } from "@/types";

export type ClientModel = {
  id: number;
  name: string;
};

export type DriverModel = {
  id: number;
  name: string;
};

export type VehicleModel = {
  id: number;
  name: string;
};

export const clients: ClientModel[] = [
  {
    id: 1,
    name: "David",
  },
  {
    id: 2,
    name: "John Doe",
  },
  {
    id: 3,
    name: "Alice Johnson",
  },
  {
    id: 4,
    name: "David Smith",
  },
  {
    id: 5,
    name: "Emma Wilson",
  },
  {
    id: 6,
    name: "James Brown",
  },
  {
    id: 7,
    name: "Laura White",
  },
  {
    id: 8,
    name: "Michael Lee",
  },
  {
    id: 9,
    name: "Olivia Green",
  },
  {
    id: 10,
    name: "Robert Taylor",
  },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number;
  latitude?: number;
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

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
    title: "Employee",
    href: "/dashboard/employee",
    icon: "employee",
    label: "employee",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Fahrzeuge",
    href: "/dashboard/vehicles",
    icon: "bus",
    label: "fahrzeuge",
  },
];
