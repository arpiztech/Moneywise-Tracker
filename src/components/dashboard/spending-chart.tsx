"use client"

import * as React from "react"
import { Pie, PieChart as RechartsPieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { type Transaction } from "@/lib/data"

interface SpendingChartProps {
  transactions: Transaction[];
}

export function SpendingChart({ transactions }: SpendingChartProps) {
  const expenseData = React.useMemo(() => {
    const data = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, transaction) => {
        const existingCategory = acc.find(item => item.category === transaction.category);
        if (existingCategory) {
          existingCategory.total += transaction.amount;
        } else {
          acc.push({ category: transaction.category, total: transaction.amount });
        }
        return acc;
      }, [] as { category: string; total: number }[]);
    return data.sort((a,b) => b.total - a.total);
  }, [transactions]);

  const chartConfig = React.useMemo(() => {
    return expenseData.reduce((acc, item) => {
      acc[item.category] = { label: item.category };
      return acc;
    }, {} as ChartConfig);
  }, [expenseData]);

  const totalExpenses = React.useMemo(() => {
    return expenseData.reduce((acc, curr) => acc + curr.total, 0)
  }, [expenseData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>Breakdown of your expenses.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          {expenseData.length > 0 ? (
            <RechartsPieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={expenseData}
                dataKey="total"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
              </Pie>
            </RechartsPieChart>
          ) : (
             <div className="flex items-center justify-center h-full text-muted-foreground pt-4">
              No expense data to display.
            </div>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm pt-4">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total spent: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalExpenses)}
        </div>
      </CardFooter>
    </Card>
  )
}
