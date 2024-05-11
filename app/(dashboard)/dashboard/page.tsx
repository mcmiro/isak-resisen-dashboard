"use client";
import { RecentSales } from "@/components/recent-sales";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VehicleMatrix from "@/components/vehicle-matrix";
import { Icons } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useClient from "@/hooks/use-client";
import useVehicle from "@/hooks/use-vehicle";
import useDriver from "@/hooks/use-driver";
import useOrder from "@/hooks/use-order";
import useDate from "@/hooks/use-date";
import { OrderModelWithId } from "@/types/order";
import { VehicleModel } from "@/types/vehicle";
import { addMonths, getYear, format } from "date-fns";
import { de } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Page() {
  const { getClients, clients } = useClient();
  const { getVehicles, vehicles } = useVehicle();
  const { getDrivers, drivers } = useDriver();
  const { getOrders, orders, handleTodaysOrders, handleCurrentMonthOrders } =
    useOrder();
  const { handleGermanDate } = useDate();

  const { data: session } = useSession();
  useEffect(() => {
    //@ts-ignore
    session?.jwt && localStorage.setItem("jwt", session?.jwt);
  }, [session]);

  const [vehicleMatrix, setVehicleMatrix] = useState<VehicleModel[]>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDayRow = (vehicles: VehicleModel[]) => {
    if (vehicles) {
      setVehicleMatrix([{ id: 0, name: "Tage" }, ...vehicles]);
    }
  };

  useEffect(() => {
    getClients();
    getVehicles();
    getDrivers();
    getOrders();
  }, []);

  useEffect(() => {
    vehicles && handleDayRow(vehicles);
  }, [vehicles]);

  const IconProfile = Icons.profile;
  const IconBus = Icons.bus;
  const IconOrder = Icons.ticket;

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          {session && (
            <h2 className="text-3xl font-bold tracking-tight">
              Hallo {session.user?.name} 👋
            </h2>
          )}
          <div className="flex items-center gap-2 m-6">
            <Button
              onClick={() => setSelectedDate(addMonths(selectedDate, -1))}
              variant="outline"
              size="icon"
              className="h-7 w-7"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Nächstes Monat</span>
            </Button>
            <h3 className="flex-1 shrink-0 whitespace-nowrap text-md font-semibold tracking-tight sm:grow-0">
              {format(selectedDate, "LLLL", { locale: de })} -{" "}
              {getYear(selectedDate)}
            </h3>
            <Button
              onClick={() => setSelectedDate(addMonths(selectedDate, 1))}
              variant="outline"
              size="icon"
              className="h-7 w-7"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Vorheriges Monat</span>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Statistik</TabsTrigger>
            <TabsTrigger value="plan">Plan</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {clients?.length && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Kunden gesamt
                    </CardTitle>
                    <IconProfile className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{clients.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Anzahl der angelegten Kunden
                    </p>
                  </CardContent>
                </Card>
              )}
              {drivers?.length && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Fahrer
                    </CardTitle>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-4 text-muted-foreground"
                    >
                      <path d="M13.7,12.1h2.7c2.7,0,4.9,2.2,4.9,4.9v6" />
                      <path d="M2.7,23c0-1.8,0-6,0-6c0-2.7,2.2-4.9,4.9-4.9h2.7" />
                      <polyline points="12,22.8 14.3,12.7 12,10.6 9.7,12.7 12,22.8 	" />
                      <circle cx="12" cy="5.7" r="4.7" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{drivers.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Anzahl der angelegten Fahrer
                    </p>
                  </CardContent>
                </Card>
              )}
              {vehicles?.length && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Fahrzeuge
                    </CardTitle>
                    <IconBus className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{vehicles.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Anzahl der angelegten Fahrzeugen
                    </p>
                  </CardContent>
                </Card>
              )}
              {orders?.length && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Offene Buchungen
                    </CardTitle>
                    <IconOrder className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {
                        orders?.filter(
                          (el: OrderModelWithId) =>
                            el.invoiceStatus !== "Bezahlt",
                        ).length
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Anzahl der offenen Buchungen
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Übersicht</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          setSelectedDate(addMonths(selectedDate, -1))
                        }
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Nächstes Monat</span>
                      </Button>
                      <h3 className="flex-1 shrink-0 whitespace-nowrap text-md font-semibold tracking-tight sm:grow-0">
                        {format(selectedDate, "LLLL", { locale: de })} -{" "}
                        {getYear(selectedDate)}
                      </h3>
                      <Button
                        onClick={() =>
                          setSelectedDate(addMonths(selectedDate, 1))
                        }
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Vorheriges Monat</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-2">
                  {orders?.length && vehicleMatrix?.length && (
                    <VehicleMatrix
                      orders={orders}
                      vehicles={vehicleMatrix}
                      date={selectedDate}
                    />
                  )}
                </CardContent>
              </Card>
              <div className="col-span-4 md:col-span-3">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>
                      Buchungen für heute {handleGermanDate(new Date())}
                    </CardTitle>
                    <CardDescription>
                      Sie haben diesen Monat{" "}
                      {orders && handleCurrentMonthOrders(orders).length}{" "}
                      Verkäufe getätigt.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {orders?.length ? (
                      <RecentSales orders={handleTodaysOrders(orders)} />
                    ) : (
                      <div>Keine ergebnisse</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="plan" className="space-y-4">
            <div>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Übersicht</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          setSelectedDate(addMonths(selectedDate, -1))
                        }
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Nächstes Monat</span>
                      </Button>
                      <h3 className="flex-1 shrink-0 whitespace-nowrap text-md font-semibold tracking-tight sm:grow-0">
                        {format(selectedDate, "LLLL", { locale: de })} -{" "}
                        {getYear(selectedDate)}
                      </h3>
                      <Button
                        onClick={() =>
                          setSelectedDate(addMonths(selectedDate, 1))
                        }
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Vorheriges Monat</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-2">
                  {orders?.length && vehicleMatrix?.length && (
                    <VehicleMatrix
                      orders={orders}
                      vehicles={vehicleMatrix}
                      date={selectedDate}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
