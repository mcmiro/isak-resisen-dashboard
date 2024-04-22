"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { VehicleModel } from "@/types/vehicle";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

interface ProductsVehicleProps {
  data: VehicleModel[];
}

export const Vehicle: React.FC<ProductsVehicleProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Fahrzeuge (${data.length})`}
          description="Fahrzeuge verwalten"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/vehicles/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Neues Fahrzeug
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
