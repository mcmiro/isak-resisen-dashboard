"use client";
import { useEffect } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { Client } from "@/components/tables/client-tables/client";
import useClient from "@/hooks/use-client";

const breadcrumbItems = [{ title: "Kunden", link: "/dashboard/clients" }];
export default function Page() {
  const { getClients, clients } = useClient();

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        {clients && <Client data={clients} />}
      </div>
    </>
  );
}
