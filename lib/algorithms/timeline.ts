import type { TimelineOption, Transaction } from "@/types";


export function filterTransactionsByTimeline(
  transactions: Transaction[],
  timeline: TimelineOption
): Transaction[] {
  if (timeline === "lifetime") {
    return transactions;
  }

  const now = new Date();
  const start = new Date(now);

  if (timeline === "week") {
    start.setDate(start.getDate() - 7);
  }

  else if (timeline === "month") {
    start.setMonth(start.getMonth() - 1);
  }

  else {
    start.setFullYear(start.getFullYear() - 1);
  }

  return transactions.filter((t) => new Date(t.created_at) >= start);
}
