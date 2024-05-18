"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { OrderModel } from "@/types/order";
import { handleGermanDate, handleGermanSummary } from "@/lib/parse-data-german";

export const columns: ColumnDef<OrderModel>[] = [
  {
    accessorKey: "date",
    header: "DATUM",
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => (
      <span className="block min-w-[120px]">
        {handleGermanDate(row.original.date)}
      </span>
    ),
  },
  {
    accessorKey: "client.name",
    header: "Kunde",
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => (
      <span className="block min-w-[120px]">{row.original.client?.name}</span>
    ),
  },
  {
    accessorKey: "startLocation",
    enableSorting: false,
    enableHiding: false,
    header: "FAHRT",
    cell: ({ row }) => (
      <span className="dark:text-zinc-400 min-w-[120px] block">
        {row.original.startLocation}
        <br></br> {row.original.endLocation}
      </span>
    ),
  },
  {
    accessorKey: "invoiceNumber",
    enableSorting: true,
    enableHiding: false,
    header: "RECHNUNG",
    cell: ({ row }) => (
      <div className="dark:text-white light:text-zinc-400 min-w-[160px]">
        <div className={`py-1 rounded-full`}>
          <span
            className={`inline-flex items-center rounded-lg py-1 md:py-2 font-semibold dark:text-white text-zinc-900 border-zinc-400`}
          >
            {row.original.invoiceNumber
              ? row.original.invoiceNumber
              : "Keine Rechnung"}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "invoiceStatus",
    enableSorting: true,
    enableHiding: false,
    header: "STATUS",
    cell: ({ row }) => (
      <div className="dark:text-white light:text-zinc-400 min-w-[100px]">
        <div className={`py-1 rounded-full`}>
          <span
            className={`inline-flex items-center rounded-lg py-1 md:py-2 font-semibold dark:text-white text-zinc-900 border-zinc-400`}
          >
            {row.original.invoiceStatus === ""
              ? "Offen"
              : row.original.invoiceStatus}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "price",
    enableSorting: true,
    enableHiding: false,
    header: "Preis",
    cell: ({ row }) => (
      <div className="dark:text-white text-zinc-900 min-w-[120px]">
        <div className="mt-1">
          {row.original.price && <span> € {row.original.price} </span>}
          {row.original.paymentOption && (
            <span>({row.original.paymentOption})</span>
          )}
        </div>
      </div>
    ),
  },
  {
    header: "AKTIONEN",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <CellAction data={row.original} />
      </div>
    ),
  },
];
