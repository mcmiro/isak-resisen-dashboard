"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ClientModel } from "@/types/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

interface ProductsClientProps {
  data: ClientModel[];
}

export const Client: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Kunden (${data.length})`}
          description="Kunden verwalten"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/clients/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Neuer Kunde
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
