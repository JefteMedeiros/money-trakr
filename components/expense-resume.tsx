'use client'

import { cn, moneyFormatter } from '@/lib/utils'
import { PlannedExpenses } from './planned-expenses'
import { useLocalStorage } from 'usehooks-ts'
import { useExpenseStore } from '@/store/expense-store'

export function ExpenseResume() {
  const { totalExpenses } = useExpenseStore()

  const [plannedExpenseValue, setPlannedExpenseValue] = useLocalStorage(
    'plannedExpenseValue',
    0,
    { initializeWithValue: false },
  )

  const handlePlannedExpenses = (value: number) => {
    setPlannedExpenseValue(value)
  }

  const totalSpent = totalExpenses.reduce((acc, value) => acc + value.amount, 0)

  const remainingValue = plannedExpenseValue - totalSpent

  return (
    <nav className="grid grid-cols-3 gap-8 max-w-[1260px] -my-12 mx-auto">
      <div className="flex flex-col items-start justify-center gap-4 bg-gray-700 rounded-md h-36 p-6">
        <span className="text-white">Total planejado</span>
        <div className="flex items-center gap-2">
          <p className="font-bold text-3xl text-white">
            {moneyFormatter(plannedExpenseValue)}
          </p>
          <PlannedExpenses
            handlePlannedExpenses={handlePlannedExpenses}
            plannedExpenses={plannedExpenseValue}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-4 bg-gray-700 rounded-md h-36 p-6">
        <span className="text-white">Total gasto</span>
        <p
          className={cn('font-bold text-3xl text-white', {
            'text-green-500': totalSpent > plannedExpenseValue / 3,
            'text-red-500': totalSpent > plannedExpenseValue,
          })}
        >
          {moneyFormatter(totalSpent)}
        </p>
      </div>
      <div className="flex flex-col items-start justify-center gap-4 bg-gray-700 rounded-md h-36 p-6">
        <span className="text-white">Total restante</span>
        <p
          className={cn('font-bold text-3xl text-white', {
            'text-green-500': remainingValue > 0,
            'text-red-500': remainingValue < 0,
          })}
        >
          {moneyFormatter(remainingValue)}
        </p>
      </div>
    </nav>
  )
}
