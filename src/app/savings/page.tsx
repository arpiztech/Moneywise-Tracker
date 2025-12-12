"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SavingsPage() {
  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Savings Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your savings goals will be displayed here.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
