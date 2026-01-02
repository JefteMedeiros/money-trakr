"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, ChevronUp } from "lucide-react";
import { categoryEquivalent } from "@/@types/expense";
import type { SelectExpense } from "@/db/schemas/expenses";
import { cn, moneyFormatter } from "@/lib/utils";
import { DeleteExpense } from "../delete-expense";
import { EditExpense } from "../edit-expense";
import { Badge } from "../ui/glass/badge";

export const columns: ColumnDef<SelectExpense>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => {
      return <Badge glow>{categoryEquivalent[row.original.category]}</Badge>;
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      const sorted = column.getIsSorted();

      return (
        <button
          className="flex items-center gap-2 hover:cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          {sorted ? (
            <ChevronUp
              className={cn("ml-2 h-4 w-4 transition-all", {
                "rotate-180": sorted === "asc",
              })}
            />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          )}
        </button>
      );
    },
    cell: ({ row }) => {
      return <div>{moneyFormatter(row.original.value)}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      return (
        <button
          className="flex items-center gap-2 hover:cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de criação
          {sorted ? (
            <ChevronUp
              className={cn("ml-2 h-4 w-4 transition-all", {
                "rotate-180": sorted === "asc",
              })}
            />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          )}
        </button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {new Date(row.original.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "isUnique",
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      return (
        <button
          className="flex items-center gap-2 hover:cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          {sorted ? (
            <ChevronUp
              className={cn("ml-2 h-4 w-4 transition-all", {
                "rotate-180": sorted === "asc",
              })}
            />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          )}
        </button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-4 items-center justify-between">
          <Badge glow>{row.original.isUnique ? "Única" : "Recorrente"}</Badge>
          <div className="flex items-center gap-2">
            <EditExpense expense={row.original} />
            <DeleteExpense id={row.original.id} />
          </div>
        </div>
      );
    },
  },
];
