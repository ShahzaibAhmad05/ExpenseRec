import type { GoalMode, Transaction, UserGoal } from "@/types";


function modeToCategory(mode: GoalMode): string | null {
  if (mode === "balanced") {
    return null;
  }

  if (mode === "investing") {
    return "investment";
  }

  if (mode === "saving") {
    return "saving";
  }

  return null;
}


export function getGoalProgress(goals: UserGoal[], transactions: Transaction[]) {
  return goals.map((goal) => {
    const goalCategory = modeToCategory(goal.mode);
    const current = transactions
      .filter((t) => {
        if (goal.mode === "balanced") {
          return t.category !== "income";
        }

        if (!goalCategory) {
          return false;
        }
        return t.category === goalCategory;
      })
      .reduce((acc, t) => acc + t.amount, 0);

    return {
      id: goal.id,
      title: goal.title,
      mode: goal.mode,
      target: goal.target_amount,
      current,
      progressPct: goal.target_amount > 0 ? Math.min((current / goal.target_amount) * 100, 100) : 0
    };
  });
}


export function getModeTargetProgress(goals: UserGoal[], transactions: Transaction[]) {
  const modeTargets = goals.reduce<Record<string, number>>((acc, g) => {
    acc[g.mode] = (acc[g.mode] || 0) + g.target_amount;
    return acc;
  }, {});

  return Object.entries(modeTargets).map(([mode, target]) => {
    const category = modeToCategory(mode as GoalMode);
    const current = transactions
      .filter((t) => {
        if (mode === "balanced") {
          return t.category !== "income";
        }

        if (!category) {
          return false;
        }

        return t.category === category;
      })
      .reduce((acc, t) => acc + t.amount, 0);

    return {
      mode,
      target,
      current,
      progressPct: target > 0 ? Math.min((current / target) * 100, 100) : 0
    };
  });
}
