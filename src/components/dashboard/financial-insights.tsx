"use client"

import { useState } from 'react';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getFinancialInsights, type FinancialInsightsInput } from '@/ai/flows/financial-insights-flow';
import { type Transaction } from '@/lib/data';

interface FinancialInsightsProps {
  transactions: Transaction[];
}

export function FinancialInsights({ transactions }: FinancialInsightsProps) {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState('');
  const [error, setError] = useState('');

  const handleGetInsights = async () => {
    setLoading(true);
    setError('');
    setRecommendations('');

    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .map(t => ({ category: t.category, amount: t.amount }));

    if (income === 0 && expenses.length === 0) {
        setError('Please add some income and expenses to get insights.');
        setLoading(false);
        return;
    }

    const input: FinancialInsightsInput = {
      income,
      expenses,
      savingsGoal: 1000, // mock savings goal
    };

    try {
      const result = await getFinancialInsights(input);
      setRecommendations(result.recommendations);
    } catch (e: any) {
      setError(e.message || 'Failed to get financial insights.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="p-2 bg-accent/20 rounded-lg">
            <Lightbulb className="h-6 w-6 text-accent" />
        </div>
        <div>
            <CardTitle>Financial Insights</CardTitle>
            <CardDescription>AI-powered recommendations</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations && (
          <Alert className="bg-primary/10">
            <AlertTitle className="font-bold">Recommendations</AlertTitle>
            <AlertDescription className="whitespace-pre-wrap">{recommendations}</AlertDescription>
          </Alert>
        )}
        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <Button onClick={handleGetInsights} disabled={loading} className="w-full" variant="outline">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : 'Get AI Recommendations'}
        </Button>
      </CardContent>
    </Card>
  );
}
