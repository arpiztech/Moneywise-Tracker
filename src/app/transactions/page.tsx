"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TransactionsPage() {
  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p>A list of all transactions will be displayed here.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
