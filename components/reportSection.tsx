// types
import type { Transaction, UserGoal } from "@/types";

import { useMemo } from "react";

// modules
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";

import { getGoalProgress, getModeTargetProgress } from "@/lib/algorithms";


type ReportSectionProps = {
  transactions: Transaction[];
  goals: UserGoal[];
};


export default function ReportSection({
  transactions,
  goals
}: ReportSectionProps) {
  const incomeData = {
    amount: transactions
      .filter((t) => t.category === "income")
      .map((t) => t.amount)
      .reduce((acc, curr) => acc + curr, 0),
    type: "income",
    fill: "rgb(0, 201, 80)"
  };

  const expenseData = {
    amount: transactions
      .filter((t) => t.category !== "income")
      .map((t) => t.amount)
      .reduce((acc, curr) => acc + curr, 0),
    type: "expense",
    fill: "rgb(254, 154, 0)"
  };

  const incomeExpenseData = [incomeData, expenseData];
  const totalBalance: number = incomeData.amount - expenseData.amount;

  const investmentGrowthData = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    return sorted.reduce<{ timeline: string; total: number }[]>((acc, t) => {
      const previousTotal = acc.length > 0 ? acc[acc.length - 1].total : 0;
      const nextTotal = t.category === "investment"
        ? previousTotal + t.amount
        : previousTotal;

      acc.push({
        timeline: new Date(t.created_at).toLocaleDateString(),
        total: nextTotal
      });

      return acc;
    }, []);
  }, [transactions]);

  const goalProgressData = useMemo(
    () => getGoalProgress(goals, transactions),
    [goals, transactions]
  );

  const budgetTargetData = useMemo(
    () => getModeTargetProgress(goals, transactions),
    [goals, transactions]
  );


  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row bg-white border border-black/50 px-6 sm:px-10 lg:px-18 py-6 rounded-3xl gap-8 lg:gap-18">
        <div className="flex flex-col lg:w-[40%] my-4 lg:my-12">
          <h3 className="text-4xl font-bold">Your current budget is:</h3>
          <div className="my-3 ml-10">
            <span className={`text-5xl sm:text-6xl lg:text-8xl font-extrabold ${totalBalance < 0 ? "text-amber-500" : "text-green-500"}`}>
              {totalBalance.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="w-full lg:w-[56%] h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={incomeExpenseData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="type" type="category" />
              <Tooltip
                cursor={{ fill: "#ffffff" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length && Number(payload[0].value) > 0) {
                    return (
                      <div className="rounded-lg border border-black bg-white px-2 py-0.5">
                        <span>{Number(payload[0].value).toLocaleString()}</span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="amount"
                fill="#000000"
                radius={[0, 24, 24, 0]}
                barSize={85}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-black/50 px-6 sm:px-10 py-6 rounded-3xl">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4">Investment growth</h3>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={investmentGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timeline" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#ec4899" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-black/50 px-6 sm:px-10 py-6 rounded-3xl">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4">Goal tracking</h3>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={goalProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="current" fill="#2563eb" />
              <Bar dataKey="target" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-black/50 px-6 sm:px-10 py-6 rounded-3xl">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4">Mode target progress</h3>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={budgetTargetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mode" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="current" fill="#f59e0b" />
              <Bar dataKey="target" fill="#0f766e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <span className="text-sm text-gray-700 mt-3 block">
          Progress is tracked by comparing your current amount per mode against the target you set.
        </span>
      </div>
    </div>
  );
}
