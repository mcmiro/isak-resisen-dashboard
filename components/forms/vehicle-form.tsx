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
import useVehicle from "@/hooks/use-vehicle";
import { VehicleModel } from "@/types/vehicle";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Bitte geben Sie einen gültigen Namen ein" }),
});

type VehicleFormValues = z.infer<typeof formSchema>;

export const VehicleForm: React.FC = () => {
  const { getVehicleById, singleVehicle, insertVehicle, updateVehicle } =
    useVehicle();
  const router = useRouter();
  const param = useParams<{ vehiclesId: string }>();
  const id: number | null =
    param.vehiclesId !== "new" ? parseInt(param.vehiclesId) : null;

  const [initialData, setInitialData] = useState<VehicleModel | null>(null);
  const [loading, setLoading] = useState(false);
  const title = id ? "Fahrzeug bearbeiten" : "Neues Fahrzeug";
  const description = id
    ? "Einen Fahrzeug bearbeiten"
    : "Einen Fahrzeug hinzufügen";
  const action = "Speichern";

  const defaultValues = {
    name: "",
  };

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    id !== null && getVehicleById(id);
  }, [id]);

  useEffect(() => {
    singleVehicle && setInitialData(singleVehicle);
  }, [singleVehicle]);

  useEffect(() => {
    initialData && form.reset(initialData);
  }, [initialData]);

  const onSubmit = async (data: VehicleFormValues) => {
    try {
      setLoading(true);
      if (data) {
        !id ? insertVehicle(data) : updateVehicle(data, id);
        router.refresh();
        router.push(`/dashboard/vehicles`);
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
                      placeholder="Fahrzeug name"
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
