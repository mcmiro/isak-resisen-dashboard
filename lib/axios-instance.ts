import { toast } from "@/components/ui/use-toast";
import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL;

const ApiProvider = () => {
  const defaultOptions: AxiosRequestConfig = {
    baseURL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session) {
      const jwt = localStorage.getItem("jwt");
      config.headers.Authorization = `Bearer ${jwt}`;
    }

    // special handling for strapi
    config.data = { data: { ...config.data } };
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      // Handle successful responses here
      //toast({
      //  variant: "default",
      //  title: "Erfolgreich gespeichert",
      //  description: "Objekt erfolgreich gespeichert",
      //});
      return response;
    },
    (error) => {
      // Handle errors here
      //toast({
      //  variant: "destructive",
      //  title: "Ups! Etwas ist schiefgegangen.",
      //  description: "Es gab ein Problem mit Ihrer Anfrage.",
      //});
      return Promise.reject(error);
    },
  );

  return instance;
};

export default ApiProvider();
