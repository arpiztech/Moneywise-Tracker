"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HelpPage() {

  const faqs = [
    {
      question: "How do I add a new transaction?",
      answer: "Click the 'Add Transaction' button in the sidebar. A form will appear where you can enter the transaction type, amount, description, category, and date."
    },
    {
      question: "Can I edit or delete a transaction?",
      answer: "Yes. Go to the 'Transactions' page. You'll see a list of all your transactions. Click the three-dots menu on any transaction to find the 'Edit' and 'Delete' options."
    },
    {
      question: "How do I set a budget?",
      answer: "Navigate to the 'Budget Planner' page. Here you can set a monthly spending limit for each expense category. The app will track your spending against the budget."
    },
    {
      question: "What formats can I export my data in?",
      answer: "You can export your data in CSV, Excel, and PDF formats from the 'Export Data' page."
    }
  ]

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Help & Support</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
