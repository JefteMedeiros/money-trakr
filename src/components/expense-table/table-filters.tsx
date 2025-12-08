import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddExpense } from "../add-expense";

export function TableFilters() {
  const router = useRouter();
  const path = usePathname();
  const readonlyParams = useSearchParams();
  const searchParams = new URLSearchParams(readonlyParams);

  const [searchByName, setSearchByName] = useState(
    searchParams.get("name") || "",
  );

  function handleSearchByName(event: ChangeEvent<HTMLInputElement>) {
    setSearchByName(event.target.value);
  }

  useEffect(() => {
    if (searchByName.length > 0) {
      searchParams.set("name", searchByName);
    } else if (searchByName.length === 0) {
      searchParams.delete("name");
    }

    const timeout = setTimeout(() => {
      router.replace(`${path}?${searchParams.toString()}`);
    }, 350);

    return () => clearTimeout(timeout);
  }, [searchByName]);

  const category = searchParams.get("category");
  const type = searchParams.get("type");

  return (
    <div className="flex items-center gap-2 py-4">
      <Input
        placeholder="Filtrar por nome"
        value={searchByName}
        onChange={handleSearchByName}
        className="bg-gray-900 w-1/4 text-ellipsis text-white h-12 border-none focus-visible:ring-offset-1 focus-visible:ring-2 focus-visible:ring-offset-gray-800  focus-visible:ring-purple-400"
      />
      <Select
        value={category ?? ""}
        onValueChange={(value) => {
          value === "all"
            ? searchParams.delete("category")
            : searchParams.set("category", value);

          router.replace(`${path}?${searchParams.toString()}`);
        }}
        defaultValue="all"
      >
        <SelectTrigger className="bg-gray-900 w-1/4 text-white h-12 border-none focus:ring-offset-1 focus:ring-2 focus:ring-offset-gray-800  focus:ring-purple-400">
          <SelectValue placeholder="Filtrar por categoria" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 text-white border-none">
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="other">Outros</SelectItem>
          <SelectItem value="entertainment">Entretenimento</SelectItem>
          <SelectItem value="food">Alimentação</SelectItem>
          <SelectItem value="transport">Transporte</SelectItem>
          <SelectItem value="housing">Moradia</SelectItem>
          <SelectItem value="health">Saúde</SelectItem>
          <SelectItem value="education">Educação</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={type ?? ""}
        onValueChange={(value) => {
          value === "all"
            ? searchParams.delete("type")
            : searchParams.set("type", value);

          router.replace(`${path}?${searchParams.toString()}`);
        }}
        defaultValue="all"
      >
        <SelectTrigger className="bg-gray-900 w-1/4 text-white h-12 border-none focus:ring-offset-1 focus:ring-2 focus:ring-offset-gray-800  focus:ring-purple-400">
          <SelectValue placeholder="Filtrar por tipo" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 text-white border-none">
          <SelectItem value="all">Todas</SelectItem>
          <SelectItem value="unique">Despesa única</SelectItem>
          <SelectItem value="recurring">Despesa recorrente</SelectItem>
        </SelectContent>
      </Select>
      <AddExpense />
    </div>
  );
}
