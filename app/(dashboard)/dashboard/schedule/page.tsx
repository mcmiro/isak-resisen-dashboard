"use client";
import BreadCrumb from "@/components/breadcrumb";
import OrderCard from "@/components/order-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const breadcrumbItems = [{ title: "Fahrplan", link: "/dashboard/schedule" }];
export default function Page() {
  const router = useRouter();

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex justify-between items-center">
          <BreadCrumb items={breadcrumbItems} />
          <Button
            className="text-xs md:text-sm"
            onClick={() => router.push(`/dashboard/orders/new`)}
          >
            <Plus className="mr-2 h-4 w-4" /> Neue Buchung
          </Button>
        </div>
        <OrderCard />
      </div>
    </ScrollArea>
  );
}
