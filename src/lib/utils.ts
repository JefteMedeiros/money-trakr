import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function moneyFormatter(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

const expenseExamples = [
  "Ex: Escola do meu filho",
  "Ex: Compras do mês",
  "Ex: Conta de luz",
  "Ex: Conta de água",
  "Ex: Conta de internet",
  "Ex: Conta de telefone",
  "Ex: Conta de celular",
  "Ex: Conta de cartão de crédito",
  "Ex: Conta de cartão de débito",
  "Ex: Conta de supermercado",
  "Ex: Conta de farmácia",
  "Ex: Conta de combustível",
  "Ex: Conta de gás",
];

export const generateExpenseExampleMessage = () => {
  const randomMessage = Math.random() * expenseExamples.length;
  return expenseExamples[Math.floor(randomMessage)];
};
