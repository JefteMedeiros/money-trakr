'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { ExpenseForm } from '@/components/expense-form'
import { Expense, expenseSchema } from '@/@types/expense'
import { Form } from './ui/form'
import { useForm } from 'react-hook-form'
import { useExpenseStore } from '@/store/expense-store'
import { generateExpenseExampleMessage } from '@/lib/utils'
import { v4 } from 'uuid'

export function AddExpense() {
  const { handleAddExpense } = useExpenseStore()

  const [open, setIsOpen] = useState(false)

  const [expenseExample, setExpenseExample] = useState(() =>
    generateExpenseExampleMessage(),
  )

  const [randomId, setRandomId] = useState(() => v4())

  // Troca a mensagem a cada vez que o modal é aberto
  // Reseta o ID também

  useEffect(() => {
    if (!open) return
    setExpenseExample(generateExpenseExampleMessage())
    const newId = v4()
    setRandomId(newId)
    form.reset({
      id: newId,
      name: '',
      category: 'other',
      amount: 0,
      date: new Date(),
      type: 'unique',
    })
  }, [open])

  const form = useForm<Expense>({
    defaultValues: {
      id: randomId,
      name: '',
      category: 'other',
      amount: 0,
      date: new Date(),
      type: 'unique',
    },
    resolver: zodResolver(expenseSchema),
  })

  const onSubmit = (data: Expense) => {
    handleAddExpense(data)
    setIsOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar despesa</Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white border-none">
        <DialogHeader>
          <DialogTitle>Adicionar despesa</DialogTitle>
          <DialogDescription className="text-white text-sm font-extralight">
            {expenseExample}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-4 text-gray-800"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <ExpenseForm />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
