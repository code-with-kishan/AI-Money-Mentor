export type Role = "user" | "assistant";

export interface ChatMessage {
  role: Role;
  content: string;
  timestamp?: string;
}

export interface AnalyzeInput {
  name: string;
  age: number;
  salary: number;
  expenses: number;
  investments: number;
  monthlySavings: number;
}

export interface AnalyzeOutput {
  score: number;
  savingsRate: number;
  emergencyMonths: number;
  insights: string[];
  recommendations: string[];
}

export interface SipInput {
  monthlyInvestment: number;
  annualReturnRate: number;
  years: number;
}

export interface SipOutput {
  investedAmount: number;
  estimatedReturns: number;
  maturityAmount: number;
}

export interface TaxInput {
  annualSalary: number;
  deductions: number;
}

export interface TaxOutput {
  oldRegimeTax: number;
  newRegimeTax: number;
  betterRegime: "old" | "new";
  taxSaving: number;
  breakdown?: {
    oldRegime: {
      grossIncome: number;
      totalDeductions: number;
      taxableIncome: number;
      taxBeforeCess: number;
      cess: number;
      finalTax: number;
    };
    newRegime: {
      grossIncome: number;
      totalDeductions: number; // usually 75000 std ded
      taxableIncome: number;
      taxBeforeCess: number;
      cess: number;
      finalTax: number;
    };
  };
}

export interface SimulateInput {
  currentCorpus: number;
  monthlyContribution: number;
  annualReturnRate: number;
  years: number;
}

export interface ProjectionPoint {
  year: number;
  value: number;
}

export interface SimulateOutput {
  finalCorpus: number;
  projections: ProjectionPoint[];
}

export interface PortfolioInput {
  holdings: Array<{
    asset: string;
    amount: number;
    category: string;
  }>;
}

export interface PortfolioOutput {
  totalValue: number;
  categorySplit: Record<string, number>;
  riskLevel: "low" | "moderate" | "high";
  notes: string[];
}
