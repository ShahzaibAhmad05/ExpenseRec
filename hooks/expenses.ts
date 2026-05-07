// object types
import type { Expense } from "@/types";

// react stuff
import { useState, useEffect } from "react";

// custom modules
import {
  getExpenses as getExpStorage, 
  setExpenses as setExpStorage
} from "@/lib/storage";


export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [nextId, setNextId] = useState<number>(1);


  useEffect(() => {
    const savedExpenses = getExpStorage();
    setExpenses(savedExpenses);
    setNextId(getNextId(savedExpenses));
  }, []);


  const handleAddExpense = (title: string, note: string, amount: number) => {
    const newExpense = {
      id: nextId,
      title: title,
      note: note,
      amount: amount
    } as Expense;

    try {
      const updatedExpenses = [...expenses, newExpense];

      setNextId(getNextId(updatedExpenses));
      setExpenses(updatedExpenses);
      setExpStorage(updatedExpenses);
    } 

    catch (error: unknown) {
      console.log(error instanceof Error ? error.message : error);
    }
  };


  const handleRemoveExpense = (expense: Expense) => {
    const filteredExpenses = expenses.filter(exp => exp.id !== expense.id);

    setNextId(getNextId(filteredExpenses));
    setExpenses(filteredExpenses);
    setExpStorage(filteredExpenses);
  };


  return {
    handleAddExpense,
    handleRemoveExpense,
    expenses
  };
}


function getNextId(expenses: Expense[]): number {
  let maxId: number = 1;

  for (const exp of expenses) {
    maxId = Math.max(maxId, exp.id);
  }

  return maxId+1;
}

