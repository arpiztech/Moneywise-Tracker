"use client";

import { useState } from 'react';

import { initialTransactions, type Transaction } from '@/lib/data';

import { Overview } from '@/components/dashboard/overview';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { BudgetOverview } from '@/components/dashboard/budget-overview';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { FinancialInsights } from '@/components/dashboard/financial-insights';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'> & { date: Date }) => {
    setTransactions(prev => [
      ...prev,
      { ...transaction, id: crypto.randomUUID(), date: new Date(transaction.date) },
    ]);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold font-headline">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Overview income={totalIncome} expense={totalExpenses} balance={balance} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactions transactions={transactions} />
        </div>
        <div className="space-y-6">
          <BudgetOverview expenses={totalExpenses} />
          <SpendingChart transactions={transactions} />
          <FinancialInsights transactions={transactions} />
        </div>
      </div>
    </DashboardLayout>
  );
}
