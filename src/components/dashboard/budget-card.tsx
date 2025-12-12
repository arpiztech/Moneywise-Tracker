"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { type Category } from '@/lib/data';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Edit, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface BudgetCardProps {
  category: Category;
  budget: number;
  spent: number;
  onUpdateBudget: (newAmount: number) => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export function BudgetCard({ category, budget, spent, onUpdateBudget }: BudgetCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const progress = Math.min((spent / budget) * 100, 100);
  const remaining = budget - spent;
  const CategoryIcon = category.icon;

  const handleSave = () => {
    onUpdateBudget(newBudget);
    setIsEditing(false);
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between p-4">
        <div className="flex items-center gap-4">
            <CategoryIcon className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-lg">{category.name}</CardTitle>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0">
        {isEditing ? (
            <div className="flex items-center gap-2">
                <Input type="number" value={newBudget} onChange={(e) => setNewBudget(Number(e.target.value))} className="h-9"/>
                <Button onClick={handleSave} size="sm">Save</Button>
            </div>
        ) : (
            <>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Spent</span>
                    <span className="font-medium">{formatCurrency(spent)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-medium">{formatCurrency(budget)}</span>
                </div>
                <Progress value={progress} className="h-2" indicatorClassName={cn(progress > 80 && "bg-destructive")} />
                {progress > 100 && (
                    <Alert variant="destructive" className="p-3">
                        <AlertDescription className="text-center">
                            You are {formatCurrency(Math.abs(remaining))} over budget!
                        </AlertDescription>
                    </Alert>
                )}
                 {progress <= 100 && progress > 80 && (
                    <Alert className="p-3 bg-amber-100 dark:bg-amber-900/50 border-amber-300 dark:border-amber-700">
                        <AlertDescription className="text-center text-amber-800 dark:text-amber-300">
                            You are nearing your budget limit.
                        </AlertDescription>
                    </Alert>
                )}
                {progress <= 80 && (
                     <p className="text-sm text-center text-muted-foreground">
                        {remaining >= 0 
                            ? `${formatCurrency(remaining)} left to spend` 
                            : `${formatCurrency(Math.abs(remaining))} over budget`}
                    </p>
                )}
            </>
        )}
      </CardContent>
    </Card>
  );
}
