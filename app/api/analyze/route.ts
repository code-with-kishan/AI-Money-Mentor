import { connectToDatabase } from "@/lib/mongodb";
import { FinancialData } from "@/models/FinancialData";
import { User } from "@/models/User";
import { runAnalyzeRoute } from "@/routes/analyze";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await runAnalyzeRoute(body);

    try {
      await connectToDatabase();
      const existingUser = await User.findOne({ name: body.name });
      if (existingUser) {
        await FinancialData.findOneAndUpdate(
          { userId: existingUser._id },
          {
            userId: existingUser._id,
            investments: body.investments,
            taxData: {
              annualSalary: body.salary,
              deductions: 0,
            },
            goals: [],
          },
          { upsert: true, new: true },
        );
      }
    } catch (dbError) {
      console.warn("/api/analyze persistence skipped:", dbError);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("/api/analyze failed", error);
    return NextResponse.json({ error: "Failed to analyze financial health." }, { status: 500 });
  }
}
