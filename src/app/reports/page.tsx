
"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { initialTransactions, type Transaction, categories } from "@/lib/data";
import { getMonth, getYear, startOfMonth } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export default function ReportsPage() {
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setIsPickerOpen(false);
    }
  }

  const currentMonthStart = startOfMonth(selectedDate);
  const year = getYear(currentMonthStart);
  const month = getMonth(currentMonthStart);

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
          <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
            <PopoverTrigger asChild>
                <Button
                variant={"outline"}
                className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                )}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "MMMM yyyy") : <span>Pick a month</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange}
                    initialFocus
                    captionLayout="dropdown-buttons"
                    fromYear={2015}
                    toYear={new Date().getFullYear() + 5}
                />
            </PopoverContent>
          </Popover>
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
