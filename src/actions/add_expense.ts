"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type Expense, expenseSchema } from "@/@types/expense";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { expenses } from "@/db/schemas/expenses";

export async function addExpense(prevState: any, formData: Expense) {
	const session = await auth();

	if (!session) {
		return redirect("/signin");
	}

	const validFormData = expenseSchema.safeParse(formData);

	if (!validFormData.success) {
		return {
			message: "Invalid form data.",
		};
	}

	const data = {
		...validFormData.data,
		id: crypto.randomUUID(),
		userId: session.user.id,
	};

	console.log(data);

	await db.insert(expenses).values(data);

	revalidatePath("/");

	return {
		message: "Expense added successfully.",
	};
}
