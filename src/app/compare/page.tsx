"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { BarChart3, ArrowLeft, Trash2, GraduationCap, HelpCircle } from "lucide-react";
import { useColleges } from "@/hooks/useColleges";
import { CollegeWithRelations } from "@/types";
import ComparisonTable from "@/components/ComparisonTable";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function ComparePage() {
  const { loading, error, getComparison } = useColleges();
  const [comparedColleges, setComparedColleges] = useState<CollegeWithRelations[]>([]);
  const [collegeIds, setCollegeIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Sync state with localStorage on mount
  useEffect(() => {
    const cached = localStorage.getItem("cc_compare");
    if (cached) {
      try {
        setCollegeIds(JSON.parse(cached));
      } catch (e) {
        localStorage.removeItem("cc_compare");
      }
    }
    setIsInitialized(true);
  }, []);

  const loadComparisonData = useCallback(async () => {
    if (collegeIds.length === 0) {
      setComparedColleges([]);
      return;
    }
    try {
      const data = await getComparison(collegeIds);
      setComparedColleges(data);
    } catch (err) {
      console.error("Failed to load comparisons", err);
    }
  }, [collegeIds, getComparison]);

  useEffect(() => {
    if (isInitialized) {
      loadComparisonData();
    }
  }, [isInitialized, loadComparisonData]);

  const handleRemoveCollege = (id: string) => {
    const updatedIds = collegeIds.filter((cid) => cid !== id);
    setCollegeIds(updatedIds);
    localStorage.setItem("cc_compare", JSON.stringify(updatedIds));
  };

  const handleClearAll = () => {
    setCollegeIds([]);
    localStorage.removeItem("cc_compare");
    setComparedColleges([]);
  };

  if (!isInitialized) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Back Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link
          href="/colleges"
          className="flex items-center space-x-1.5 text-slate-500 hover:text-slate-800 font-semibold text-sm transition duration-150"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </Link>

        {collegeIds.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center space-x-1.5 text-xs text-red-500 hover:text-red-650 font-bold px-3 py-1.5 rounded-lg hover:bg-red-50/50 border border-transparent hover:border-red-100 transition duration-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Comparison List</span>
          </button>
        )}
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <BarChart3 className="w-6 h-6" />
          </div>
          <span>College Comparison</span>
        </h1>
        <p className="text-slate-550 text-sm font-medium">
          Review side-by-side academic criteria including rating stars, yearly costs, placement rates, and course listings.
        </p>
      </div>

      {/* Main Content Area */}
      {error && <Error message={error} onRetry={loadComparisonData} />}

      {!error && loading && <Loading />}

      {!error && !loading && (
        <>
          {collegeIds.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl p-16 text-center space-y-5 max-w-lg mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto animate-pulse">
                <BarChart3 className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-800">Your Comparison List is Empty</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto">
                  Browse the college directory and select "Compare" on institutions to load them into this comparison workbench.
                </p>
              </div>
              <Link
                href="/colleges"
                className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-200 text-sm"
              >
                <span>Browse Colleges</span>
              </Link>
            </div>
          ) : (
            <ComparisonTable colleges={comparedColleges} onRemove={handleRemoveCollege} />
          )}
        </>
      )}
    </div>
  );
}
