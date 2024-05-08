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
import useClient from "@/hooks/use-client";
import { ClientModel } from "@/types/client";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Bitte geben Sie einen gültigen Namen ein" }),
});

type ClientFormValues = z.infer<typeof formSchema>;

export const ClientForm: React.FC = () => {
  const { getClientById, singleClient, insertClient, updateClient } =
    useClient();
  const router = useRouter();
  const param = useParams<{ clientsId: string }>();
  const id: number | null =
    param.clientsId !== "new" ? parseInt(param.clientsId) : null;

  const { toast } = useToast();
  const [initialData, setInitialData] = useState<ClientModel | null>(null);
  const [loading, setLoading] = useState(false);
  const title = id ? "Kunden bearbeiten" : "Neuer Kunde";
  const description = id
    ? "Einen Kunden bearbeiten"
    : "Einen Kunden hinzufügen";
  const action = "Speichern";

  const defaultValues = {
    name: "",
  };

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    id !== null && getClientById(id);
  }, [id]);

  useEffect(() => {
    singleClient && setInitialData(singleClient);
  }, [singleClient]);

  useEffect(() => {
    initialData && form.reset(initialData);
  }, [initialData]);

  const onSubmit = async (data: ClientFormValues) => {
    try {
      setLoading(true);
      if (data) {
        !id ? insertClient(data) : updateClient(data, id);
        router.refresh();
        router.push(`/dashboard/clients`);
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
                      placeholder="Kundenname"
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
