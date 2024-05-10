"use client";
import { AxiosResponse } from "axios";
import ApiProvider from "@/lib/axios-instance";
import { OrderModel, OrderModelWithId } from "@/types/order";

const useStrapiData = () => {
  const flatStrapiObject = (data: any) => {
    let dataArray = [];
    if (Array.isArray(data)) {
      dataArray = data;
    } else if (typeof data === "object") {
      dataArray = [data];
    } else {
      throw new Error(
        "Input data must be an array of objects or a single object",
      );
    }

    const flattenedData = dataArray.map((item) => {
      if (typeof item !== "object") {
        throw new Error("Each item in the array must be an object");
      }
      const { id, attributes } = item;
      return { id, ...attributes };
    });
    return flattenedData;
  };

  async function fetchData<T>(route: string): Promise<T> {
    try {
      const response: AxiosResponse<any> = await ApiProvider.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}${route}`,
      );

      return flatStrapiObject(response.data.data) as T;
    } catch (error) {
      throw error;
    }
  }

  const handleOrderForStrapi = (order: OrderModel) => {
    let parsedOrder = { ...order };
    for (const [key, value] of Object.entries(order)) {
      if (key === "date") {
        const dbDate = value.toString().split(".").reverse().join("-");
        parsedOrder.date = dbDate;
      }
    }
    return parsedOrder;
  };

  const handleOrderFromStrapi = async (
    order: any,
  ): Promise<OrderModelWithId> => {
    let parsedOrder = { ...order };
    for (const [key, value] of Object.entries(order)) {
      if (key === "driver" && value !== null) {
        parsedOrder.driver = order.driver?.data?.id.toString();
      }
      if (key === "client" && value !== null) {
        parsedOrder.client = order.client?.data?.id.toString();
      }
      if (key === "vehicle" && value !== null) {
        parsedOrder.vehicle = order.vehicle?.data?.id;
      }
    }
    return parsedOrder;
  };

  return {
    flatStrapiObject,
    fetchData,
    handleOrderForStrapi,
    handleOrderFromStrapi,
  };
};

export default useStrapiData;
