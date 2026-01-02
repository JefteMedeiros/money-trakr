import { Trash } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { deleteExpense } from "@/actions/delete_expense";
import { SubmitButtonAction } from "./submit-button-action";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/glass/alert-dialog";
import { Button } from "@/components/ui/glass/button";

interface Props {
  id: string;
}

const initialState = {
  message: "",
};

export function DeleteExpense({ id }: Props) {
  const deleteExpenseWithId = deleteExpense.bind(null, id);

  const [state, formAction] = useActionState(deleteExpenseWithId, initialState);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (state.message === "Expense deleted successfully.") {
      setIsOpen(false);
    }
  }, [state]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-10 h-10 rounded-full" variant="ghost">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-800 max-w-[90%] xl:max-w-lg text-white border-none">
        <AlertDialogHeader className="items-start">
          <AlertDialogTitle>Deletar despesa</AlertDialogTitle>
          <AlertDialogDescription className="text-white text-sm font-extralight">
            Tem certeza que deseja deletar esta despesa?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center w-full">
          <AlertDialogCancel
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            asChild
          >
            <Button variant="outline" className="w-1/2">
              Não
            </Button>
          </AlertDialogCancel>
          <form id="delete_expense" className="w-1/2" action={formAction}>
            <SubmitButtonAction id="delete_expense" text="Sim" />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
