import { and, eq, like } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { expenses } from "@/db/schemas/expenses";
import { db } from "../db/db";

export async function getExpense(queryParams: string) {
	const session = await auth();

	if (!session) {
		return redirect("/signin");
	}

	const mutableParams = new URLSearchParams(queryParams);

	const name = mutableParams.get("name");
	const category = mutableParams.get("category");
	const isUnique = mutableParams.get("type") === "unique";

	const results = await db
		.select()
		.from(expenses)
		.where(
			and(
				eq(expenses.userId, session.user.id),
				name && name.length > 0 ? like(expenses.name, `%${name}%`) : undefined,
				category && category.length > 0
					? eq(expenses.category, category)
					: undefined,
				isUnique ? eq(expenses.isUnique, true) : undefined,
			),
		);

	return results;
}
