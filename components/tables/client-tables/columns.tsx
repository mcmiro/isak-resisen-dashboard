"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ClientModel } from "@/constants/data";

export const columns: ColumnDef<ClientModel>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "NAME",
    enableSorting: true,
    enableHiding: false,
  },
  {
    header: "AKTIONEN",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
