"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Heart, ArrowLeft, HelpCircle } from "lucide-react";
import { useColleges } from "@/hooks/useColleges";
import { SavedCollege } from "@/types";
import CollegeCard from "@/components/CollegeCard";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function SavedPage() {
  const { loading, error, getSavedColleges, unsaveCollege } = useColleges();
  const [savedColleges, setSavedColleges] = useState<SavedCollege[]>([]);

  const loadSaved = useCallback(async () => {
    try {
      const data = await getSavedColleges();
      setSavedColleges(data);
    } catch (err) {
      console.error(err);
    }
  }, [getSavedColleges]);

  useEffect(() => {
    loadSaved();
  }, [loadSaved]);

  const handleUnsave = async (collegeId: string) => {
    // Optimistic Update
    const previousState = [...savedColleges];
    setSavedColleges(savedColleges.filter((sc) => sc.collegeId !== collegeId));

    try {
      await unsaveCollege(collegeId);
    } catch (err) {
      // Rollback on error
      setSavedColleges(previousState);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Back Button */}
      <Link
        href="/colleges"
        className="flex items-center space-x-1.5 text-slate-500 hover:text-slate-800 font-semibold text-sm transition duration-150"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Directory</span>
      </Link>

      {/* Header Info */}
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-3">
          <div className="p-2 bg-red-50 text-red-500 rounded-xl">
            <Heart className="w-6 h-6 fill-red-500" />
          </div>
          <span>Saved Colleges</span>
        </h1>
        <p className="text-slate-550 text-sm font-medium">
          Manage your bookmarked institutions and check up on their core profiles and placements.
        </p>
      </div>

      {/* Main Grid View */}
      {error && <Error message={error} onRetry={loadSaved} />}

      {!error && loading && <Loading />}

      {!error && !loading && (
        <>
          {savedColleges.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl p-16 text-center space-y-5 max-w-lg mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto animate-pulse">
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-800">No Saved Colleges Yet</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto">
                  Find colleges you are interested in and tap the bookmark heart icon to save them to this dashboard.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
              {savedColleges.map((sc) => (
                <CollegeCard
                  key={sc.id}
                  college={sc.college}
                  isSaved={true}
                  onSaveToggle={() => handleUnsave(sc.collegeId)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
