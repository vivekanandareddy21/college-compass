"use client";

import { useState, useCallback } from "react";
import { College, CollegeWithRelations, CollegeListResponse, SavedCollege } from "@/types";
import { api } from "@/services/api";

export function useColleges() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getColleges = useCallback(async (filters: Record<string, any> = {}) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          if (Array.isArray(val)) {
            val.forEach((v) => queryParams.append(key, v));
          } else {
            queryParams.set(key, String(val));
          }
        }
      });

      return await api.get<CollegeListResponse>(`/api/colleges?${queryParams.toString()}`);
    } catch (err: any) {
      setError(err.message || "Failed to fetch colleges.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCollegeById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await api.get<CollegeWithRelations>(`/api/colleges/${id}`);
    } catch (err: any) {
      setError(err.message || "Failed to fetch college details.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getSavedColleges = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      return await api.get<SavedCollege[]>("/api/saved");
    } catch (err: any) {
      setError(err.message || "Failed to fetch saved colleges.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const saveCollege = useCallback(async (collegeId: string) => {
    setLoading(true);
    setError(null);
    try {
      return await api.post<{ success: boolean; saved: SavedCollege }>("/api/saved", { collegeId });
    } catch (err: any) {
      setError(err.message || "Failed to save college.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const unsaveCollege = useCallback(async (collegeId: string) => {
    setLoading(true);
    setError(null);
    try {
      return await api.delete<{ success: boolean }>(`/api/saved?collegeId=${collegeId}`);
    } catch (err: any) {
      setError(err.message || "Failed to remove saved college.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getComparison = useCallback(async (collegeIds: string[]) => {
    setLoading(true);
    setError(null);
    try {
      return await api.post<CollegeWithRelations[]>("/api/compare", { collegeIds });
    } catch (err: any) {
      setError(err.message || "Failed to compare colleges.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = () => setError(null);

  return {
    loading,
    error,
    getColleges,
    getCollegeById,
    getSavedColleges,
    saveCollege,
    unsaveCollege,
    getComparison,
    clearError,
  };
}
