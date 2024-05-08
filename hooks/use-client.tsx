"use client";

import { useState } from "react";
import useStrapiData from "./use-strapi-data";
import ApiProvider from "@/lib/axios-instance";
import { ClientModel } from "@/types/client";
import { toast } from "@/components/ui/use-toast";

export type ClientDataProps = {
  name: string;
};

const useClient = () => {
  const { fetchData } = useStrapiData();
  const [clients, setClients] = useState<ClientModel[]>();
  const [singleClient, setSingleClient] = useState<ClientModel | null>(null);

  const getClients = async (): Promise<ClientModel[]> => {
    try {
      const fetchedData: ClientModel[] = await fetchData("/clients");
      setClients(fetchedData);
      return fetchedData;
    } catch (error) {
      throw error;
    }
  };

  const getClientById = async (id: number): Promise<ClientModel> => {
    try {
      const fetchedData: ClientModel[] = await fetchData(`/clients/${id}`);
      setSingleClient(fetchedData[0]);
      return fetchedData[0];
    } catch (error) {
      throw error;
    }
  };

  const insertClient = async (data: ClientDataProps): Promise<void> => {
    try {
      await ApiProvider.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/clients`,
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

  const updateClient = async (
    data: ClientDataProps,
    id: number,
  ): Promise<void> => {
    try {
      await ApiProvider.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/clients/${id}`,
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

  const deleteClient = async (id: number): Promise<void> => {
    try {
      await ApiProvider.delete(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/clients/${id}`,
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
    getClients,
    getClientById,
    insertClient,
    updateClient,
    deleteClient,
    clients,
    singleClient,
  };
};

export default useClient;
