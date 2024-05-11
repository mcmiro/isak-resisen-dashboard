"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import useOrder from "@/hooks/use-order";
import { useEffect, useState } from "react";

export const Order: React.FC = () => {
  const router = useRouter();
  const { getOrders, orders } = useOrder();

  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  useEffect(() => {
    getOrders(page, pageSize);
  }, [page]);

  return (
    <>
      {orders?.length && (
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between">
            <Heading
              title={`Buchungen (${orders.length})`}
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
          <DataTable searchKey="date" columns={columns} data={orders} />
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Vorherige
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={orders.length < pageSize}
              >
                Nächste
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
