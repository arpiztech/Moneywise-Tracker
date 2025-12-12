"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CategoriesPage() {
  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <p>A list of all categories will be displayed here.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
