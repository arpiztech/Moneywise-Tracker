"use client";

import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { initialTransactions, type Transaction, categories } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FilePen, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        if (filterType === "all") return true;
        return t.type === filterType;
      })
      .filter(t => t.description.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [transactions, searchTerm, filterType]);

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };
  
  // Placeholder for edit functionality
  const handleEdit = (id: string) => {
    console.log("Editing transaction:", id);
    // Here you would typically open a modal or form to edit the transaction
  };

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>Review and manage your financial history.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={filterType} onValueChange={(value: "all" | "income" | "expense") => setFilterType(value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-center">Type</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map(transaction => {
                    const CategoryIcon = categories[transaction.category]?.icon;
                    return (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium">{transaction.description}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {CategoryIcon && <CategoryIcon className="h-4 w-4 text-muted-foreground" />}
                            {transaction.category}
                          </div>
                        </TableCell>
                        <TableCell className={cn(
                          "text-right font-semibold",
                          transaction.type === 'income' ? 'text-chart-2' : 'text-foreground'
                        )}>
                           {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={transaction.type === 'income' ? 'secondary' : 'outline'} className={cn(transaction.type === 'income' && 'bg-green-100 dark:bg-green-900')}>
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                           <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(transaction.id)}>
                                <FilePen className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(transaction.id)} className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
