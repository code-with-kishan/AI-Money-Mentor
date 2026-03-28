import { connectToDatabase } from "@/lib/mongodb";
import { sampleFinancialData, sampleUser } from "@/lib/demoData";
import { FinancialData } from "@/models/FinancialData";
import { User } from "@/models/User";

export async function seedDemoUser() {
  await connectToDatabase();

  let user = await User.findOne({ name: sampleUser.name });
  if (!user) {
    user = await User.create(sampleUser);
  }

  let financialData = await FinancialData.findOne({ userId: user._id });
  if (!financialData) {
    financialData = await FinancialData.create({
      userId: user._id,
      ...sampleFinancialData,
    });
  }

  return {
    user,
    financialData,
  };
}
