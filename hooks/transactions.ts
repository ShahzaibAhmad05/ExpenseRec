// object types
import type { Transaction } from "@/types";

// react stuff
import { useState, useEffect } from "react";

// custom modules
import {
  getTransactions as getTransactionsLocalStorage, 
  setTransactions as setTransactionsLocalStorage
} from "@/lib/storage";


export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    const savedTransactions = getTransactionsLocalStorage();
    setTransactions(savedTransactions);
    setIsLoading(false);
  }, []);


  /**
   * throws an Error if amount is not number convertible or missing
   */
  const handleAddTransaction = (
    category: string, amount: string, 
    title: string, description: string
  ) => {
    const amountNum = Number(amount);

    if (Number.isNaN(amountNum)) {
      console.error(`Cannot add transaction: invalid number input.`);
      return;
    }

    else if (!title || !amount || !description || !category) {
      console.error(`Cannot add transaction: missing transaction attribute(s).`);
      return;
    }


    if (category === "auto-select") {
      // TODO: implement categorization algo here
      category = "expense";
    }


    const newT = {
      id: crypto.randomUUID(),
      category: category,
      amount: amountNum,
      title: title,
      description: description
    } as Transaction;


    const updatedTransactions = [...transactions, newT];
    setTransactions(updatedTransactions);
    setTransactionsLocalStorage(updatedTransactions);
  };


  const handleRemoveTransaction = (transaction: Transaction) => {
    const filteredTransactions = transactions.filter(exp => exp.id !== transaction.id);
    setTransactions(filteredTransactions);
    setTransactionsLocalStorage(filteredTransactions);
  };


  return {
    handleAddTransaction,
    handleRemoveTransaction,
    transactions,
    isLoading
  };
}

