// types
import type { Expense } from "@/types";


type TransactionsSectionProps = {
  expenses: Expense[];
  handleRemoveExpense: (expense: Expense) => void;
}


export default function TransactionsSection(
  { expenses, handleRemoveExpense }: TransactionsSectionProps
) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-4xl font-extrabold">
        Transactions
      </h2>
      <div className="flex flex-col gap-2 mx-1">
        {expenses.map((expense) => (
          <div 
            className="flex flex-col border border-black px-6 py-2" 
            key={expense.id}
          >
            <div className="flex flex-col my-2">
              <span>title: {expense.title}</span>
              <span>note: {expense.note}</span>
              <span>amount: {expense.amount}</span>
            </div>
            <div className="my-2">
              <button
                onClick={() => handleRemoveExpense(expense)}
                className="border border-black rounded-md hover:bg-gray-100 px-4 py-2"
              >
                Remove this one
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

