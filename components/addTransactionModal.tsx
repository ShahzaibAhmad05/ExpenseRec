"use client";

// react stuff
import { useState } from "react";


type AddTransactionModalProps = {
  onClose: () => void;
  handleAddTransaction: (
    category: string, amount: string, 
    title: string, description: string
  ) => void;
}


export default function AddTransactionModal(
  { onClose, handleAddTransaction }: AddTransactionModalProps
) {
  // control vars
  const [category, setCategory] = useState<string>("auto-select");
  const [amount, setAmount] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");


  // utils
  const onSubmit = () => {
    handleAddTransaction(category, amount, title, description);
    setCategory("auto");
    setAmount("");
    setTitle("");
    setDescription("");
    onClose();
  };


  return (
    <div className="border border-black fixed inset-0 backdrop-blur-md flex items-center justify-center">
      {/* Container */}
      <div className="flex flex-col min-w-2xl bg-white border border-black rounded-4xl px-8 py-6">
        {/* top buttons */}
        <div className="ml-auto">
          <button 
            onClick={onClose}
            className="hover:bg-red-500/85 border border-black rounded-full px-3 py-1 font-extrabold transition-colors"
          >
            X
          </button>
        </div>

        {/* input area */}
        <div className="flex flex-col gap-5 my-2">
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="transaction-amount"
              className="font-semibold"
            >
              How much?{' '}
              <span className="text-red-600 font-bold">*</span>
            </label>
            <input
              id="transaction-amount"
              type="text"
              placeholder="enter the amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-blue p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="transaction-category"
              className="font-semibold"
            >
              Select Category (optional)
            </label>
            <select
              id="transaction-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-black p-2"
            >
            <option value="auto-select">auto-select</option>
            <option value="income">income</option>
            <option value="transaction">transaction</option>
            <option value="investment">investment</option>
            <option value="saving">saving</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="transaction-title"
              className="font-semibold"
            >
              What did you do?{' '}
              <span className="text-red-600 font-bold">*</span>
            </label>
            <input
              id="transaction-title"
              type="text"
              placeholder="enter a short title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-blue p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="transaction-notes"
              className="font-semibold"
            >
              Full Description{' '}
              <span className="text-red-600 font-bold">*</span>
            </label>
            <textarea
              id="transaction-notes"
              placeholder="enter the details here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-blue p-2"
            />
          </div>
        </div>

        {/* buttons area */}
        <div className="flex flex-row gap-3 ml-auto mt-3">
          <button 
            onClick={onClose}
            className="border rounded-2xl border-black py-1.5 px-6 bg-red-500 hover:bg-red-200 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button 
            onClick={onSubmit}
            className="border rounded-2xl border-black py-1.5 px-6 bg-blue-500 hover:bg-blue-200 transition-colors font-semibold"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}

