"use client";
import { useEffect, useState } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { Order } from "@/components/tables/order-tables/order";
import useOrder from "@/hooks/use-order";
import useStrapiData from "@/hooks/use-strapi-data";
import { OrderModelWithId } from "@/types/order";

const breadcrumbItems = [{ title: "Buchungen", link: "/dashboard/order" }];
export default function Page() {
  const { getOrders, orders } = useOrder();
  const { handleOrderFromStrapi } = useStrapiData();

  const [parsedOrders, setParsedOrders] = useState<any>();

  useEffect(() => {
    getOrders();
  }, []);

  //useEffect(() => {
  //  if (orders) {
  //    const parsed = orders.map((order: OrderModelWithId) =>
  //      handleOrderFromStrapi(order),
  //    );
  //    console.log("orders", orders);
  //    console.log("parsed", parsed);
  //    setParsedOrders(parsed);
  //  }
  //}, [orders]);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        {orders && <Order data={orders} />}
      </div>
    </>
  );
}
