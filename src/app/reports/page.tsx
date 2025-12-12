"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { initialTransactions, type Transaction, categories } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getMonth, getYear, startOfMonth } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export default function ReportsPage() {
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [selectedMonth, setSelectedMonth] = useState<string>(`${getYear(new Date())}-${getMonth(new Date())}`);

  const availableMonths = Array.from(
    new Set(transactions.map(t => `${getYear(t.date)}-${getMonth(t.date)}`))
  ).map(m => {
    const [year, month] = m.split('-');
    return {
      value: m,
      label: new Date(Number(year), Number(month)).toLocaleString('default', { month: 'long', year: 'numeric' })
    };
  });

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  }

  const [year, month] = selectedMonth.split('-').map(Number);
  const monthStart = startOfMonth(new Date(year, month));

  const filteredTransactions = transactions.filter(
    t => getYear(t.date) === year && getMonth(t.date) === month
  );

  const monthlyIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const monthlyExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const expensesByCategory = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = 0;
      }
      acc[t.category] += t.amount;
      return acc;
    }, {} as {[key: string]: number});
  
  const incomeVsExpenseRatio = monthlyIncome > 0 ? (monthlyExpenses / monthlyIncome) * 100 : 0;

  return (
    <DashboardLayout>
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Monthly Report</CardTitle>
            <CardDescription>A summary of your income and expenses for the selected month.</CardDescription>
          </div>
          <Select onValueChange={handleMonthChange} value={selectedMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {availableMonths.map(m => (
                <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Income</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-chart-2">{formatCurrency(monthlyIncome)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-destructive">{formatCurrency(monthlyExpenses)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Net Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={cn("text-2xl font-bold", (monthlyIncome - monthlyExpenses) >= 0 ? "text-foreground" : "text-destructive")}>
                    {formatCurrency(monthlyIncome - monthlyExpenses)}
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Income vs. Expense Ratio</CardTitle>
                    <CardDescription>You spent {incomeVsExpenseRatio.toFixed(2)}% of your income this month.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={incomeVsExpenseRatio} className="h-4" indicatorClassName={cn(incomeVsExpenseRatio > 80 && "bg-destructive")} />
                </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Spending by Category</h3>
            <div className="space-y-4">
              {Object.entries(expensesByCategory).length > 0 ? Object.entries(expensesByCategory)
                .sort(([, a], [, b]) => b - a)
                .map(([category, amount]) => {
                  const CategoryIcon = categories[category]?.icon;
                  const percentage = (amount / monthlyExpenses) * 100;
                  return (
                    <div key={category}>
                        <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-2">
                                {CategoryIcon && <CategoryIcon className="h-4 w-4 text-muted-foreground" />}
                                <span className="font-medium">{category}</span>
                            </div>
                            <span className="font-semibold">{formatCurrency(amount)}</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                    </div>
                  );
                }) : <p className="text-muted-foreground">No expenses recorded for this month.</p>}
            </div>
          </div>

        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
