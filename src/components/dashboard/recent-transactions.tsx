import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type Transaction, categories } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const sortedTransactions = [...transactions].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>You have {transactions.length} transactions in total.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px]">
          <div className="space-y-4 pr-6">
            {sortedTransactions.length > 0 ? sortedTransactions.map((transaction) => {
              const CategoryIcon = categories[transaction.category]?.icon || categories['Shopping'].icon;
              return (
                <div key={transaction.id} className="flex items-center gap-4">
                  <div className="bg-accent/20 rounded-lg p-3">
                    <CategoryIcon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date.toLocaleDateString()}</p>
                  </div>
                  <div className={cn(
                    "font-semibold",
                    transaction.type === 'income' ? 'text-chart-2' : 'text-foreground'
                  )}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </div>
                </div>
              );
            }) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No transactions yet.
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
