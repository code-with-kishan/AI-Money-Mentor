import { runAnalyzeRoute } from "@/routes/analyze";
import { seedDemoUser } from "@/routes/demo";
import { sampleFinancialData, sampleUser } from "@/lib/demoData";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { user, financialData } = await seedDemoUser();
    const monthlyIncome = user.salary / 12;
    const monthlySavings = Math.max(monthlyIncome - user.expenses, 0);

    const analysis = await runAnalyzeRoute({
      name: user.name,
      age: user.age,
      salary: user.salary,
      expenses: user.expenses,
      investments: financialData.investments,
      monthlySavings,
    });

    return NextResponse.json({
      user,
      financialData,
      analysis,
    });
  } catch (error) {
    console.error("/api/demo failed", error);

    // Fallback keeps demo mode functional when MongoDB is not configured locally.
    const monthlyIncome = sampleUser.salary / 12;
    const monthlySavings = Math.max(monthlyIncome - sampleUser.expenses, 0);
    const analysis = await runAnalyzeRoute({
      name: sampleUser.name,
      age: sampleUser.age,
      salary: sampleUser.salary,
      expenses: sampleUser.expenses,
      investments: sampleFinancialData.investments,
      monthlySavings,
    });

    return NextResponse.json({
      user: sampleUser,
      financialData: sampleFinancialData,
      analysis,
      demoFallback: true,
    });
  }
}
