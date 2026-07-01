import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RegisterForm } from "../components/auth/RegisterForm";
import { CheckSquare, Zap, Shield, BarChart2 } from "lucide-react";

const perks = [
  { icon: <Zap size={14} />, text: "Smart AI task prioritization" },
  { icon: <Shield size={14} />, text: "End-to-end encrypted sync" },
  { icon: <BarChart2 size={14} />, text: "Weekly productivity insights" },
];

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex w-[45%] bg-gradient-to-br from-primary-600 to-primary-900 flex-col justify-between p-12 relative overflow-hidden"
      >
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
            Start achieving
            <br />
            <span className="text-primary-200">more today.</span>
          </h2>
          <p className="text-primary-300 text-sm leading-relaxed max-w-xs mb-8">
            Join 50,000+ professionals who use TaskFlow to eliminate mental
            clutter and ship what matters.
          </p>

          <div className="space-y-3">
            {perks.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 border border-white/10"
              >
                <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center text-white">
                  {p.icon}
                </div>
                <span className="text-white/80 text-sm">{p.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="relative text-primary-400 text-xs">
          © 2024 TaskFlow Inc.
        </p>
      </motion.div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <RegisterForm />
      </div>
    </div>
  );
}
