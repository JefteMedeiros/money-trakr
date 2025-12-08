import { getExpense } from "@/actions/get_expense";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
	queryParams: string;
}

export async function ExpenseTable({ queryParams }: Props) {
	const totalExpenses = await getExpense(queryParams);

	return <DataTable columns={columns} data={totalExpenses} />;
}
