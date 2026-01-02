import { useFormContext } from "react-hook-form";
import type { Expense } from "@/@types/expense";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/glass/input";
import { Switch } from "@/components/ui/glass/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/glass/select";

export function ExpenseForm() {
  const form = useFormContext<Expense>();

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                className="h-10 text-white"
                placeholder="Nome"
                maxLength={40}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-10 text-white">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="other">Outros</SelectItem>
                <SelectItem value="entertainment">Entretenimento</SelectItem>
                <SelectItem value="food">Alimentação</SelectItem>
                <SelectItem value="transport">Transporte</SelectItem>
                <SelectItem value="housing">Moradia</SelectItem>
                <SelectItem value="health">Saúde</SelectItem>
                <SelectItem value="education">Educação</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="value"
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                step="any"
                className="h-10 text-white"
                type="number"
                placeholder="Valor"
                {...form.register("value", {
                  setValueAs: (value: any) =>
                    value === "" || value === null ? null : Number(value),
                })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="isUnique"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2s space-y-0">
            <FormControl>
              <Switch
                variant="glass"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="text-white">Despesa única</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
