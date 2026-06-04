"use client";

import React from "react";
import Link from "next/link";
import { Star, MapPin, DollarSign, TrendingUp, BookOpen, Trash2, X, Plus } from "lucide-react";
import { CollegeWithRelations } from "@/types";

interface ComparisonTableProps {
  colleges: CollegeWithRelations[];
  onRemove: (id: string) => void;
}

export default function ComparisonTable({ colleges, onRemove }: ComparisonTableProps) {
  const formatFees = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const maxCols = 3;
  const emptySlots = maxCols - colleges.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-150 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] table-fixed divide-y divide-slate-100">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="w-1/4 p-6 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                Compare Criteria
              </th>
              {colleges.map((college) => (
                <th key={college.id} className="w-1/4 p-6 text-left align-top relative group">
                  <div className="space-y-2 pr-6">
                    <Link
                      href={`/colleges/${college.id}`}
                      className="font-extrabold text-slate-800 hover:text-primary-650 transition text-base block leading-snug line-clamp-2"
                    >
                      {college.name}
                    </Link>
                    <div className="text-slate-400 text-xs font-semibold flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{college.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(college.id)}
                    title="Remove college"
                    className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-55/60 rounded-lg transition duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </th>
              ))}
              {Array.from({ length: emptySlots }).map((_, i) => (
                <th key={`empty-header-${i}`} className="w-1/4 p-6 text-left align-middle text-slate-400">
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-1.5">
                    <Plus className="w-5 h-5 text-slate-350" />
                    <span className="text-xs font-semibold">Slot Available</span>
                    <Link
                      href="/colleges"
                      className="text-[10px] bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold px-2 py-1 rounded-md transition duration-200"
                    >
                      Browse Colleges
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {/* Annual Fees */}
            <tr>
              <td className="p-6 font-semibold text-slate-500 flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-slate-400" />
                <span>Annual Fees</span>
              </td>
              {colleges.map((college) => (
                <td key={`fees-${college.id}`} className="p-6 text-slate-900 font-extrabold">
                  {formatFees(college.fees)}
                  <span className="text-[10px] font-medium text-slate-400 block mt-0.5">USD / Year</span>
                </td>
              ))}
              {Array.from({ length: emptySlots }).map((_, i) => (
                <td key={`fees-empty-${i}`} className="p-6 text-slate-300">—</td>
              ))}
            </tr>

            {/* Rating */}
            <tr>
              <td className="p-6 font-semibold text-slate-500 flex items-center space-x-2">
                <Star className="w-4 h-4 text-slate-400" />
                <span>Rating</span>
              </td>
              {colleges.map((college) => (
                <td key={`rating-${college.id}`} className="p-6">
                  <div className="flex items-center space-x-1.5 bg-amber-50/70 border border-amber-100/50 w-fit px-2.5 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-amber-900 font-bold">{college.rating.toFixed(1)}</span>
                  </div>
                </td>
              ))}
              {Array.from({ length: emptySlots }).map((_, i) => (
                <td key={`rating-empty-${i}`} className="p-6 text-slate-300">—</td>
              ))}
            </tr>

            {/* Placements */}
            <tr>
              <td className="p-6 font-semibold text-slate-500 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-slate-400" />
                <span>Placements Rate</span>
              </td>
              {colleges.map((college) => (
                <td key={`placements-${college.id}`} className="p-6">
                  <div className="space-y-1">
                    <span className="font-extrabold text-slate-800">{college.placementPercentage}%</span>
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${college.placementPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              ))}
              {Array.from({ length: emptySlots }).map((_, i) => (
                <td key={`placements-empty-${i}`} className="p-6 text-slate-300">—</td>
              ))}
            </tr>

            {/* Courses Count */}
            <tr>
              <td className="p-6 font-semibold text-slate-500 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>Total Courses</span>
              </td>
              {colleges.map((college) => (
                <td key={`courses-count-${college.id}`} className="p-6 text-slate-800 font-bold">
                  {college.courses.length} Courses
                </td>
              ))}
              {Array.from({ length: emptySlots }).map((_, i) => (
                <td key={`courses-count-empty-${i}`} className="p-6 text-slate-300">—</td>
              ))}
            </tr>

            {/* Courses Offered Details */}
            <tr className="align-top">
              <td className="p-6 font-semibold text-slate-500 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>Offered Courses</span>
              </td>
              {colleges.map((college) => (
                <td key={`courses-list-${college.id}`} className="p-6">
                  <ul className="space-y-1.5 list-disc pl-4 text-slate-600 text-xs">
                    {college.courses.map((course) => (
                      <li key={course.id} className="leading-relaxed">
                        <span className="font-semibold text-slate-800">{course.name}</span>{" "}
                        <span className="text-slate-400">({course.duration})</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
              {Array.from({ length: emptySlots }).map((_, i) => (
                <td key={`courses-list-empty-${i}`} className="p-6 text-slate-300">—</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
