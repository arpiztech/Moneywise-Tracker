import type { LucideIcon } from 'lucide-react';
import { UtensilsCrossed, Plane, Receipt, ShoppingBag, Landmark, Shirt, Home, Fuel, Gift, Clapperboard } from 'lucide-react';

export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: Date;
  description: string;
};

export type Category = {
  name:string;
  icon: LucideIcon;
};

export const categories: { [key: string]: Category } = {
  'Income': { name: 'Income', icon: Landmark },
  'Food': { name: 'Food', icon: UtensilsCrossed },
  'Travel': { name: 'Travel', icon: Plane },
  'Bills': { name: 'Bills', icon: Receipt },
  'Shopping': { name: 'Shopping', icon: ShoppingBag },
  'Housing': { name: 'Housing', icon: Home },
  'Transportation': { name: 'Transportation', icon: Fuel },
  'Entertainment': { name: 'Entertainment', icon: Clapperboard },
  'Gifts': { name: 'Gifts', icon: Gift },
  'Clothing': { name: 'Clothing', icon: Shirt },
};

export const initialTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    category: 'Income',
    amount: 5000,
    date: new Date('2024-07-01'),
    description: 'Monthly Salary',
  },
  {
    id: '2',
    type: 'expense',
    category: 'Housing',
    amount: 1500,
    date: new Date('2024-07-01'),
    description: 'Rent',
  },
  {
    id: '3',
    type: 'expense',
    category: 'Bills',
    amount: 200,
    date: new Date('2024-07-02'),
    description: 'Electricity Bill',
  },
  {
    id: '4',
    type: 'expense',
    category: 'Food',
    amount: 75,
    date: new Date('2024-07-03'),
    description: 'Groceries',
  },
  {
    id: '5',
    type: 'expense',
    category: 'Transportation',
    amount: 50,
    date: new Date('2024-07-04'),
    description: 'Gas',
  },
  {
    id: '6',
    type: 'expense',
    category: 'Entertainment',
    amount: 40,
    date: new Date('2024-07-05'),
    description: 'Movie tickets',
  },
  {
    id: '7',
    type: 'expense',
    category: 'Shopping',
    amount: 120,
    date: new Date('2024-07-06'),
    description: 'New shoes',
  },
];
