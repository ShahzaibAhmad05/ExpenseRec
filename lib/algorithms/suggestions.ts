import type { Suggestion, Transaction, UserGoal } from "@/types";


const isExpense = (category: string) => category !== "income";


export function generateSuggestions(
  transactions: Transaction[],
  goals: UserGoal[]
): Suggestion[] {
  const result: Suggestion[] = [];

  if (transactions.length === 0) {
    return [{
      id: "no-transactions",
      title: "Start tracking your cash flow",
      detail: "Add your first transaction so suggestions can react to your income, expenses, and goals."
    }];
  }

  const income = transactions
    .filter((t) => t.category === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => isExpense(t.category))
    .reduce((acc, t) => acc + t.amount, 0);

  const investing = transactions
    .filter((t) => t.category === "investment")
    .reduce((acc, t) => acc + t.amount, 0);

  const saving = transactions
    .filter((t) => t.category === "saving")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  if (income === 0 && expenses > 0) {
    result.push({
      id: "no-income-high-expenses",
      title: "Income is zero but expenses are active",
      detail: "Record income first or reduce expenses. Without income, the balance will continue moving negative."
    });
  }

  if (income > 0 && expenses > income * 0.8) {
    result.push({
      id: "high-expense-ratio",
      title: "Expenses are near income",
      detail: "Your non-income spending is above 80% of income. Try reducing recurring expenses this week."
    });
  }

  if (income > 0 && expenses >= income) {
    result.push({
      id: "expenses-exceed-income",
      title: "Expenses are exceeding income",
      detail: "Your outflow is at or above inflow. Review subscriptions, one-off purchases, and unnecessary spending."
    });
  }

  if (income > 0 && investing + saving < income * 0.2) {
    result.push({
      id: "low-saving-investing",
      title: "Consider increasing saving/investing",
      detail: "Saving + investing is below 20% of income. Consider shifting part of transaction spending into these modes."
    });
  }

  const balancedGoals = goals.filter((goal) => goal.mode === "balanced");
  const investingGoals = goals.filter((goal) => goal.mode === "investing");
  const savingGoals = goals.filter((goal) => goal.mode === "saving");

  if (balancedGoals.length > 0 && balance < 0) {
    result.push({
      id: "balanced-goal-negative-balance",
      title: "Balanced goal needs a positive balance",
      detail: "Your balanced goal is easier to hit when income stays above expenses. Focus on closing the gap first."
    });
  }

  const goalTargets = goals.reduce((acc, g) => acc + g.target_amount, 0);
  if (goalTargets > 0 && investing + saving < goalTargets * 0.4) {
    result.push({
      id: "goal-progress-lagging",
      title: "Goal progress is lagging",
      detail: "Current saving/investing progress is still early versus your goal targets. Consider a fixed weekly contribution."
    });
  }

  if (investingGoals.length > 0 && investing === 0) {
    result.push({
      id: "missing-investing-progress",
      title: "Investing goal has no progress yet",
      detail: "You have an investing goal, but there are no investment transactions. Add one to start tracking progress."
    });
  }

  if (savingGoals.length > 0 && saving === 0) {
    result.push({
      id: "missing-saving-progress",
      title: "Saving goal has no progress yet",
      detail: "You have a saving goal, but there are no saving transactions. Add one to start tracking progress."
    });
  }

  if (result.length === 0) {
    result.push({
      id: "stable-pattern",
      title: "Spending pattern looks stable",
      detail: "Your current mode mix is balanced. Keep tracking consistently for better long-term recommendations."
    });
  }

  return result;
}
