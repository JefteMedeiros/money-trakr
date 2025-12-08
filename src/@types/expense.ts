import * as z from "zod";
import { moneyFormatter } from "@/lib/utils";

export const categoryEquivalent = {
	other: "Outros",
	entertainment: "Entretenimento",
	food: "Alimentação",
	transport: "Transporte",
	housing: "Moradia",
	health: "Saúde",
	education: "Educação",
};

export type Category = keyof typeof categoryEquivalent;

export const typeEquivalent = {
	true: true,
	false: false,
};

export const expenseSchema = z.object({
	name: z.string().min(1, { message: "Este campo é obrigatório." }),
	category: z.enum(
		[
			"other",
			"entertainment",
			"food",
			"transport",
			"housing",
			"health",
			"education",
		],
		{
			message: "Este campo é obrigatório.",
		},
	),
	value: z.coerce
		.number()
		.min(1, { message: "Este campo é obrigatório." })
		.max(9999999, {
			message: `O valor máximo é de ${moneyFormatter(9999999.99)}`,
		}),
	date: z.string(),
	isUnique: z.boolean(),
});

export type Expense = z.infer<typeof expenseSchema>;
