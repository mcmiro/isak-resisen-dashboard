"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderModelWithId } from "@/types/order";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

interface OrderProps {
  data: OrderModelWithId[];
}

export const Order: React.FC<OrderProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Buchungen (${data.length})`}
          description="Buchungen verwalten"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/orders/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Neue Buchung
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="date" columns={columns} data={data} />
    </>
  );
};
