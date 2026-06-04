"use client";

import React from "react";
import { Star, MapPin, DollarSign, RotateCcw, SlidersHorizontal } from "lucide-react";

interface FilterPanelProps {
  selectedLocations: string[];
  setSelectedLocations: (locs: string[]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  minFee: number;
  setMinFee: (fee: number) => void;
  maxFee: number;
  setMaxFee: (fee: number) => void;
  onClearAll: () => void;
}

const availableLocations = [
  { label: "California", value: "CA" },
  { label: "Massachusetts", value: "MA" },
  { label: "New York", value: "NY" },
  { label: "Texas", value: "TX" },
  { label: "Washington", value: "WA" },
  { label: "Illinois", value: "IL" },
  { label: "Florida", value: "FL" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Georgia", value: "GA" },
  { label: "Colorado", value: "CO" },
];

export default function FilterPanel({
  selectedLocations,
  setSelectedLocations,
  minRating,
  setMinRating,
  minFee,
  setMinFee,
  maxFee,
  setMaxFee,
  onClearAll,
}: FilterPanelProps) {
  const handleLocationChange = (val: string) => {
    if (selectedLocations.includes(val)) {
      setSelectedLocations(selectedLocations.filter((item) => item !== val));
    } else {
      setSelectedLocations([...selectedLocations, val]);
    }
  };

  const ratings = [0, 4.5, 4.0, 3.5];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-5 h-5 text-slate-800" />
          <h3 className="font-bold text-slate-800 text-lg">Filters</h3>
        </div>
        <button
          onClick={onClearAll}
          className="flex items-center space-x-1 text-xs text-slate-500 hover:text-primary-600 font-semibold transition duration-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Location Filter */}
      <div className="space-y-3">
        <label className="flex items-center space-x-1.5 text-sm font-bold text-slate-700">
          <MapPin className="w-4 h-4 text-slate-500" />
          <span>Location</span>
        </label>
        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
          {availableLocations.map((loc) => {
            const isChecked = selectedLocations.includes(loc.value);
            return (
              <label
                key={loc.value}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium border cursor-pointer select-none transition duration-150 ${
                  isChecked
                    ? "bg-primary-50 border-primary-200 text-primary-700"
                    : "border-slate-150 hover:bg-slate-50 text-slate-600"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleLocationChange(loc.value)}
                  className="rounded text-primary-600 focus:ring-primary-500 border-slate-300 w-3.5 h-3.5"
                />
                <span>{loc.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Min Rating Filter */}
      <div className="space-y-3">
        <label className="flex items-center space-x-1.5 text-sm font-bold text-slate-700">
          <Star className="w-4 h-4 text-slate-500" />
          <span>Minimum Rating</span>
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {ratings.map((rate) => {
            const isSelected = minRating === rate;
            return (
              <button
                key={rate}
                type="button"
                onClick={() => setMinRating(rate)}
                className={`py-2 px-1 rounded-xl text-xs font-semibold border transition duration-150 ${
                  isSelected
                    ? "bg-primary-50 border-primary-200 text-primary-700"
                    : "border-slate-150 hover:bg-slate-50 text-slate-600"
                }`}
              >
                {rate === 0 ? "Any" : `${rate}★`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fee Range Filter */}
      <div className="space-y-3">
        <label className="flex items-center space-x-1.5 text-sm font-bold text-slate-700">
          <DollarSign className="w-4 h-4 text-slate-500" />
          <span>Annual Fees (USD)</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Min</span>
            <input
              type="number"
              value={minFee || ""}
              onChange={(e) => setMinFee(Number(e.target.value))}
              placeholder="0"
              className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200/60 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Max</span>
            <input
              type="number"
              value={maxFee || ""}
              onChange={(e) => setMaxFee(Number(e.target.value))}
              placeholder="No Limit"
              className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200/60 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
