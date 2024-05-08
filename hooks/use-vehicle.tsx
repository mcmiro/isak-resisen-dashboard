"use client";

import { useState } from "react";
import useStrapiData from "./use-strapi-data";
import ApiProvider from "@/lib/axios-instance";
import { VehicleModel } from "@/types/vehicle";
import { toast } from "@/components/ui/use-toast";

export type VehicleDataProps = {
  name: string;
};

const useVehicle = () => {
  const { fetchData } = useStrapiData();
  const [vehicles, setVehicles] = useState<VehicleModel[]>();
  const [singleVehicle, setSingleVehicle] = useState<VehicleModel | null>(null);

  const getVehicles = async (): Promise<VehicleModel[]> => {
    try {
      const fetchedData: VehicleModel[] = await fetchData("/vehicles");
      setVehicles(fetchedData);
      return fetchedData;
    } catch (error) {
      throw error;
    }
  };

  const getVehicleById = async (id: number): Promise<VehicleModel> => {
    try {
      const fetchedData: VehicleModel[] = await fetchData(`/vehicles/${id}`);
      setSingleVehicle(fetchedData[0]);
      return fetchedData[0];
    } catch (error) {
      throw error;
    }
  };

  const insertVehicle = async (data: VehicleDataProps): Promise<void> => {
    try {
      await ApiProvider.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/vehicles`,
        data,
      );
      toast({
        variant: "default",
        title: "Erfolgreich gespeichert",
        description: "Fahrzeugedaten erfolgreich gespeichert",
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

  const updateVehicle = async (
    data: VehicleDataProps,
    id: number,
  ): Promise<void> => {
    try {
      await ApiProvider.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/vehicles/${id}`,
        data,
      );
      toast({
        variant: "default",
        title: "Erfolgreich gespeichert",
        description: "Fahrzeugedaten erfolgreich gespeichert",
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

  const deleteVehicle = async (id: number): Promise<void> => {
    try {
      await ApiProvider.delete(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/vehicles/${id}`,
      );
      toast({
        variant: "default",
        title: "Erfolgreich gelöscht",
        description: "Fahrzeugedaten erfolgreich gelöscht",
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
    getVehicles,
    getVehicleById,
    insertVehicle,
    updateVehicle,
    deleteVehicle,
    vehicles,
    singleVehicle,
  };
};

export default useVehicle;
