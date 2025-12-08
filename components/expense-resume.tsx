"use client";

import { useLocalStorage } from "usehooks-ts";
import type { SelectExpense } from "@/db/schemas/expenses";
import { cn, moneyFormatter } from "@/lib/utils";
import { PlannedExpenses } from "./planned-expenses";

interface Props {
	totalExpenses: SelectExpense[];
}

export function ExpenseResume({ totalExpenses }: Props) {
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
		<nav className="snap-x snap-mandatory flex gap-8 max-w-[90%] xl:max-w-[1260px] -my-12 mx-auto overflow-auto custom-scroll pb-2">
			<div className="snap-start flex flex-col items-start shrink-0 w-64 md:flex-1 md:w-full justify-center gap-4 bg-gray-700 rounded-md h-32 md:h-36 p-6">
				<span className="text-white">Total planejado</span>
				<div className="flex items-center gap-2">
					<p className="font-bold text-2xl md:text-3xl text-white">
						{moneyFormatter(plannedExpenseValue)}
					</p>
					<PlannedExpenses
						handlePlannedExpenses={handlePlannedExpenses}
						plannedExpenses={plannedExpenseValue}
					/>
				</div>
			</div>
			<div className="snap-start flex flex-col items-start shrink-0 w-64 md:flex-1 md:w-full justify-center gap-4 bg-gray-700 rounded-md h-32 md:h-36 p-6">
				<span className="text-white">Total gasto</span>
				<p
					className={cn("font-bold text-2xl md:text-3xl text-white", {
						"text-green-500": totalSpent > plannedExpenseValue / 3,
						"text-red-500": totalSpent > plannedExpenseValue,
					})}
				>
					{moneyFormatter(totalSpent)}
				</p>
			</div>
			<div className="snap-start flex flex-col items-start shrink-0 w-64 md:flex-1 md:w-full justify-center gap-4 bg-gray-700 rounded-md h-32 md:h-36 p-6">
				<span className="text-white">Total restante</span>
				<p
					className={cn("font-bold text-2xl md:text-3xl text-white", {
						"text-green-500": remainingValue > 0,
						"text-red-500": remainingValue < 0,
					})}
				>
					{moneyFormatter(remainingValue)}
				</p>
			</div>
		</nav>
	);
}
