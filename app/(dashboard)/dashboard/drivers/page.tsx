"use client";
import { useEffect, useState } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { Driver } from "@/components/tables/driver-tables/driver";
import { DriverModel } from "@/constants/data";
import useStrapiData from "@/hooks/useStrapiData";

const breadcrumbItems = [{ title: "Chauffeure", link: "/dashboard/drivers" }];
export default function Page() {
  const { fetchData } = useStrapiData();
  const [drivers, setDrivers] = useState<DriverModel[]>();

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const fetchedData: DriverModel[] = await fetchData("/drivers");
        setDrivers(fetchedData);
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
        {drivers && <Driver data={drivers} />}
      </div>
    </>
  );
}
