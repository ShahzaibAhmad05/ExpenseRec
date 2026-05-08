// object types
import { Transaction, UserGoal } from "@/types";


function normalizeTransaction(input: Partial<Transaction>): Transaction {
  return {
    id: input.id || crypto.randomUUID(),
    category: input.category || "expense",
    amount: Number(input.amount || 0),
    title: input.title || "",
    description: input.description || "",
    created_at: input.created_at || new Date().toISOString()
  };
}


function normalizeGoal(input: Partial<UserGoal>): UserGoal {
  const mode = input.mode === "investing" || input.mode === "saving" ? input.mode : "balanced";

  return {
    id: input.id || crypto.randomUUID(),
    title: input.title || "",
    mode,
    target_amount: Number(input.target_amount || 0),
    created_at: input.created_at || new Date().toISOString()
  };
}


export function getTransactions(): Transaction[] {
  if (typeof window !== "undefined") {
    const transactionsJson = localStorage.getItem("transactions");

    if (transactionsJson) {
      const transactionsRaw = JSON.parse(transactionsJson) as Partial<Transaction>[];
      return transactionsRaw.map(normalizeTransaction);
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


export function getGoals(): UserGoal[] {
  if (typeof window !== "undefined") {
    const goalsJson = localStorage.getItem("goals");

    if (goalsJson) {
      const goalsRaw = JSON.parse(goalsJson) as Partial<UserGoal>[];
      return goalsRaw.map(normalizeGoal);
    }
  }

  return [];
}


export function setGoals(goals: UserGoal[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("goals", JSON.stringify(goals));
  }

  else {
    throw new Error(
      "COULD NOT SAVE goals to localStorage: " +
      "cannot set goals var on an undefined window"
    );
  }
}

