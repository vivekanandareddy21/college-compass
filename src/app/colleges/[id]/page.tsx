"use client";

import React, { use, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Star, MapPin, DollarSign, TrendingUp, BookOpen, Heart, BarChart3, ArrowLeft, MessageSquare } from "lucide-react";
import { useColleges } from "@/hooks/useColleges";
import { useAuth } from "@/hooks/useAuth";
import { CollegeWithRelations } from "@/types";
import { CollegeDetailSkeleton } from "@/components/Loading";
import Error from "@/components/Error";

export default function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();

  const {
    loading,
    error,
    getCollegeById,
    getSavedColleges,
    saveCollege,
    unsaveCollege,
  } = useColleges();

  const [college, setCollege] = useState<CollegeWithRelations | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isComparing, setIsComparing] = useState(false);

  const loadDetails = useCallback(async () => {
    try {
      const data = await getCollegeById(id);
      setCollege(data);
    } catch (err) {
      console.error(err);
    }
  }, [id, getCollegeById]);

  const loadSavedState = useCallback(async () => {
    if (!user) return;
    try {
      const saved = await getSavedColleges();
      setIsSaved(saved.some((s) => s.collegeId === id));
    } catch (err) {
      console.error(err);
    }
  }, [user, id, getSavedColleges]);

  // Sync comparison state
  const syncCompareState = useCallback(() => {
    const cached = localStorage.getItem("cc_compare");
    if (cached) {
      try {
        const ids = JSON.parse(cached);
        setIsComparing(ids.includes(id));
      } catch (e) {
        localStorage.removeItem("cc_compare");
      }
    }
  }, [id]);

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  useEffect(() => {
    loadSavedState();
  }, [loadSavedState]);

  useEffect(() => {
    syncCompareState();
  }, [syncCompareState]);

  const handleSaveToggle = async () => {
    if (!user) {
      router.push(`/login?redirect=/colleges/${id}`);
      return;
    }

    const nextSavedState = !isSaved;
    setIsSaved(nextSavedState);

    try {
      if (isSaved) {
        await unsaveCollege(id);
      } else {
        await saveCollege(id);
      }
    } catch (err) {
      setIsSaved(!nextSavedState); // Revert
    }
  };

  const handleCompareToggle = () => {
    const cached = localStorage.getItem("cc_compare");
    let ids: string[] = [];
    if (cached) {
      try {
        ids = JSON.parse(cached);
      } catch (e) {}
    }

    if (isComparing) {
      ids = ids.filter((cid) => cid !== id);
      setIsComparing(false);
    } else {
      if (ids.length >= 3) {
        alert("You can compare a maximum of 3 colleges. Remove one from your comparison list first.");
        return;
      }
      ids.push(id);
      setIsComparing(true);
    }
    localStorage.setItem("cc_compare", JSON.stringify(ids));
  };

  if (error) {
    return (
      <div className="py-16">
        <Error message={error} onRetry={loadDetails} />
      </div>
    );
  }

  if (loading || !college) {
    return <CollegeDetailSkeleton />;
  }

  const formattedFees = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(college.fees);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center space-x-1.5 text-slate-500 hover:text-slate-800 font-semibold text-sm transition duration-150"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Directory</span>
      </button>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {college.name}
            </h1>
            <div className="flex items-center space-x-1 bg-amber-50 px-3 py-1 rounded-xl shrink-0 border border-amber-150/40">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-amber-900 text-sm font-bold">{college.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-slate-500 text-sm font-medium">
            <MapPin className="w-4 h-4" />
            <span>{college.location}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={handleCompareToggle}
            className={`flex-1 md:flex-none flex items-center justify-center space-x-2 px-5 py-3 border rounded-xl text-sm font-bold transition duration-200 ${
              isComparing
                ? "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100/50"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{isComparing ? "Comparing" : "Compare"}</span>
          </button>
          <button
            onClick={handleSaveToggle}
            className={`flex items-center justify-center p-3 border rounded-xl transition duration-200 ${
              isSaved
                ? "bg-red-50 border-red-150 text-red-650"
                : "bg-white border-slate-200 text-slate-400 hover:text-red-500 hover:bg-slate-50"
            }`}
          >
            <Heart className={`w-5 h-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Columns (Overview & Courses & Reviews) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <section className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-800">Institute Overview</h2>
            <p className="text-slate-550 leading-relaxed text-sm sm:text-base">
              {college.overview}
            </p>
          </section>

          {/* Courses */}
          <section className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-slate-850">
              <BookOpen className="w-5 h-5 text-primary-500" />
              <h2 className="text-xl font-bold text-slate-800">Offered Courses</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {college.courses.map((course) => (
                <div key={course.id} className="py-4 flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-800">{course.name}</span>
                  <span className="text-slate-500 font-medium bg-slate-50 px-2.5 py-1 rounded-lg">
                    {course.duration}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Student Reviews */}
          <section className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center space-x-2 text-slate-855">
              <MessageSquare className="w-5 h-5 text-primary-500" />
              <h2 className="text-xl font-bold text-slate-800">Student Reviews ({college.reviews.length})</h2>
            </div>
            <div className="space-y-6">
              {college.reviews.map((review) => (
                <div key={review.id} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-slate-400 text-xs font-semibold">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              ))}
              {college.reviews.length === 0 && (
                <p className="text-slate-400 text-sm text-center py-6">No student reviews available yet.</p>
              )}
            </div>
          </section>
        </div>

        {/* Right Sidebar stats card */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-150/60 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-extrabold text-slate-800 text-lg">Key Facts & Figures</h3>
            <div className="space-y-4 divide-y divide-slate-100">
              {/* Fees */}
              <div className="flex justify-between items-center py-1">
                <span className="text-sm font-semibold text-slate-500 flex items-center space-x-1.5">
                  <DollarSign className="w-4 h-4 text-slate-400" />
                  <span>Annual Tuition</span>
                </span>
                <span className="text-base font-extrabold text-slate-900">{formattedFees}</span>
              </div>

              {/* Placements */}
              <div className="flex justify-between items-center pt-3 py-1">
                <span className="text-sm font-semibold text-slate-500 flex items-center space-x-1.5">
                  <TrendingUp className="w-4 h-4 text-slate-400" />
                  <span>Placement Rate</span>
                </span>
                <span className="text-base font-extrabold text-slate-900">{college.placementPercentage}%</span>
              </div>

              {/* Rating count */}
              <div className="flex justify-between items-center pt-3 py-1">
                <span className="text-sm font-semibold text-slate-500 flex items-center space-x-1.5">
                  <Star className="w-4 h-4 text-slate-400" />
                  <span>Reviews Count</span>
                </span>
                <span className="text-sm font-extrabold text-slate-900">{college.reviews.length} reviews</span>
              </div>
            </div>

            {/* Quick check-in details */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Important Note</span>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Tuition fees do not cover board, books, or living expenses. Placement figures represent graduates employed within 6 months of graduation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
