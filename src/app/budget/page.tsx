"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BudgetPage() {
  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Budget Planner</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The budget planner will be displayed here.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
