"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { categoryEquivalent } from "@/@types/expense";
import type { SelectExpense } from "@/db/schemas/expenses";
import { moneyFormatter } from "@/lib/utils";
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
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:underline"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      return <div>{moneyFormatter(row.original.value)}</div>;
    },
  },
  {
    accessorKey: "data",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:underline"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de criação
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:underline"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-4 items-center justify-between">
          <span>{row.original.isUnique ? "Única" : "Recorrente"}</span>
          <div className="flex items-center gap-2">
            <EditExpense expense={row.original} />
            <DeleteExpense id={row.original.id} />
          </div>
        </div>
      );
    },
  },
];
