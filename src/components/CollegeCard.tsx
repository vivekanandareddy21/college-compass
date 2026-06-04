"use client";

import React from "react";
import Link from "next/link";
import { Star, MapPin, TrendingUp, DollarSign, Heart, ArrowRight } from "lucide-react";
import { College } from "@/types";

interface CollegeCardProps {
  college: College;
  isSaved?: boolean;
  onSaveToggle?: () => void;
  isComparing?: boolean;
  onCompareToggle?: () => void;
  compareCount?: number;
}

export default function CollegeCard({
  college,
  isSaved = false,
  onSaveToggle,
  isComparing = false,
  onCompareToggle,
  compareCount = 0,
}: CollegeCardProps) {
  const formattedFees = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(college.fees);

  return (
    <div className="bg-white rounded-2xl border border-slate-150/70 shadow-sm hover:shadow-md hover:border-slate-200 transition duration-300 flex flex-col justify-between overflow-hidden group">
      <div className="p-6 space-y-4">
        {/* Name and Rating */}
        <div className="flex justify-between items-start space-x-3">
          <h4 className="font-extrabold text-slate-800 text-lg tracking-tight group-hover:text-primary-600 transition duration-200 line-clamp-1">
            {college.name}
          </h4>
          <div className="flex items-center space-x-1 shrink-0 bg-amber-50 px-2.5 py-1 rounded-lg">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-amber-800 text-xs font-bold">{college.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-1.5 text-slate-500 text-xs font-medium">
          <MapPin className="w-3.5 h-3.5" />
          <span>{college.location}</span>
        </div>

        {/* Short Description Overview */}
        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
          {college.overview}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-100/80">
          <div className="space-y-0.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Annual Fee</div>
            <div className="flex items-center text-slate-800 font-extrabold text-sm">
              <DollarSign className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{formattedFees}</span>
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Placements</div>
            <div className="flex items-center text-slate-800 font-extrabold text-sm space-x-1">
              <TrendingUp className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{college.placementPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Tray */}
      <div className="px-6 pb-6 pt-2 bg-slate-50/50 flex items-center justify-between gap-3">
        {/* View Details Link */}
        <Link
          href={`/colleges/${college.id}`}
          className="flex items-center space-x-1 text-slate-700 hover:text-primary-600 font-bold text-xs transition duration-200"
        >
          <span>View details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition duration-200" />
        </Link>

        <div className="flex items-center space-x-2">
          {/* Compare Toggle Button */}
          {onCompareToggle && (
            <button
              onClick={onCompareToggle}
              title="Add to compare"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition duration-200 ${
                isComparing
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {isComparing ? "Comparing" : "Compare"}
            </button>
          )}

          {/* Bookmark / Save Toggle */}
          {onSaveToggle && (
            <button
              onClick={onSaveToggle}
              title={isSaved ? "Remove from bookmarks" : "Bookmark college"}
              className={`p-2 rounded-lg border transition duration-200 ${
                isSaved
                  ? "bg-red-50 border-red-150 text-red-650"
                  : "bg-white border-slate-200 text-slate-400 hover:text-red-500 hover:bg-slate-50"
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
