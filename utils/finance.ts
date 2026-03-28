import { ProjectionPoint, SimulateInput, SipInput, SipOutput, TaxInput, TaxOutput } from "@/lib/types";

export function calculateSavingsRate(monthlySavings: number, salary: number): number {
  if (salary <= 0) return 0;
  const monthlyIncome = salary / 12;
  return Number(((monthlySavings / monthlyIncome) * 100).toFixed(2));
}

// SIP maturity formula: M = P * [((1 + i)^n - 1) / i] * (1 + i)
export function calculateSip({ monthlyInvestment, annualReturnRate, years }: SipInput): SipOutput {
  const totalMonths = years * 12;
  const monthlyRate = annualReturnRate / (12 * 100);

  if (monthlyRate <= 0 || totalMonths <= 0) {
    const investedAmount = monthlyInvestment * totalMonths;
    return {
      investedAmount,
      estimatedReturns: 0,
      maturityAmount: investedAmount,
    };
  }

  const maturityAmount =
    monthlyInvestment * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
  const investedAmount = monthlyInvestment * totalMonths;

  return {
    investedAmount: Number(investedAmount.toFixed(2)),
    estimatedReturns: Number((maturityAmount - investedAmount).toFixed(2)),
    maturityAmount: Number(maturityAmount.toFixed(2)),
  };
}

export function calculateCompoundGrowth(
  principal: number,
  monthlyContribution: number,
  annualReturnRate: number,
  years: number,
): ProjectionPoint[] {
  const monthlyRate = annualReturnRate / (12 * 100);
  const totalMonths = years * 12;
  const points: ProjectionPoint[] = [];
  let corpus = principal;

  for (let month = 1; month <= totalMonths; month += 1) {
    corpus = corpus * (1 + monthlyRate) + monthlyContribution;
    if (month % 12 === 0) {
      points.push({
        year: month / 12,
        value: Number(corpus.toFixed(2)),
      });
    }
  }

  return points;
}

export function calculateTaxIndia({ annualSalary, deductions }: TaxInput): TaxOutput {
  const taxableOld = Math.max(annualSalary - deductions - 50000, 0);
  const taxableNew = Math.max(annualSalary - 75000, 0);

  const oldRegimeTax = taxBySlabs(taxableOld, [
    [250000, 0],
    [250000, 0.05],
    [500000, 0.2],
    [Number.POSITIVE_INFINITY, 0.3],
  ]);

  const newRegimeTax = taxBySlabs(taxableNew, [
    [300000, 0],
    [300000, 0.05],
    [300000, 0.1],
    [300000, 0.15],
    [300000, 0.2],
    [300000, 0.25],
    [Number.POSITIVE_INFINITY, 0.3],
  ]);

  const oldWithCess = Number((oldRegimeTax * 1.04).toFixed(2));
  const newWithCess = Number((newRegimeTax * 1.04).toFixed(2));
  const betterRegime = oldWithCess <= newWithCess ? "old" : "new";

  return {
    oldRegimeTax: oldWithCess,
    newRegimeTax: newWithCess,
    betterRegime,
    taxSaving: Number(Math.abs(oldWithCess - newWithCess).toFixed(2)),
    breakdown: {
      oldRegime: {
        grossIncome: annualSalary,
        totalDeductions: deductions + 50000,
        taxableIncome: taxableOld,
        taxBeforeCess: oldRegimeTax,
        cess: Number((oldRegimeTax * 0.04).toFixed(2)),
        finalTax: oldWithCess,
      },
      newRegime: {
        grossIncome: annualSalary,
        totalDeductions: 75000,
        taxableIncome: taxableNew,
        taxBeforeCess: newRegimeTax,
        cess: Number((newRegimeTax * 0.04).toFixed(2)),
        finalTax: newWithCess,
      }
    }
  };
}

function taxBySlabs(income: number, slabs: Array<[number, number]>): number {
  let remaining = income;
  let tax = 0;

  for (const [slabAmount, rate] of slabs) {
    if (remaining <= 0) break;
    const taxablePart = Math.min(remaining, slabAmount);
    tax += taxablePart * rate;
    remaining -= taxablePart;
  }

  return tax;
}

export function buildSimulation(input: SimulateInput) {
  const projections = calculateCompoundGrowth(
    input.currentCorpus,
    input.monthlyContribution,
    input.annualReturnRate,
    input.years,
  );

  const finalCorpus = projections.length > 0 ? projections[projections.length - 1].value : input.currentCorpus;

  return {
    finalCorpus,
    projections,
  };
}
