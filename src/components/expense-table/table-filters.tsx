import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/glass/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/glass/select";
import { AddExpense } from "../add-expense";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/glass/sheet";
import { Button } from "../ui/glass/button";
import { Filter, SlidersHorizontal } from "lucide-react";

function FilterControls() {
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
    <>
      <Input
        className="h-10 max-w-80 w-full"
        placeholder="Filtrar por nome"
        value={searchByName}
        onChange={handleSearchByName}
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
        <SelectTrigger className="h-10">
          <SelectValue placeholder="Filtrar por categoria" />
        </SelectTrigger>
        <SelectContent>
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
        <SelectTrigger className="h-10">
          <SelectValue placeholder="Filtrar por tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          <SelectItem value="unique">Despesa única</SelectItem>
          <SelectItem value="recurring">Despesa recorrente</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}

export function TableFilters() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-2">
      <div className="hidden sm:flex flex-col sm:flex-row sm:items-center gap-2">
        <FilterControls />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex sm:hidden">
            <SlidersHorizontal />
            Filtros
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col gap-2">
            <FilterControls />
          </div>
        </SheetContent>
      </Sheet>

      <AddExpense />
    </div>
  );
}
