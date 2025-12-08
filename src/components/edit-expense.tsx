"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useActionState, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { type Expense, expenseSchema } from "@/@types/expense";
import { editExpense } from "@/actions/edit_expense";
import { ExpenseForm } from "@/components/expense-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { SelectExpense } from "@/db/schemas/expenses";
import { generateExpenseExampleMessage } from "@/lib/utils";
import { SubmitButton } from "./submit-button";
import { Form } from "./ui/form";

interface Props {
  expense: SelectExpense;
}

const initialState = {
  message: "",
};

export function EditExpense({ expense }: Props) {
  const [state, formAction] = useActionState(editExpense, initialState);
  const [open, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [expenseExample, setExpenseExample] = useState(() =>
    generateExpenseExampleMessage(),
  );

  useEffect(() => {
    if (!open) return;
    setExpenseExample(generateExpenseExampleMessage());
  }, [open]);

  const form = useForm({
    defaultValues: expense,
    resolver: zodResolver(expenseSchema),
  });

  const onSubmit = (data: Expense) => {
    startTransition(async () => {
      formAction({ ...data, id: expense.id, createdAt: expense.createdAt, userId: expense.userId });
    });
  };

  useEffect(() => {
    if (state.message === "Expense editted successfully.") {
      setIsOpen(false);
      form.reset(
        {},
        {
          keepValues: true,
        },
      );
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button>
          <Pencil className="text-purple-400" size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 max-w-[90%] xl:max-w-lg text-white border-none">
        <DialogHeader className="items-start">
          <DialogTitle>Editar despesa</DialogTitle>
          <DialogDescription className="text-white text-sm font-extralight">
            {expenseExample}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="edit_expense"
            className="flex flex-col gap-4 text-gray-800"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <ExpenseForm />
            <SubmitButton isPending={isPending} text="Salvar" />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
