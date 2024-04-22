import BreadCrumb from "@/components/breadcrumb";
import { DriverForm } from "@/components/forms/driver-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function Page() {
  const breadcrumbItems = [
    { title: "Chauffeure", link: "/dashboard/clients" },
    { title: "Hinzufügen/Bearbeiten", link: "/dashboard/clients/create" },
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <DriverForm />
      </div>
    </ScrollArea>
  );
}
