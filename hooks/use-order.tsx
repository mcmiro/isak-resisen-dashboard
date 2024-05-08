"use client";

import { useState } from "react";
import useStrapiData from "./use-strapi-data";
import ApiProvider from "@/lib/axios-instance";
import { OrderModel } from "@/types/order";
import { toast } from "@/components/ui/use-toast";

const useOrder = () => {
  const { fetchData } = useStrapiData();
  const [orders, setOrders] = useState<OrderModel[]>();
  const [singleOrder, setSingleOrder] = useState<OrderModel | null>(null);

  const getOrders = async (): Promise<OrderModel[]> => {
    try {
      const fetchedData: OrderModel[] = await fetchData("/orders");
      setOrders(fetchedData);
      return fetchedData;
    } catch (error) {
      throw error;
    }
  };

  const getOrderById = async (id: number): Promise<OrderModel> => {
    try {
      const fetchedData: OrderModel[] = await fetchData(`/orders/${id}`);
      setSingleOrder(fetchedData[0]);
      return fetchedData[0];
    } catch (error) {
      throw error;
    }
  };

  const insertOrder = async (data: OrderModel): Promise<void> => {
    try {
      await ApiProvider.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders`,
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

  const updateOrder = async (data: OrderModel, id: number): Promise<void> => {
    try {
      await ApiProvider.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders/${id}`,
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

  const deleteOrder = async (id: number): Promise<void> => {
    try {
      await ApiProvider.delete(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders/${id}`,
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
    getOrders,
    getOrderById,
    insertOrder,
    updateOrder,
    deleteOrder,
    orders,
    singleOrder,
  };
};

export default useOrder;
