import { DemoButton } from "@/components/DemoButton";
import { FeatureGrid } from "@/components/FeatureGrid";
import { HeroSection } from "@/components/HeroSection";
import { MainNav } from "@/components/MainNav";
import { StoryChartSection } from "@/components/StoryChartSection";
import { AnimatedCoinsSection } from "@/components/AnimatedCoinsSection";
import { CustomerReviews } from "@/components/CustomerReviews";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-5 sm:px-8 lg:px-12 pb-14">
        <MainNav />
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-14">
          <HeroSection />
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <DemoButton />
            <p className="text-sm text-slate-300/85">
              Demo mode seeds a sample Indian user profile and shows working analytics in under 3 minutes.
            </p>
          </div>
          <FeatureGrid />
          <StoryChartSection />
        </main>
      </div>

      {/* 3D Coin Animations Section */}
      <AnimatedCoinsSection />

      {/* Customer Reviews & Social Proof */}
      <CustomerReviews />
    </div>
  );
}
