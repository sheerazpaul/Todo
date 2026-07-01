import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LoginForm } from "../components/auth/LoginForm";
import { CheckSquare } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel — branding */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex w-[45%] bg-gradient-to-br from-primary-600 to-primary-900 flex-col justify-between p-12 relative overflow-hidden"
      >
        {/* decorations */}
        <div className="absolute top-16 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-24" />
        <div className="absolute bottom-0 left-12 w-56 h-56 bg-white/5 rounded-full translate-y-16" />

        <Link to="/" className="relative flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <CheckSquare size={18} className="text-white" />
          </div>
          <span className="font-bold text-white text-xl">TaskFlow</span>
        </Link>

        <div className="relative">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Your focus,
            <br />
            <span className="text-primary-200">refined.</span>
          </h2>
          <p className="text-primary-300 text-sm leading-relaxed max-w-xs">
            Every task, every goal — organized exactly how your mind works.
            Welcome back to your workflow.
          </p>

          {/* Mini task card */}
          <div className="mt-10 bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/10">
            <p className="text-white/70 text-xs font-medium mb-3">TODAY'S FOCUS</p>
            {["Ship auth feature", "Review PR #42", "Weekly team sync"].map(
              (task, i) => (
                <div key={i} className="flex items-center gap-3 mb-2.5">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      i === 0
                        ? "bg-white border-white"
                        : "border-white/40"
                    }`}
                  >
                    {i === 0 && (
                      <svg className="w-2 h-2 text-primary-600" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-xs ${
                      i === 0 ? "line-through text-white/40" : "text-white/80"
                    }`}
                  >
                    {task}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <p className="relative text-primary-400 text-xs">
          © 2024 TaskFlow Inc.
        </p>
      </motion.div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <LoginForm />
      </div>
    </div>
  );
}
