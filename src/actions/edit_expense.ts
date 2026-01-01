"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { expenseSchema } from "@/@types/expense";
import { db } from "@/db/db";
import { expenses, type SelectExpense } from "@/db/schemas/expenses";
import { authClient } from "@/lib/auth-client";

export async function editExpense(prevState: any, formData: SelectExpense) {
  const { data: session } = await authClient.getSession();

  if (!session) {
    return redirect("/signin");
  }

  const validFormData = expenseSchema.safeParse(formData);

  if (!validFormData.success) {
    return {
      message: "Invalid form data.",
    };
  }

  await db
    .update(expenses)
    .set(formData)
    .where(
      and(eq(expenses.id, formData.id), eq(expenses.userId, session.user.id)),
    );

  revalidatePath("/");

  return {
    message: "Expense editted successfully.",
  };
}
