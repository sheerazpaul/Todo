import { forwardRef } from "react";
import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-primary-600 hover:bg-primary-700 text-white shadow-sm focus:ring-primary-500",
  secondary:
    "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm focus:ring-primary-500",
  ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-400",
  danger:
    "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 focus:ring-red-400",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-2.5 text-base",
};

export const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    className = "",
    isLoading = false,
    disabled,
    ...props
  },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.97 }}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg font-medium
        transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}
      {children}
    </motion.button>
  );
});
