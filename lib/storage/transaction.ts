// object types
import { Transaction } from "@/types";


export function getTransactions(): Transaction[] {
  if (typeof window !== "undefined") {
    const transactionsJson = localStorage.getItem("transactions");

    if (transactionsJson) {
      const transactions = JSON.parse(transactionsJson) as Transaction[];
      return transactions;
    }
  }

  return [];
}


export function setTransactions(transactions: Transaction[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  } 

  else {
    throw new Error(
      `COULD NOT SAVE transaction to localStorage: ` +
      `cannot set transactions var on an undefined window`
    );
  }
}

