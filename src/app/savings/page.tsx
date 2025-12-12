
"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function SavingsPage() {
  // Mock data for now
  const savingsGoals = [
    { id: 1, name: "Vacation to Hawaii", target: 5000, saved: 1200 },
    { id: 2, name: "New Laptop", target: 2000, saved: 1800 },
    { id: 3, name: "Emergency Fund", target: 10000, saved: 9500 },
  ];

  return (
    <DashboardLayout>
       <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Savings Goals</CardTitle>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savingsGoals.map(goal => (
            <Card key={goal.id}>
              <CardHeader>
                <CardTitle className="text-lg">{goal.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-baseline">
                    <span className="text-2xl font-bold">${goal.saved.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground"> of ${goal.target.toLocaleString()}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5 mt-4">
                    <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${(goal.saved / goal.target) * 100}%` }}>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
