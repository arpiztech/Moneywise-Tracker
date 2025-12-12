import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface BudgetOverviewProps {
  expenses: number;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export function BudgetOverview({ expenses }: BudgetOverviewProps) {
  const budget = 2500; // Mock budget
  const progress = Math.min((expenses / budget) * 100, 100);
  const remaining = budget - expenses;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget</CardTitle>
        <CardDescription>Monthly budget tracking.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Spent</span>
            <span className="font-medium">{formatCurrency(expenses)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Budget</span>
            <span className="font-medium">{formatCurrency(budget)}</span>
        </div>
        <Progress value={progress} className="h-2" indicatorClassName={cn(progress > 80 && "bg-destructive")} />
        <p className="text-sm text-center text-muted-foreground">
          {remaining >= 0 
            ? `${formatCurrency(remaining)} left to spend` 
            : `${formatCurrency(Math.abs(remaining))} over budget`}
        </p>
      </CardContent>
    </Card>
  );
}
