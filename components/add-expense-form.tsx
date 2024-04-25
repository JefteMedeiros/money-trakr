import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const expenseSchema = z.object({
  name: z.string(),
  category: z.enum([
    'other',
    'entertainment',
    'food',
    'transport',
    'housing',
    'health',
    'education',
  ]),
  amount: z.coerce.number().min(1),
  date: z.date(),
  type: z.enum(['unique', 'recurring']),
})

type Schema = z.infer<typeof expenseSchema>

export function AddExpenseForm() {
  const form = useForm<Schema>({
    defaultValues: {
      name: '',
      category: 'other',
      amount: 0,
      date: new Date(),
      type: 'unique',
    },
    resolver: zodResolver(expenseSchema),
  })

  const onSubmit = (data: Schema) => console.log(data)

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 text-zinc-800"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-zinc-900 text-white h-12 border-none focus-visible:ring-offset-1 focus-visible:ring-2 focus-visible:ring-offset-zinc-800  focus-visible:ring-purple-400"
                  placeholder="Nome"
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
                  <SelectTrigger className="bg-zinc-900 text-white h-12 border-none focus:ring-offset-1 focus:ring-2 focus:ring-offset-zinc-800  focus:ring-purple-400">
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-zinc-900 text-white border-none">
                  <SelectItem value="other">Outros</SelectItem>
                  <SelectItem value="entertainment">Entretenimeno</SelectItem>
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  step="any"
                  className="bg-zinc-900 text-white h-12 border-none focus-visible:ring-offset-1 focus-visible:ring-2 focus-visible:ring-offset-zinc-800  focus-visible:ring-purple-400"
                  type="number"
                  placeholder="Valor"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-white">Tipo de despesa</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        className="border-zinc-900"
                        value="unique"
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-white">
                      Despesa única
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        className="border-zinc-900"
                        value="mentions"
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-white">
                      Despesa recorrente
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full h-12" type="submit">
          Salvar
        </Button>
      </form>
    </Form>
  )
}
