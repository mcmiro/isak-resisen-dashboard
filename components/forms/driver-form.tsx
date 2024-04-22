"use client";
import * as z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { useToast } from "../ui/use-toast";
import ApiProvider from "@/lib/axios-instance";
import useStrapiData from "@/hooks/useStrapiData";
import { DriverModel } from "@/types/driver";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Bitte geben Sie einen gültigen Namen ein" }),
});

type DriverFormValues = z.infer<typeof formSchema>;

export const DriverForm: React.FC = () => {
  const { fetchData } = useStrapiData();
  const router = useRouter();
  const param = useParams<{ driversId: string }>();
  const id: number | null =
    param.driversId !== "new" ? parseInt(param.driversId) : null;

  const { toast } = useToast();
  const [initialData, setInitialData] = useState<DriverModel | null>(null);
  const [loading, setLoading] = useState(false);
  const title = id ? "Chauffeur bearbeiten" : "Neuer Chauffeur";
  const description = id
    ? "Einen Chauffeur bearbeiten"
    : "Einen Chauffeur hinzufügen";
  const action = "Speichern";

  const defaultValues = {
    name: "",
  };

  const form = useForm<DriverFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const fetchedData: DriverModel[] = await fetchData(`/drivers/${id}`);
        setInitialData(fetchedData[0]);
      } catch (error) {
        throw error;
      }
    };

    id !== null && fetchDataAsync();
  }, [id]);

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData]);

  const onSubmit = async (data: DriverFormValues) => {
    try {
      setLoading(true);
      if (data) {
        !id
          ? await ApiProvider.post(
              `${process.env.NEXT_PUBLIC_STRAPI_URL}/drivers`,
              data,
            ).then((response) => {})
          : await ApiProvider.put(
              `${process.env.NEXT_PUBLIC_STRAPI_URL}/drivers/${id}`,
              data,
            ).then((response) => {});
        toast({
          variant: "default",
          title: "Erfolgreich gespeichert",
          description: "Chauffeuredaten erfolgreich gespeichert",
        });
        router.refresh();
        router.push(`/dashboard/drivers`);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ups! Etwas ist schiefgegangen.",
        description: "Es gab ein Problem mit Ihrer Anfrage.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Chauffeur name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
