"use client";

// react stuff
import { useState } from "react";

// types
import type { Expense } from "@/types";

// hooks
import { useExpenses } from "@/hooks/expenses";

// components
import AddTransactionModal from "../components/addTransactionModal";



export default function Home() {
  // hooks
  const { handleAddExpense, handleRemoveExpense, expenses } = useExpenses();

  // control vars
  const [isAddingTransaction, setIsAddingTransaction] = useState<boolean>(false);


  return (
    <main className="min-h-screen">
      <div className="mx-12 my-12">
        {/* Monthly report section (with graphs) */}
        {expenses.length > 0 && (
          <div>
            <h2 className="text-5xl font-extrabold my-6">
              This Month's Report
            </h2>
            <div className="text-lg my-6 mx-1">
              there will be reports here
            </div>
          </div>
        )}

        {/* Transactions list (will only show a few) */}
        {expenses.length > 0 && (
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
        )}

        {/* Functional buttons */}
        <div className="my-6 flex flex-col gap-4">
          <h2 className="text-4xl font-extrabold">
            Actions
          </h2>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setIsAddingTransaction(true)}
              className="border border-black px-4 py-2 rounded-md hover:bg-gray-100 mr-auto"
            >
              Add a new transaction
            </button>
          </div>
        </div>

        {/* Suggestions section */}
        {expenses.length > 0 && (
          <div className="my-6 text-center flex flex-col">
            <h2 className="text-4xl font-extrabold my-4 mr-auto">
              Suggestions for YOU
            </h2>
            <div className="flex flex-col w-full">
              <span className="mr-auto text-lg">
                There will be suggestions here
              </span>
            </div>
          </div>
        )}
      </div>

      {isAddingTransaction && (
        <AddTransactionModal 
          onClose={() => setIsAddingTransaction(false)}
          handleAddExpense={handleAddExpense}
        />
      )}
    </main>
  );
}
