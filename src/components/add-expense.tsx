"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { type Category, type Expense, expenseSchema } from "@/@types/expense";
import { addExpense } from "@/actions/add_expense";
import { ExpenseForm } from "@/components/expense-form";
import { SubmitButton } from "./submit-button";
import { Form } from "./ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/glass/dialog";
import { Button } from "@/components/ui/glass/button";
import { generateExpenseExampleMessage } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

const initialState = {
  message: "",
};

export function AddExpense() {
  const [state, formAction] = useActionState(addExpense, initialState);

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
    defaultValues: {
      name: "",
      category: "" as Category,
      value: 0,
      date: new Date().toISOString(),
      isUnique: true,
    },
    resolver: zodResolver(expenseSchema),
  });

  const onSubmit = (data: Expense) => {
    startTransition(async () => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (state.message === "Expense added successfully.") {
      setIsOpen(false);
      form.reset();
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 w-full md:w-auto">
          <PlusIcon className="h-4 w-4" />
          <span className="truncate">Adicionar despesa</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="items-start">
          <DialogTitle>Adicionar despesa</DialogTitle>
          <DialogDescription className="text-sm font-extralight">
            {expenseExample}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="add_expense"
            className="flex flex-col gap-4 text-gray-800"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <ExpenseForm />
            <SubmitButton isPending={isPending} text="Adicionar" />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
