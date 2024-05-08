"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/datepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "../ui/textarea";
import { orderSchema, type OrderFormValues } from "@/lib/form-schema-order";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { paymentOptions, paymentStatus } from "@/constants/payment";
import useVehicle from "@/hooks/use-vehicle";
import useDriver from "@/hooks/use-driver";
import useClient from "@/hooks/use-client";
import useDate from "@/hooks/use-date";
import useOrder from "@/hooks/use-order";
import useStrapiData from "@/hooks/use-strapi-data";

const defaultValues = {
  vehicle: 0,
  driver: "",
  client: "",
  date: "",
  startTime: "",
  endTime: "",
  startLocation: "",
  endLocation: "",
  paymentOption: "",
  price: "",
  invoiceNumber: "",
  invoiceStatus: "",
  message: "",
};

export const CreateOrder: React.FC = () => {
  const router = useRouter();
  const { getVehicles, vehicles } = useVehicle();
  const { getDrivers, drivers } = useDriver();
  const { getClients, clients } = useClient();
  const { handleGermanDate } = useDate();
  const { insertOrder } = useOrder();
  const { handleOrderForStrapi } = useStrapiData();

  const [data, setData] = useState(defaultValues);
  const [date, setDate] = useState<Date | undefined>();
  const [initialData, setInitialData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<number>(0);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [invoiceStatus, setInvoiceStatus] = useState<string>("");

  const title = initialData ? "Buchung bearbeiten" : "Buchung eintragen";
  const description = initialData
    ? "Buchung bearbeiten"
    : "Bitte geben Sie alle Buchungsbezogen Informationen ein";

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    getVehicles();
    getDrivers();
    getClients();
  }, []);

  const handleVehicle = (id: number) => {
    form.setValue("vehicle", id);
    setSelectedVehicle(id);
  };

  const handlePaymentOption = (title: string) => {
    form.setValue("paymentOption", title);
    setSelectedPayment(title);
  };

  const handlePaymentStatus = (status: string) => {
    form.setValue("invoiceStatus", status);
    setInvoiceStatus(status);
  };

  const handleDate = (date: Date) => {
    form.setValue("date", handleGermanDate(date));
    form.trigger("date");
    setDate(date);
  };

  const onSubmit = async (data: OrderFormValues) => {
    processForm(data);
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/products/create-product`, data);
        // console.log("product", res);
      }
      router.refresh();
      router.push(`/dashboard/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const processForm: SubmitHandler<OrderFormValues> = (data) => {
    insertOrder(handleOrderForStrapi(data));
    console.log("data ==>", handleOrderForStrapi(data));
    //setData(data);
    // api call and reset
    // form.reset();
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {/*{initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}*/}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(processForm)} className="w-full">
          <div className={cn("md:inline-block w-full")}>
            <div className="flex flex-col gap-4 w-full overflow-x-auto h-20">
              <FormLabel>Fahrzeug</FormLabel>
              <div className="flex gap-2">
                {vehicles &&
                  vehicles?.map((vehicle, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedVehicle === vehicle.id ? "default" : "secondary"
                      }
                      onClick={() => handleVehicle(vehicle.id)}
                      type="button"
                    >
                      {vehicle.name}
                    </Button>
                  ))}
              </div>
            </div>
            <div className="mt-4">
              <FormField
                control={form.control}
                name={"date"}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Datum*</FormLabel>
                    <FormControl>
                      <DatePicker date={date} onSelect={handleDate} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Uhrzeit von</FormLabel>
                    <FormControl>
                      <Input placeholder="Bitte eingeben" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Uhrzeit bis</FormLabel>
                    <FormControl>
                      <Input placeholder="Bitte eingeben" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="startLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start</FormLabel>
                    <FormControl>
                      <Input placeholder="Bitte Adresse eingeben" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ziel</FormLabel>
                    <FormControl>
                      <Input placeholder="Bitte Adresse eingeben" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {drivers && (
            <div className="mt-4">
              <FormField
                control={form.control}
                name="driver"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fahrer</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Fahrer auswählen"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* @ts-ignore  */}
                        {drivers.map((driver) => (
                          <SelectItem
                            key={driver.id}
                            value={driver.id.toString()}
                          >
                            {driver.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {clients && (
            <div className="mt-4">
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kunde</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Kunden auswählen"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* @ts-ignore  */}
                        {clients.map((client) => (
                          <SelectItem
                            key={client.id}
                            value={client.id.toString()}
                          >
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <div className="md:flex gap-16 w-full mt-4">
            <div>
              <FormLabel>Zahlungsmethode</FormLabel>
              <div className="flex gap-2">
                {paymentOptions &&
                  paymentOptions?.map((payment, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedPayment === payment ? "default" : "secondary"
                      }
                      onClick={() => handlePaymentOption(payment)}
                      type="button"
                    >
                      {payment}
                    </Button>
                  ))}
              </div>
            </div>
            <div>
              <FormLabel>Rechnung Status</FormLabel>
              <div className="flex gap-2">
                {paymentStatus &&
                  paymentStatus?.map((status, index) => (
                    <Button
                      key={index}
                      variant={
                        status === invoiceStatus ? "default" : "secondary"
                      }
                      onClick={() => handlePaymentStatus(status)}
                      type="button"
                    >
                      {status}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preis</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Preis eingeben"
                      {...field}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="invoiceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rechnungsnummer</FormLabel>
                  <FormControl>
                    <Input placeholder="Rechnungsnummer eingeben" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nachricht</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Nachricht eingeben" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto mt-4" type="submit">
            Speichern
          </Button>
        </form>
      </Form>
    </>
  );
};
