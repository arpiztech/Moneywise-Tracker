"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { initialTransactions, type Transaction } from "@/lib/data";
import { IncomeExpenseChart } from "@/components/analytics/income-expense-chart";
import { SpendingTrendsChart } from "@/components/analytics/spending-trends-chart";
import { TopCategoriesChart } from "@/components/analytics/top-categories-chart";
import { Card } from "@/components/ui/card";

export default function AnalyticsPage() {
  const [transactions] = useState<Transaction[]>(initialTransactions);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold font-headline">Analytics</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IncomeExpenseChart transactions={transactions} />
            <SpendingTrendsChart transactions={transactions} />
        </div>
        <div className="grid grid-cols-1 gap-6">
            <TopCategoriesChart transactions={transactions} />
        </div>
      </div>
    </DashboardLayout>
  );
}
