import React from "react";

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export function CollegeCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-pulse space-y-4">
      <div className="flex justify-between items-start">
        <div className="h-6 bg-slate-200 rounded w-2/3"></div>
        <div className="h-6 bg-slate-200 rounded w-12"></div>
      </div>
      <div className="h-4 bg-slate-200 rounded w-1/3"></div>
      <div className="space-y-2 py-2">
        <div className="h-3 bg-slate-200 rounded w-full"></div>
        <div className="h-3 bg-slate-200 rounded w-5/6"></div>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
      </div>
      <div className="flex space-x-2 pt-4">
        <div className="h-10 bg-slate-200 rounded-xl flex-1"></div>
        <div className="h-10 bg-slate-200 rounded-xl w-10"></div>
        <div className="h-10 bg-slate-200 rounded-xl w-10"></div>
      </div>
    </div>
  );
}

export function CollegeDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-pulse">
      <div className="space-y-4">
        <div className="h-10 bg-slate-200 rounded w-1/3"></div>
        <div className="flex space-x-4">
          <div className="h-5 bg-slate-200 rounded w-24"></div>
          <div className="h-5 bg-slate-200 rounded w-24"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
            <div className="h-6 bg-slate-200 rounded w-1/4"></div>
            <div className="h-20 bg-slate-200 rounded w-full"></div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
            <div className="h-6 bg-slate-200 rounded w-1/4"></div>
            <div className="h-12 bg-slate-200 rounded w-full"></div>
            <div className="h-12 bg-slate-200 rounded w-full"></div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
            <div className="h-6 bg-slate-200 rounded w-1/2"></div>
            <div className="h-8 bg-slate-200 rounded w-full"></div>
            <div className="h-8 bg-slate-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}
