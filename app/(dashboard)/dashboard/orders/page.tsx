"use client";
import { useEffect } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { Order } from "@/components/tables/order-tables/order";
import useOrder from "@/hooks/use-order";

const breadcrumbItems = [{ title: "Buchungen", link: "/dashboard/order" }];
export default function Page() {
  const { getOrders, orders } = useOrder();

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        {orders && <Order data={orders} />}
      </div>
    </>
  );
}
