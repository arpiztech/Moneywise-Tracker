"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RecurringPage() {
  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Recurring Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your recurring payments will be displayed here.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
