"use client";
import BreadCrumb from "@/components/breadcrumb";
import { Order } from "@/components/tables/order-tables/order";

const breadcrumbItems = [{ title: "Buchungen", link: "/dashboard/order" }];
export default function Page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <Order />
      </div>
    </>
  );
}
