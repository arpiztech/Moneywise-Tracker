"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { format, eachDayOfInterval, startOfMonth, endOfMonth, subMonths } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
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

interface SpendingTrendsChartProps {
  transactions: Transaction[];
}

export function SpendingTrendsChart({ transactions }: SpendingTrendsChartProps) {
  const chartData = React.useMemo(() => {
    const today = new Date();
    const lastMonth = subMonths(today, 1);
    const start = startOfMonth(lastMonth);
    const end = endOfMonth(today);
    
    const days = eachDayOfInterval({ start, end });
    
    const data = days.map(day => {
        const dailyExpenses = transactions
            .filter(t => t.type === 'expense' && new Date(t.date).toDateString() === day.toDateString())
            .reduce((sum, t) => sum + t.amount, 0);
            
        return { date: format(day, 'MMM d'), expense: dailyExpenses };
    });
    
    return data;
  }, [transactions]);

  const chartConfig = {
    expense: {
      label: "Expense",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Trends</CardTitle>
        <CardDescription>Showing daily spending for the last 2 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value, index) => {
                // Show label for every 7th day
                if (index % 7 === 0) return value;
                return "";
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="expense"
              type="natural"
              fill="var(--color-expense)"
              fillOpacity={0.4}
              stroke="var(--color-expense)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
