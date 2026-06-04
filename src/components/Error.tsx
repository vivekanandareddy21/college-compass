import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
  title?: string;
}

export function InlineError({ message = "Something went wrong.", onRetry }: ErrorProps) {
  return (
    <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 flex items-start space-x-3 text-red-700 animate-fadeIn">
      <AlertCircle className="w-5 h-5 mt-0.5 text-red-500 shrink-0" />
      <div className="flex-1">
        <p className="font-medium text-sm text-red-800">Error</p>
        <p className="text-sm mt-0.5">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-100/50 hover:bg-red-100 text-red-800 transition duration-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
}

export default function Error({ title = "Something went wrong", message = "An error occurred while loading this section.", onRetry }: ErrorProps) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-6 space-y-4 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 animate-pulse">
        <AlertCircle className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        <p className="text-slate-500 text-sm">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-primary-200 transition duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
