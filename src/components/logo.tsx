import { Receipt } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-1.5 md:gap-2">
      <Receipt className="text-purple-500 dark:text-purple-300 w-6 h-6 md:w-8 md:h-8" />
      <h1 className="text-lg md:text-3xl font-bold">Money Trakr</h1>
    </div>
  );
}
