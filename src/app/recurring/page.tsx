
"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function RecurringPage() {
  // Mock data for now
  const recurringPayments = [
    { id: 1, name: "Netflix Subscription", category: "Entertainment", amount: 15.99, nextDueDate: "2024-08-01", frequency: "Monthly" },
    { id: 2, name: "Gym Membership", category: "Health", amount: 40.00, nextDueDate: "2024-08-05", frequency: "Monthly" },
    { id: 3, name: "Car Insurance", category: "Transportation", amount: 120.50, nextDueDate: "2024-08-15", frequency: "Monthly" },
    { id: 4, name: "Rent", category: "Housing", amount: 1500.00, nextDueDate: "2024-08-01", frequency: "Monthly" },
  ];

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Recurring Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Next Due Date</TableHead>
                <TableHead>Frequency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recurringPayments.map(payment => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{payment.category}</Badge>
                  </TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.nextDueDate}</TableCell>
                  <TableCell>{payment.frequency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
