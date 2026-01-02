"use client";

import { useLocalStorage } from "usehooks-ts";
import type { SelectExpense } from "@/db/schemas/expenses";
import { EditPlannedExpenses } from "./planned-expenses";
import { Card, CardContent } from "@/components/ui/glass/card";
import { cn, moneyFormatter } from "@/lib/utils";
import { TrendingDown, TrendingUp, Wallet2 } from "lucide-react";

interface Props {
  totalExpenses: SelectExpense[];
}

export function ExpenseStats({ totalExpenses }: Props) {
  const [plannedExpenseValue, setPlannedExpenseValue] = useLocalStorage(
    "plannedExpenseValue",
    0,
    { initializeWithValue: false },
  );

  const handlePlannedExpenses = (value: number) => {
    setPlannedExpenseValue(value);
  };

  const totalSpent = totalExpenses.reduce(
    (acc, expense) => acc + expense.value,
    0,
  );

  const remainingValue = plannedExpenseValue - totalSpent;

  return (
    <nav className="snap-x snap-mandatory flex gap-4 max-w-[90%] xl:max-w-315 -my-12 mx-auto overflow-auto custom-scroll">
      <Card className="snap-start shrink-0 w-64 md:flex-1 md:w-full h-32 md:h-36">
        <CardContent className="flex flex-col items-start justify-center gap-1.5">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-muted-foreground">Total planejado</p>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-foreground/10 p-2">
                <Wallet2 className="h-4 w-4 text-foreground" />
              </div>
              <EditPlannedExpenses
                handlePlannedExpenses={handlePlannedExpenses}
                plannedExpenses={plannedExpenseValue}
              />
            </div>
          </div>
          <p className="font-bold text-2xl md:text-3xl text-white">
            {moneyFormatter(plannedExpenseValue)}
          </p>
        </CardContent>
      </Card>
      <Card className="snap-start shrink-0 w-64 md:flex-1 md:w-full h-32 md:h-36">
        <CardContent className="flex flex-col items-start justify-center gap-1.5">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-muted-foreground">Total gasto</p>
            <div className="rounded-full bg-destructive/10 p-2">
              <TrendingDown className="h-4 w-4 text-destructive" />
            </div>
          </div>
          <div className="space-y-1">
            <p
              className={cn("font-bold text-2xl md:text-3xl text-white", {
                "text-green-500": totalSpent > plannedExpenseValue / 3,
                "text-red-500": totalSpent > plannedExpenseValue,
              })}
            >
              {moneyFormatter(totalSpent)}
            </p>
            <p className="text-xs text-muted-foreground">
              {((totalSpent / plannedExpenseValue) * 100).toFixed(1)}% do
              planejado
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="snap-start shrink-0 w-64 md:flex-1 md:w-full h-32 md:h-36">
        <CardContent className="flex flex-col items-start justify-center gap-1.5">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-muted-foreground">Total restante</p>
            <div className="rounded-full bg-destructive/10 p-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h2
              className={cn("text-3xl font-bold tracking-tight text-white", {
                "text-emerald-500": remainingValue > 0,
                "text-red-500": remainingValue < 0,
              })}
            >
              {moneyFormatter(remainingValue)}
            </h2>
            <p className="text-xs text-muted-foreground">
              {((remainingValue / plannedExpenseValue) * 100).toFixed(1)}%
              disponível
            </p>
          </div>
        </CardContent>
      </Card>
    </nav>
  );
}
