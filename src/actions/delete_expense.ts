"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { expenses } from "@/db/schemas/expenses";
import { db } from "../db/db";
export async function deleteExpense(id: string) {
	const session = await auth();

	if (!session) {
		return redirect("/signin");
	}

	await db
		.delete(expenses)
		.where(and(eq(expenses.id, id), eq(expenses.userId, session.user.id)));

	revalidatePath("/");

	return {
		message: "Expense deleted successfully.",
	};
}
