"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight, BarChart3, Heart, Search, CheckCircle2 } from "lucide-react";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/colleges");
    }
  };

  const features = [
    {
      icon: Search,
      title: "Smart Search & Filters",
      desc: "Find colleges that check all your boxes by filtering location, annual tuition fees, and minimum ratings.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: BarChart3,
      title: "Side-by-Side Comparison",
      desc: "Select and compare up to three colleges at once on fees, placement rates, ratings, and course counts.",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: Heart,
      title: "Personal Bookmarks",
      desc: "Save your favorite institutions to your personal profile so you can evaluate them later at your convenience.",
      color: "bg-red-50 text-red-650",
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50/30 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10 animate-fadeIn">
          <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 font-bold px-4 py-1.5 rounded-full text-xs">
            <GraduationCap className="w-4 h-4" />
            <span>Discover Your Ideal Academic Path</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Navigate Your College Search with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">
              Confidence
            </span>
          </h1>

          <p className="text-slate-500 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Compare tuition, locations, ratings, and placement records to make the absolute best decision for your education.
          </p>

          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={handleSearch} placeholder="Search 20+ top-tier universities (e.g., Apex, Evergreen)..." />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/colleges"
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-primary-200 transition duration-200"
            >
              <span>Explore Colleges</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/compare"
              className="flex items-center space-x-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl shadow-sm transition duration-200"
            >
              <span>Compare Tools</span>
            </Link>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-100/30 rounded-full blur-3xl pointer-events-none z-0"></div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Everything you need to decide</h2>
          <p className="text-slate-500 max-w-lg mx-auto font-medium text-sm sm:text-base">
            We simplify complex application decisions. Discover, shortlist, and weigh your choices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300 space-y-4"
              >
                <div className={`p-3.5 rounded-xl w-fit ${feature.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Statistics / Trust Section */}
      <section className="bg-slate-900 py-16 text-white text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10">
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-extrabold text-primary-400">20+</div>
            <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Top Institutions</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-extrabold text-indigo-400">100%</div>
            <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Verified Placements</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400">10,000+</div>
            <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Student Reviews</div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none z-0"></div>
      </section>
    </div>
  );
}
