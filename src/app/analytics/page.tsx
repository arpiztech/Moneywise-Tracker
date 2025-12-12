"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { initialTransactions, type Transaction } from "@/lib/data";
import { IncomeExpenseChart } from "@/components/analytics/income-expense-chart";
import { SpendingTrendsChart } from "@/components/analytics/spending-trends-chart";
import { TopCategoriesChart } from "@/components/analytics/top-categories-chart";

export default function AnalyticsPage() {
  const [transactions] = useState<Transaction[]>(initialTransactions);
  
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-6">
        <h2 className="text-3xl font-bold font-headline">Analytics</h2>

        <IncomeExpenseChart transactions={transactions} />
        <SpendingTrendsChart transactions={transactions} />
        <TopCategoriesChart transactions={transactions} />
      </div>
    </DashboardLayout>
  );
}
