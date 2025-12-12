"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { categories as initialCategories, type Transaction, initialTransactions } from "@/lib/data";
import { BudgetCard } from "@/components/dashboard/budget-card";

export default function BudgetPage() {
  // In a real app, budgets would be saved and fetched. Here we'll initialize them.
  const [budgets, setBudgets] = useState<{[key: string]: number}>(() => {
    const initialBudgets: {[key: string]: number} = {};
    Object.keys(initialCategories).forEach(cat => {
      if (cat !== 'Income') {
        initialBudgets[cat] = Math.floor(Math.random() * 500) + 100; // Random initial budget
      }
    });
    return initialBudgets;
  });

  const [transactions] = useState<Transaction[]>(initialTransactions);

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = 0;
      }
      acc[t.category] += t.amount;
      return acc;
    }, {} as {[key: string]: number});

  const handleUpdateBudget = (category: string, newAmount: number) => {
    setBudgets(prev => ({...prev, [category]: newAmount}));
  }

  const expenseCategories = Object.entries(initialCategories).filter(([key]) => key !== 'Income');

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Budget Planner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expenseCategories.map(([key, category]) => (
              <BudgetCard
                key={key}
                category={category}
                budget={budgets[key] || 0}
                spent={expensesByCategory[key] || 0}
                onUpdateBudget={(newAmount) => handleUpdateBudget(key, newAmount)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
