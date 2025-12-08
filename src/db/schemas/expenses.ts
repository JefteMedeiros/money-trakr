import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const expenses = sqliteTable("expenses", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	date: text("date").notNull(),
	value: real("value").notNull(),
	category: text("category").notNull(),
	isUnique: integer("is_unique", { mode: "boolean" }).notNull(),
	userId: text("user_id")
		.references(() => users.id)
		.notNull(),
	createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type InsertExpense = typeof expenses.$inferInsert;
export type SelectExpense = typeof expenses.$inferSelect;
