import { getExpenseList } from "@/actions/get_expense_list";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  queryParams: string;
}

export async function ExpenseTable({ queryParams }: Props) {
  const totalExpenses = await getExpenseList(queryParams);

  return <DataTable columns={columns} data={totalExpenses} />;
}
