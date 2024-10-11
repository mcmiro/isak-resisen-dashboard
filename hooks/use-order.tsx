"use client";

import { useState } from "react";
import useStrapiData from "./use-strapi-data";
import ApiProvider from "@/lib/axios-instance";
import { OrderModel } from "@/types/order";
import { toast } from "@/components/ui/use-toast";
import { VehicleModel } from "@/types/vehicle";
import { removeLeadingZerosFromDate } from "@/lib/parse-data-german";

const useOrder = () => {
  const { fetchData, handleOrderFromStrapi } = useStrapiData();
  const [orders, setOrders] = useState<OrderModel[]>();
  const [nextPageAvailable, setNextPageAvailable] = useState<boolean>(true);
  const [singleOrder, setSingleOrder] = useState<OrderModel | null>(null);

  const getOrders = async (
    page?: number,
    pageSize?: number,
    searchString?: string,
  ): Promise<OrderModel[]> => {
    try {
      let params = {
        "populate[0]": "driver",
        "populate[1]": "vehicle",
        "populate[2]": "client",
        "populate[3]": "createdBy",
        "populate[4]": "updatedBy",
        "pagination[pageSize]": pageSize ? pageSize : "2000",
        "pagination[page]": page ? page : 0,
        sort: "date:DESC",
        "filters[client][name][$containsi]": searchString,
      };

      const fetchedData: any = await fetchData("/orders?", params);

      const parsedOrders = fetchedData.map((order: any) => {
        const client = {
          id: order?.client?.data?.id,
          name: order?.client?.data?.attributes?.name,
        };
        const driver = {
          id: order?.driver?.data?.id,
          name: order?.driver?.data?.attributes?.name,
        };
        const vehicle = {
          id: order?.vehicle?.data?.id,
          name: order?.vehicle?.data?.attributes?.name,
        };
        const createdBy = {
          id: order?.createdBy?.data?.id,
          name: order?.createdBy?.data?.attributes?.firstname,
        };
        const updatedBy = {
          id: order?.updatedBy?.data?.id,
          name: order?.updatedBy?.data?.attributes?.firstname,
        };

        return {
          ...order,
          client: client.id !== undefined ? client : null,
          driver: driver.id !== undefined ? driver : null,
          vehicle: vehicle.id !== undefined ? vehicle : null,
          createdBy: createdBy.id !== undefined ? createdBy : null,
          updatedBy: updatedBy.id !== undefined ? updatedBy : null,
        };
      });

      parsedOrders.length && setOrders(parsedOrders);
      !parsedOrders.length && setNextPageAvailable(false);

      return fetchedData;
    } catch (error) {
      throw error;
    }
  };

  const getOrderById = async (id: number): Promise<OrderModel> => {
    try {
      const fetchedData: OrderModel[] = await fetchData(
        `/orders/${id}?populate[0]=driver&populate[1]=vehicle&populate[2]=client`,
      );
      const parsedOrder = handleOrderFromStrapi(fetchedData[0]);
      setSingleOrder(await parsedOrder);
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

  const handleCurrentMonthOrders = (orders: OrderModel[]) => {
    const currentMonthOrders = orders.filter((el: OrderModel) => {
      const today = new Date();
      const orderDate = new Date(el.date);
      return (
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
      );
    });

    return currentMonthOrders;
  };

  const handleTodaysOrders = (orders: OrderModel[]) => {
    const todaysOrders = orders.filter((el: OrderModel) => {
      const today = new Date();
      const orderDate = new Date(el.date);
      return orderDate.toDateString() === today.toDateString();
    });

    return todaysOrders;
  };

  const handleDailyOrdersWithVehicle = (
    orders: OrderModel[],
    vehicle: VehicleModel,
    date: string,
  ) => {
    const currentDate = date;
    const isTodaysOrder = orders.filter((el: OrderModel) => {
      const orderDate = el.date;

      return (
        vehicle.name === el?.vehicle?.name &&
        removeLeadingZerosFromDate(orderDate) ===
          removeLeadingZerosFromDate(currentDate)
      );
    });

    return isTodaysOrder.length && true;
  };

  return {
    getOrders,
    getOrderById,
    insertOrder,
    updateOrder,
    deleteOrder,
    handleTodaysOrders,
    handleCurrentMonthOrders,
    handleDailyOrdersWithVehicle,
    orders,
    nextPageAvailable,
    setNextPageAvailable,
    singleOrder,
  };
};

export default useOrder;
