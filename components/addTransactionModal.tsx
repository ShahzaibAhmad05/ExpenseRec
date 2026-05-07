"use client";

// hooks
import { useExpenses } from "@/hooks/expenses";

// react stuff
import { useState } from "react";


type AddTransactionModalProps = {
  onClose: () => void;
  handleAddExpense: (title: string, note: string, amount: number) => void;
}


export default function AddTransactionModal({ onClose, handleAddExpense }: AddTransactionModalProps) {
  // form control
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [amount, setAmount] = useState<string>("");


  // utils
  const onSubmit = () => {
    handleAddExpense(title, note, Number(amount));
    setAmount("");
    setTitle("");
    setNote("");
    onClose();
  };


  return (
    <div className="border border-black fixed inset-0 backdrop-blur-sm flex items-center justify-center">
      {/* Container */}
      <div className="flex flex-col min-w-4xl bg-white border border-black rounded-lg">
        <div className="ml-auto mr-6 my-3">
          <button 
            onClick={onClose}
            className="border border-black rounded-md px-3 py-1 hover:bg-gray-100"
          >
            X
          </button>
        </div>

        <div className="flex flex-col gap-2 mb-10 mx-12 border border-black p-8">
          <label 
            htmlFor="expense-title"
            className="font-semibold"
          >
            Title
          </label>
          <input
            id="expense-title"
            type="text"
            placeholder="What was the expense?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-blue p-2"
          />
          <label 
            htmlFor="expense-amount"
            className="font-semibold"
          >
            Amount
          </label>
          <input
            id="expense-amount"
            type="text"
            placeholder="Enter the amount here."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-blue p-2"
          />
          <label 
            htmlFor="expense-notes"
            className="font-semibold"
          >
            Additional Notes
          </label>
          <input
            id="expense-notes"
            type="text"
            placeholder="Any additional notes?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border border-blue p-2"
          />
          <button 
            onClick={onSubmit}
            className="border rounded-md border-black max-w-48 mt-4 py-2 bg-gray-50 hover:bg-gray-200 transition-colors"
          >
            Add this
          </button>
        </div>
      </div>
    </div>
  );
}

