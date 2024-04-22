"use client";
import { AxiosResponse } from "axios";
import ApiProvider from "@/lib/axios-instance";

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

  return {
    flatStrapiObject,
    fetchData,
  };
};

export default useStrapiData;
