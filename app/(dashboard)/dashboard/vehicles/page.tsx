"use client";
import { useEffect, useState } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { Vehicle } from "@/components/tables/vehicle-tables/vehicle";
import { VehicleModel } from "@/types/vehicle";
import useStrapiData from "@/hooks/useStrapiData";

const breadcrumbItems = [{ title: "Fahrzeuge", link: "/dashboard/vehicles" }];
export default function Page() {
  const { fetchData } = useStrapiData();
  const [vehicles, setVehicles] = useState<VehicleModel[]>();

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const fetchedData: VehicleModel[] = await fetchData("/vehicles");
        setVehicles(fetchedData);
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
        {vehicles && <Vehicle data={vehicles} />}
      </div>
    </>
  );
}
