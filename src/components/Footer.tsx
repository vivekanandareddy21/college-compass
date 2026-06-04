import React from "react";
import Link from "next/link";
import { GraduationCap, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 text-white font-extrabold text-xl">
              <div className="p-2 bg-slate-800 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-400" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-indigo-400 tracking-tight">
                College Compass
              </span>
            </Link>
            <p className="text-sm max-w-sm">
              Helping students navigate higher education paths. Search, compare, and bookmark top colleges with ease and confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/colleges" className="hover:text-white transition duration-200">
                  Colleges
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white transition duration-200">
                  Compare
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-white transition duration-200">
                  Saved Colleges
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Social */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-850 flex flex-col sm:flex-row justify-between items-center text-xs">
          <p>© {new Date().getFullYear()} College Compass. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-4 sm:mt-0">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for students everywhere.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
