import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";

export const expenses = sqliteTable("expenses", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	date: text("date").notNull(),
	value: real("value").notNull(),
	category: text("category", {
		enum: [
			"other",
			"entertainment",
			"food",
			"transport",
			"housing",
			"health",
			"education",
		],
	}).notNull(),
	isUnique: integer("is_unique", { mode: "boolean" }).notNull(),
	userId: text("user_id")
		.references(() => user.id)
		.notNull(),
	createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type InsertExpense = typeof expenses.$inferInsert;
export type SelectExpense = typeof expenses.$inferSelect;
