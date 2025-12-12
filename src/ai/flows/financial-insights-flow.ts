'use server';

/**
 * @fileOverview A financial insights AI agent.
 *
 * - getFinancialInsights - A function that handles the financial insights process.
 * - FinancialInsightsInput - The input type for the getFinancialInsights function.
 * - FinancialInsightsOutput - The return type for the getFinancialInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialInsightsInputSchema = z.object({
  income: z.number().describe('The total income of the user.'),
  expenses: z.array(
    z.object({
      category: z.string().describe('The category of the expense.'),
      amount: z.number().describe('The amount of the expense.'),
    })
  ).describe('The list of expenses of the user.'),
  savingsGoal: z.number().optional().describe('The savings goal of the user.'),
});

export type FinancialInsightsInput = z.infer<typeof FinancialInsightsInputSchema>;

const FinancialInsightsOutputSchema = z.object({
  recommendations: z.string().describe('AI-driven recommendations for savings and spending.'),
});

export type FinancialInsightsOutput = z.infer<typeof FinancialInsightsOutputSchema>;

export async function getFinancialInsights(input: FinancialInsightsInput): Promise<FinancialInsightsOutput> {
  return financialInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialInsightsPrompt',
  input: {schema: FinancialInsightsInputSchema},
  output: {schema: FinancialInsightsOutputSchema},
  prompt: `You are a financial advisor providing personalized recommendations.

  Based on the user's income, expenses, and savings goal, provide actionable advice to improve their financial health.

  Consider various sources of information related to financial wellness, like current interest rates, investment opportunities, and saving strategies.

  Income: {{income}}
  Expenses: {{#each expenses}}- Category: {{category}}, Amount: {{amount}}\n{{/each}}
  Savings Goal: {{savingsGoal}}
  \n
  Give personalized recommendations:
  `,
});

const financialInsightsFlow = ai.defineFlow(
  {
    name: 'financialInsightsFlow',
    inputSchema: FinancialInsightsInputSchema,
    outputSchema: FinancialInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
