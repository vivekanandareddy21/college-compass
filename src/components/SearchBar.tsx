"use client";

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  defaultValue?: string;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  defaultValue = "",
  placeholder = "Search colleges by name...",
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full shadow-lg shadow-slate-100 hover:shadow-xl hover:shadow-slate-200/80 rounded-2xl transition duration-300"
    >
      <div className="flex items-center bg-white border border-slate-200/60 rounded-2xl overflow-hidden px-4 py-2">
        <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border-0 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 text-base py-1"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-105 transition duration-150 mr-2"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2 rounded-xl transition duration-200 shrink-0"
        >
          Search
        </button>
      </div>
    </form>
  );
}
