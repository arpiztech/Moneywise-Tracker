
"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { initialTransactions, type Transaction } from "@/lib/data";
import { Download } from "lucide-react";

// Import libraries for exporting data
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export default function ExportPage() {
    const [transactions] = useState<Transaction[]>(initialTransactions);

    const exportToCSV = () => {
        const headers = ["Date", "Description", "Category", "Type", "Amount"];
        const rows = transactions.map(t => [
            t.date.toLocaleDateString(),
            t.description,
            t.category,
            t.type,
            t.amount
        ]);

        let csvContent = "data:text/csv;charset=utf-8," 
            + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToExcel = () => {
        const worksheet = utils.json_to_sheet(transactions.map(t => ({
            Date: t.date.toLocaleDateString(),
            Description: t.description,
            Category: t.category,
            Type: t.type,
            Amount: t.amount,
        })));
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Transactions");
        writeFile(workbook, "transactions.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Transactions Report", 14, 16);
        (doc as any).autoTable({
            head: [['Date', 'Description', 'Category', 'Type', 'Amount']],
            body: transactions.map(t => [
                t.date.toLocaleDateString(),
                t.description,
                t.category,
                t.type,
                t.amount.toFixed(2)
            ]),
            startY: 20,
        });
        doc.save('transactions.pdf');
    };

    return (
        <DashboardLayout>
            <Card>
                <CardHeader>
                    <CardTitle>Export Data</CardTitle>
                    <CardDescription>Download your transaction data in various formats.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4">
                   <Button onClick={exportToCSV} variant="outline">
                       <Download className="mr-2 h-4 w-4" />
                       Export to CSV
                   </Button>
                   <Button onClick={exportToExcel} variant="outline">
                       <Download className="mr-2 h-4 w-4" />
                       Export to Excel
                   </Button>
                   <Button onClick={exportToPDF} variant="outline">
                       <Download className="mr-2 h-4 w-4" />
                       Export to PDF
                   </Button>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
