import BreadCrumb from "@/components/breadcrumb";
import { ClientForm } from "@/components/forms/client-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function Page() {
  const breadcrumbItems = [
    { title: "Kunden", link: "/dashboard/clients" },
    { title: "Hinzufügen/Bearbeiten", link: "/dashboard/clients/create" },
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <ClientForm />
      </div>
    </ScrollArea>
  );
}
