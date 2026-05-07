"use client";

// react stuff
import { useState } from "react";

// hooks
import { useTransactions } from "@/hooks/transactions";

// components
import AddTransactionModal from "@/components/addTransactionModal";
import MonthlyReportSection from "@/components/monthlyReportSection";
import TransactionsSection from "@/components/transactionsSection";
import LoadingModal from "@/components/loadingModal";


export default function Home() {
  // hooks
  const { 
    handleAddTransaction, handleRemoveTransaction, 
    transactions, isLoading 
  } = useTransactions();

  // control vars
  const [isAddingTransaction, setIsAddingTransaction] = useState<boolean>(false);


  return (
    <main className="min-h-screen">
      <div className="mx-12 my-12 flex flex-col gap-10">
        {/* Monthly report section (with graphs) */}
        {transactions.length > 0 && (
          <MonthlyReportSection />
        )}

        {/* Transactions list (will only show a few) */}
        {transactions.length > 0 && (
          <TransactionsSection 
            transactions={transactions} 
            handleRemoveTransaction={handleRemoveTransaction} 
          />
        )}

        {/* Functional buttons */}
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-extrabold">
            {transactions.length > 0 ? "Actions" : "Add a transaction to get started"}
          </h2>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setIsAddingTransaction(true)}
              className="border rounded-2xl border-black py-1.5 px-3 mr-auto bg-gray-300 hover:bg-gray-200 font-semibold hover:-translate-y-px hover:shadow-sm transition-transform"
            >
              Add a new transaction
            </button>
          </div>
        </div>

        {/* Suggestions section */}
        {transactions.length > 0 && (
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-4xl font-extrabold mr-auto">
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
          handleAddTransaction={handleAddTransaction}
        />
      )}

      {isLoading && (
        <LoadingModal />
      )}
    </main>
  );
}
