"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, BarChart3, HelpCircle, X } from "lucide-react";
import { useColleges } from "@/hooks/useColleges";
import { useAuth } from "@/hooks/useAuth";
import { College, CollegeListResponse } from "@/types";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import CollegeCard from "@/components/CollegeCard";
import Loading, { CollegeCardSkeleton } from "@/components/Loading";
import Error from "@/components/Error";

function CollegesContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    loading,
    error,
    getColleges,
    getSavedColleges,
    saveCollege,
    unsaveCollege,
  } = useColleges();

  // Filters State initialized from SearchParams
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedLocations, setSelectedLocations] = useState<string[]>(searchParams.getAll("location") || []);
  const [minRating, setMinRating] = useState<number>(Number(searchParams.get("minRating")) || 0);
  const [minFee, setMinFee] = useState<number>(Number(searchParams.get("minFee")) || 0);
  const [maxFee, setMaxFee] = useState<number>(Number(searchParams.get("maxFee")) || 0);
  
  // Sorting & Pagination State
  const [sortBy, setSortBy] = useState<string>(searchParams.get("sortBy") || "name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">((searchParams.get("sortOrder") as "asc" | "desc") || "asc");
  const [page, setPage] = useState<number>(Number(searchParams.get("page")) || 1);

  // Result state
  const [collegeData, setCollegeData] = useState<CollegeListResponse | null>(null);
  
  // Saved / Bookmarks State
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  // Comparison State
  const [compareIds, setCompareIds] = useState<string[]>([]);
  
  // Mobile filter visibility
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch colleges list
  const loadColleges = useCallback(async () => {
    try {
      const res = await getColleges({
        search,
        location: selectedLocations,
        minRating,
        minFee: minFee || undefined,
        maxFee: maxFee || undefined,
        sortBy,
        sortOrder,
        page,
        limit: 6,
      });
      setCollegeData(res);
    } catch (err) {
      console.error(err);
    }
  }, [getColleges, search, selectedLocations, minRating, minFee, maxFee, sortBy, sortOrder, page]);

  // Load user bookmark IDs
  const loadSavedIds = useCallback(async () => {
    if (!user) return;
    try {
      const saved = await getSavedColleges();
      setSavedIds(new Set(saved.map((s) => s.collegeId)));
    } catch (err) {
      console.error("Failed to load user bookmarks", err);
    }
  }, [user, getSavedColleges]);

  useEffect(() => {
    loadColleges();
  }, [loadColleges]);

  useEffect(() => {
    loadSavedIds();
  }, [loadSavedIds]);

  // Load Compare list from localStorage on mount
  useEffect(() => {
    const cached = localStorage.getItem("cc_compare");
    if (cached) {
      try {
        setCompareIds(JSON.parse(cached));
      } catch (e) {
        localStorage.removeItem("cc_compare");
      }
    }
  }, []);

  const updateCompareStorage = (ids: string[]) => {
    setCompareIds(ids);
    localStorage.setItem("cc_compare", JSON.stringify(ids));
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const handleClearAllFilters = () => {
    setSearch("");
    setSelectedLocations([]);
    setMinRating(0);
    setMinFee(0);
    setMaxFee(0);
    setSortBy("name");
    setSortOrder("asc");
    setPage(1);
  };

  const handleSaveToggle = async (collegeId: string) => {
    if (!user) {
      router.push(`/login?redirect=/colleges`);
      return;
    }

    const isCurrentlySaved = savedIds.has(collegeId);
    // Optimistic Update
    const nextSavedIds = new Set(savedIds);
    if (isCurrentlySaved) {
      nextSavedIds.delete(collegeId);
    } else {
      nextSavedIds.add(collegeId);
    }
    setSavedIds(nextSavedIds);

    try {
      if (isCurrentlySaved) {
        await unsaveCollege(collegeId);
      } else {
        await saveCollege(collegeId);
      }
    } catch (err) {
      // Revert on error
      setSavedIds(savedIds);
    }
  };

  const handleCompareToggle = (collegeId: string) => {
    const isComparing = compareIds.includes(collegeId);
    if (isComparing) {
      updateCompareStorage(compareIds.filter((id) => id !== collegeId));
    } else {
      if (compareIds.length >= 3) {
        alert("You can compare a maximum of 3 colleges. Remove one to add another.");
        return;
      }
      updateCompareStorage([...compareIds, collegeId]);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "name") {
      setSortBy("name");
      setSortOrder("asc");
    } else if (value === "rating") {
      setSortBy("rating");
      setSortOrder("desc");
    } else if (value === "fees-asc") {
      setSortBy("fees");
      setSortOrder("asc");
    } else if (value === "fees-desc") {
      setSortBy("fees");
      setSortOrder("desc");
    } else if (value === "placement") {
      setSortBy("placement");
      setSortOrder("desc");
    }
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Info */}
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Browse Colleges</h1>
        <p className="text-slate-500 text-sm font-medium">
          Filter through top-tier programs and select up to 3 colleges to compare details.
        </p>
      </div>

      {/* Search and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 border border-slate-100 rounded-2xl shadow-sm">
        <div className="w-full sm:max-w-md">
          <SearchBar onSearch={handleSearch} defaultValue={search} />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto shrink-0 justify-end">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center space-x-2 bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-xl transition hover:bg-slate-100 text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 text-sm text-slate-600 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 px-3 py-2 rounded-xl transition duration-150">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={handleSortChange}
              className="bg-transparent border-0 font-semibold text-slate-700 focus:ring-0 cursor-pointer focus:outline-none"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="rating-desc">Rating (High-Low)</option>
              <option value="fees-asc">Fees (Low-High)</option>
              <option value="fees-desc">Fees (High-Low)</option>
              <option value="placement-desc">Placements (High-Low)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Filter / Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Panel */}
        <div className="hidden lg:block">
          <FilterPanel
            selectedLocations={selectedLocations}
            setSelectedLocations={(locs) => {
              setSelectedLocations(locs);
              setPage(1);
            }}
            minRating={minRating}
            setMinRating={(rate) => {
              setMinRating(rate);
              setPage(1);
            }}
            minFee={minFee}
            setMinFee={(fee) => {
              setMinFee(fee);
              setPage(1);
            }}
            maxFee={maxFee}
            setMaxFee={(fee) => {
              setMaxFee(fee);
              setPage(1);
            }}
            onClearAll={handleClearAllFilters}
          />
        </div>

        {/* Mobile Filter Slide Out Drawer */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm lg:hidden flex justify-end">
            <div className="w-80 bg-white h-full p-6 shadow-xl relative animate-fadeIn flex flex-col justify-between overflow-y-auto">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="mt-8">
                <FilterPanel
                  selectedLocations={selectedLocations}
                  setSelectedLocations={setSelectedLocations}
                  minRating={minRating}
                  setMinRating={setMinRating}
                  minFee={minFee}
                  setMinFee={setMinFee}
                  maxFee={maxFee}
                  setMaxFee={setMaxFee}
                  onClearAll={handleClearAllFilters}
                />
              </div>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl shadow-md transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* College Listing Grid */}
        <div className="lg:col-span-3 space-y-8">
          {error && <Error message={error} onRetry={loadColleges} />}

          {!error && loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CollegeCardSkeleton key={i} />
              ))}
            </div>
          )}

          {!error && !loading && collegeData && (
            <>
              {collegeData.colleges.length === 0 ? (
                <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center space-y-4 max-w-md mx-auto shadow-sm">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mx-auto">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-800">No colleges found</h3>
                    <p className="text-slate-500 text-sm">
                      We couldn't find any colleges matching your active search terms or filters. Try adjusting your constraints!
                    </p>
                  </div>
                  <button
                    onClick={handleClearAllFilters}
                    className="bg-primary-50 text-primary-700 font-bold px-5 py-2.5 rounded-xl hover:bg-primary-100 transition duration-200 text-sm"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {collegeData.colleges.map((college) => (
                    <CollegeCard
                      key={college.id}
                      college={college}
                      isSaved={savedIds.has(college.id)}
                      onSaveToggle={() => handleSaveToggle(college.id)}
                      isComparing={compareIds.includes(college.id)}
                      onCompareToggle={() => handleCompareToggle(college.id)}
                    />
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {collegeData.pagination.totalPages > 1 && (
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="flex items-center space-x-1.5 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:text-slate-300 disabled:hover:bg-transparent transition duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <span className="text-sm font-medium text-slate-500">
                    Page <span className="font-extrabold text-slate-850">{collegeData.pagination.page}</span> of{" "}
                    <span className="font-extrabold text-slate-850">{collegeData.pagination.totalPages}</span>
                  </span>
                  <button
                    disabled={page === collegeData.pagination.totalPages}
                    onClick={() => setPage(page + 1)}
                    className="flex items-center space-x-1.5 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:text-slate-300 disabled:hover:bg-transparent transition duration-200"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Sticky Bottom Comparison Panel */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 border border-slate-800 text-white rounded-2xl px-6 py-4 shadow-xl flex items-center justify-between gap-6 w-[90%] max-w-xl animate-fadeIn">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-800 rounded-xl text-primary-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-tight">Compare Colleges</div>
              <div className="text-xs text-slate-400">
                {compareIds.length} of 3 selected
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateCompareStorage([])}
              className="text-xs text-slate-400 hover:text-white font-semibold transition py-2 px-3"
            >
              Clear
            </button>
            <button
              onClick={() => router.push("/compare")}
              className="bg-primary-650 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition duration-200 flex items-center space-x-1"
            >
              <span>Compare Now</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CollegesPage() {
  return (
    <React.Suspense fallback={<Loading />}>
      <CollegesContent />
    </React.Suspense>
  );
}
