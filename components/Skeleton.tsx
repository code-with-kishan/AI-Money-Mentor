import { ReactNode } from "react";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />;
}

type SectionSkeletonProps = {
  titleWidth?: string;
  lines?: number;
  className?: string;
};

export function SectionSkeleton({ titleWidth = "w-40", lines = 3, className = "" }: SectionSkeletonProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <Skeleton className={`h-5 ${titleWidth}`} />
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton key={index} className="h-4 w-full" />
      ))}
    </div>
  );
}

type LoaderDotsProps = {
  label?: ReactNode;
};

export function LoaderDots({ label = "Loading" }: LoaderDotsProps) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-slate-300" role="status" aria-live="polite">
      <span>{label}</span>
      <span className="loading-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </div>
  );
}
