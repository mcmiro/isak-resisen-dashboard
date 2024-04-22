"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClientModel } from "@/constants/data";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import ApiProvider from "@/lib/axios-instance";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: ClientModel;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    await ApiProvider.delete(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/clients/${data.id}`,
    ).then((response) => {
      if (response) {
        location.reload();
      }
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Aktion</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/clients/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Bearbeiten
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Löschen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
