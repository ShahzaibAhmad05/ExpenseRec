// object types
import { Expense } from "@/types";


export function addExpense(expense: Expense): void {
  if (!expense.id || !expense.amount || !expense.title) {
    throw new Error(`cannot add expense with missing id or amount or title.`)
  }

  const expenses: Expense[] = getExpenses();
  setExpenses([...expenses, expense]);
}


export function removeExpense(expenseToRemove: Expense): void {
  const expenses: Expense[] = getExpenses();
  const filteredExpenses = expenses.filter(exp => exp.id !== expenseToRemove.id);

  setExpenses(filteredExpenses);
}


export function getExpenses(): Expense[] {
  if (typeof window !== "undefined") {
    const expensesJson = localStorage.getItem("expenses");

    if (expensesJson) {
      const expenses = JSON.parse(expensesJson) as Expense[];
      return expenses;
    }
  }

  return [];
}


export function setExpenses(expenses: Expense[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  } else {
    throw new Error(`window is undefined, what do i do!!`);
  }
}

