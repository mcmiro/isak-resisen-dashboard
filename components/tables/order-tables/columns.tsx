"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { OrderModelWithId } from "@/types/order";
import { handleGermanDate, handleGermanSummary } from "@/lib/parse-data-german";

export const columns: ColumnDef<OrderModelWithId>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
    enableHiding: false,
  },
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
        <div
          className={`text-center max-w-[120px] px-6 py-1 rounded-full
					${
            row.original.invoiceNumber && row.original.invoiceStatus === "Offen"
              ? "bg-red-500"
              : ""
          }
					${
            row.original.invoiceNumber &&
            row.original.invoiceStatus === "Bezahlt"
              ? "bg-cyan-500"
              : ""
          }
					${
            !row.original.invoiceNumber
              ? "border border-zinc-400 light:text-zinc-400 dark:text-zinc-400"
              : ""
          }
					`}
        >
          {row.original.invoiceNumber ? (
            <span className="block">{row.original.invoiceNumber}</span>
          ) : (
            <span className="block">Keine Rechnung</span>
          )}
        </div>
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
