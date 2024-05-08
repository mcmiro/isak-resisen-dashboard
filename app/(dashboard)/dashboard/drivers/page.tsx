"use client";
import { useEffect } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { Driver } from "@/components/tables/driver-tables/driver";
import useDriver from "@/hooks/use-driver";

const breadcrumbItems = [{ title: "Chauffeure", link: "/dashboard/drivers" }];
export default function Page() {
  const { getDrivers, drivers } = useDriver();

  useEffect(() => {
    getDrivers();
  }, []);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        {drivers && <Driver data={drivers} />}
      </div>
    </>
  );
}
