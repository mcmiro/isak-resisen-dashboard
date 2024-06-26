"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DriverModel } from "@/types/driver";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

interface ProductsDriverProps {
  data: DriverModel[];
}

export const Driver: React.FC<ProductsDriverProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Chauffeure (${data.length})`}
          description="Chauffeure verwalten"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/drivers/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Neuer Chauffeur
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
