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
import useDriver from "@/hooks/use-driver";
import { DriverModel } from "@/types/driver";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Bitte geben Sie einen gültigen Namen ein" }),
});

type DriverFormValues = z.infer<typeof formSchema>;

export const DriverForm: React.FC = () => {
  const { getDriverById, singleDriver, insertDriver, updateDriver } =
    useDriver();
  const router = useRouter();
  const param = useParams<{ driversId: string }>();
  const id: number | null =
    param.driversId !== "new" ? parseInt(param.driversId) : null;

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
    id !== null && getDriverById(id);
  }, [id]);

  useEffect(() => {
    singleDriver && setInitialData(singleDriver);
  }, [singleDriver]);

  useEffect(() => {
    initialData && form.reset(initialData);
  }, [initialData]);

  const onSubmit = async (data: DriverFormValues) => {
    try {
      setLoading(true);
      if (data) {
        !id ? insertDriver(data) : updateDriver(data, id);
        router.refresh();
        router.push(`/dashboard/drivers`);
      }
    } catch (error) {
      console.log(error);
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
