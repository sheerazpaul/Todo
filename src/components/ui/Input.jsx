import { forwardRef } from "react";

export const Input = forwardRef(function Input(
  { label, error, className = "", id, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`
          w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900
          placeholder:text-gray-400 outline-none transition-all
          ${
            error
              ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-gray-200 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          }
          disabled:bg-gray-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
});
