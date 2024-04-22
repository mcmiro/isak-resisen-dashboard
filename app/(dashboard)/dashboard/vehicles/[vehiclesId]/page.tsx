import BreadCrumb from "@/components/breadcrumb";
import { VehicleForm } from "@/components/forms/vehicle-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function Page() {
  const breadcrumbItems = [
    { title: "Fahrzeuge", link: "/dashboard/vehicles" },
    { title: "Hinzufügen/Bearbeiten", link: "/dashboard/vehicles/create" },
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <VehicleForm />
      </div>
    </ScrollArea>
  );
}
