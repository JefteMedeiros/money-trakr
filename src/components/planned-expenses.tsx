"use client";

import { Pencil } from "lucide-react";

import { type ChangeEvent, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "@/components/ui/glass/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/glass/dialog";
import { Input } from "@/components/ui/glass/input";

interface Props {
  plannedExpenses: number;
  handlePlannedExpenses: (value: number) => void;
}

export function PlannedExpenses({
  plannedExpenses,
  handlePlannedExpenses,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<number>(0);

  const [isFirstAccess, setIsFirstAccess] = useLocalStorage(
    "firstAccess",
    "true",
    { initializeWithValue: false },
  );

  const greetingMessage =
    isFirstAccess && isFirstAccess === "true"
      ? "Olá, seja bem-vindo ao Money Trakr!"
      : "Valor de despesas planejadas";

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  const handleSavePlannedExpenses = () => {
    if (isFirstAccess && isFirstAccess === "true") {
      setIsFirstAccess("false");
    }

    handlePlannedExpenses(value);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button>
          <Pencil className="text-purple-400" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 max-w-[90%] xl:max-w-lg text-white border-none">
        <DialogHeader className="items-start">
          <DialogTitle>{greetingMessage}</DialogTitle>
          <DialogDescription className="text-white text-sm font-extralight">
            Adicione no campo abaixo o quanto você planeja gastar
          </DialogDescription>
        </DialogHeader>
        <Input
          type="number"
          defaultValue={plannedExpenses}
          onChange={handleChangeValue}
          className="bg-gray-900 text-white h-12 border-none focus-visible:ring-offset-1 focus-visible:ring-2 focus-visible:ring-offset-gray-800  focus-visible:ring-purple-400"
        />
        <Button
          onClick={handleSavePlannedExpenses}
          className="w-full h-12"
          type="submit"
        >
          Salvar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
