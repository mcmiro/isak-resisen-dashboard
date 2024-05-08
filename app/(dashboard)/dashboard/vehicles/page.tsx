"use client";
import { useEffect } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { Vehicle } from "@/components/tables/vehicle-tables/vehicle";
import useVehicle from "@/hooks/use-vehicle";

const breadcrumbItems = [{ title: "Fahrzeuge", link: "/dashboard/vehicles" }];
export default function Page() {
  const { getVehicles, vehicles } = useVehicle();

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        {vehicles && <Vehicle data={vehicles} />}
      </div>
    </>
  );
}
