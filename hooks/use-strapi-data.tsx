"use client";
import { AxiosResponse } from "axios";
import ApiProvider from "@/lib/axios-instance";
import { OrderModel } from "@/types/order";
import { OrderFormValues } from "@/lib/form-schema-order";

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

  async function fetchData<T>(route: string, params?: any): Promise<T> {
    try {
      const response: AxiosResponse<any> = await ApiProvider.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}${route}`,
        { params },
      );

      return flatStrapiObject(response.data.data) as T;
    } catch (error) {
      throw error;
    }
  }

  const handleOrderForStrapi = (order: OrderModel): OrderFormValues => {
    let parsedOrder: any = { ...order };

    for (const [key, value] of Object.entries(order)) {
      if (key === "date") {
        const dbDate = value.toString().split(".").reverse().join("-");
        parsedOrder.date = dbDate;
      }
      for (const [key, value] of Object.entries(order)) {
        if (key === "date") {
          const dbDate = value.toString().split(".").reverse().join("-");
          parsedOrder.date = dbDate;
        }
        if (key === "driver" && typeof value === "object" && value !== null) {
          parsedOrder.driver = value.id.toString();
        }
        if (key === "client" && typeof value === "object" && value !== null) {
          parsedOrder.client = value.id.toString();
        }
        if (key === "vehicle" && typeof value === "object" && value !== null) {
          //@ts-ignore
          parsedOrder.vehicle = parseInt(value.id);
        }
        if (key === "price" && typeof value === "string" && value === "") {
          //@ts-ignore
          parsedOrder.price = "0";
        }
      }
    }

    return parsedOrder;
  };

  const handleOrderFromStrapi = async (order: any): Promise<OrderModel> => {
    let parsedOrder = { ...order };
    for (const [key, value] of Object.entries(order)) {
      if (key === "driver" && value !== null) {
        parsedOrder.driver = {
          id: order.driver?.data?.id.toString(),
          name: order.driver?.data?.attributes?.name,
        };
      }
      if (key === "client" && value !== null) {
        parsedOrder.client = {
          id: order.client?.data?.id.toString(),
          name: order.client?.data?.attributes?.name,
        };
      }
      if (key === "vehicle" && value !== null) {
        parsedOrder.vehicle = {
          id: order.vehicle?.data?.id.toString(),
          name: order.vehicle?.data?.attributes?.name,
        };
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
