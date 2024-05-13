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
      <>
        <span>{handleGermanDate(row.original.date)}</span>
      </>
    ),
  },
  {
    accessorKey: "startLocation",
    enableSorting: false,
    enableHiding: false,
    header: "FAHRT",
    cell: ({ row }) => (
      <span className="text-xs dark:text-zinc-400">
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
      <div className="text-xs dark:text-white light:text-zinc-400">
        <div className={`py-1 rounded-full`}>
          <span
            className={`inline-flex items-center rounded-lg py-1 md:py-2 text-[8px] md:text-sm font-semibold dark:text-white text-zinc-900 border-zinc-400`}
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
      <div className="text-xs dark:text-white light:text-zinc-400">
        <div className={`py-1 rounded-full`}>
          <span
            className={`inline-flex items-center rounded-lg py-1 md:py-2 text-[8px] md:text-sm font-semibold dark:text-white text-zinc-900 border-zinc-400`}
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
      <div className="text-xs dark:text-white text-zinc-900">
        <div className="mt-1">
          {row.original.price && (
            <span>
              {" "}
              {handleGermanSummary.format(parseInt(row.original.price))}{" "}
            </span>
          )}
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
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
