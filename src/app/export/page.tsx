"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ExportPage() {
  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Options to export your data will be available here.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
