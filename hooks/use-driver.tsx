"use client";

import { useState } from "react";
import useStrapiData from "./use-strapi-data";
import ApiProvider from "@/lib/axios-instance";
import { DriverModel } from "@/types/driver";
import { toast } from "@/components/ui/use-toast";

export type DriverDataProps = {
  name: string;
};

const useDriver = () => {
  const { fetchData } = useStrapiData();
  const [drivers, setDrivers] = useState<DriverModel[]>();
  const [singleDriver, setSingleDriver] = useState<DriverModel | null>(null);

  const getDrivers = async (): Promise<DriverModel[]> => {
    try {
      const fetchedData: DriverModel[] = await fetchData("/drivers");
      setDrivers(fetchedData);
      return fetchedData;
    } catch (error) {
      throw error;
    }
  };

  const getDriverById = async (id: number): Promise<DriverModel> => {
    try {
      const fetchedData: DriverModel[] = await fetchData(`/drivers/${id}`);
      setSingleDriver(fetchedData[0]);
      return fetchedData[0];
    } catch (error) {
      throw error;
    }
  };

  const insertDriver = async (data: DriverDataProps): Promise<void> => {
    try {
      await ApiProvider.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/drivers`,
        data,
      );
      toast({
        variant: "default",
        title: "Erfolgreich gespeichert",
        description: "Objekt erfolgreich gespeichert",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ups! Etwas ist schiefgegangen.",
        description: "Es gab ein Problem mit Ihrer Anfrage.",
      });
      throw error;
    }
  };

  const updateDriver = async (
    data: DriverDataProps,
    id: number,
  ): Promise<void> => {
    try {
      await ApiProvider.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/drivers/${id}`,
        data,
      );
      toast({
        variant: "default",
        title: "Erfolgreich gespeichert",
        description: "Objekt erfolgreich gespeichert",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ups! Etwas ist schiefgegangen.",
        description: "Es gab ein Problem mit Ihrer Anfrage.",
      });
      throw error;
    }
  };

  const deleteDriver = async (id: number): Promise<void> => {
    try {
      await ApiProvider.delete(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/drivers/${id}`,
      );
      toast({
        variant: "default",
        title: "Erfolgreich gelöscht",
        description: "Objekt erfolgreich gelöscht",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ups! Etwas ist schiefgegangen.",
        description: "Es gab ein Problem mit Ihrer Anfrage.",
      });
      throw error;
    }
  };

  return {
    getDrivers,
    getDriverById,
    insertDriver,
    updateDriver,
    deleteDriver,
    drivers,
    singleDriver,
  };
};

export default useDriver;
