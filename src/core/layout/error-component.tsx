// src/core/layout/error-component.tsx
import React from "react";

export const ErrorComponent: React.FC<{ error?: Error | null }> = ({
  error,
}) => {
  return (
    <div className="w-full h-64 flex flex-col items-center justify-center bg-white rounded-md shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-red-600">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-slate-600 max-w-xl text-center">
        An unexpected error occurred while rendering this page.
      </p>
      {error?.message && (
        <pre className="mt-4 p-3 bg-slate-50 rounded w-full text-xs text-red-700 border overflow-auto">
          {error.message}
        </pre>
      )}
    </div>
  );
};
