"use client"

import * as React from "react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

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

interface TopCategoriesChartProps {
  transactions: Transaction[];
}

export function TopCategoriesChart({ transactions }: TopCategoriesChartProps) {
  const chartData = React.useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, transaction) => {
        const existingCategory = acc.find(item => item.category === transaction.category);
        if (existingCategory) {
          existingCategory.total += transaction.amount;
        } else {
          acc.push({ category: transaction.category, total: transaction.amount });
        }
        return acc;
      }, [] as { category: string; total: number }[])
      .sort((a,b) => a.total - b.total)
      .slice(-5); // Get top 5
  }, [transactions]);

  const chartConfig = {
    total: {
      label: "Total Spent",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Spending Categories</CardTitle>
        <CardDescription>Your highest spending categories.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 10,
            }}
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 15)}
            />
            <XAxis dataKey="total" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="total" layout="vertical" fill="var(--color-total)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
