"use client";
import { useEffect, useState } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { Client } from "@/components/tables/client-tables/client";
import { ClientModel } from "@/constants/data";
import useStrapiData from "@/hooks/useStrapiData";

const breadcrumbItems = [{ title: "Kunden", link: "/dashboard/clients" }];
export default function Page() {
  const { fetchData } = useStrapiData();
  const [clients, setClients] = useState<ClientModel[]>();

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const fetchedData: ClientModel[] = await fetchData("/clients");
        setClients(fetchedData);
      } catch (error) {
        throw error;
      }
    };

    fetchDataAsync();
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
