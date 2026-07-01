import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckSquare,
  LayoutDashboard,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useLogout } from "../../hooks/useAuth";
import { Button } from "../ui/Button";

export function Navbar() {
  const { user, accessToken } = useAuthStore();
  const logout = useLogout();
  const navigate = useNavigate();
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur-md"
    >
      <div className="flex items-center justify-between h-16 max-w-6xl px-4 mx-auto sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-600">
            <CheckSquare size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Task<span className="text-primary-600">Flow</span>
          </span>
        </Link>

        {/* Center nav — landing only */}
        {!accessToken && (
          <div className="items-center hidden gap-6 text-sm sm:flex">
            <a href="#features" className="text-gray-500 transition-colors hover:text-gray-800">
              Features
            </a>
            <a href="#testimonials" className="text-gray-500 transition-colors hover:text-gray-800">
              Testimonials
            </a>
            <a href="#pricing" className="text-gray-500 transition-colors hover:text-gray-800">
              Pricing
            </a>
          </div>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {accessToken ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
              >
                <LayoutDashboard size={16} />
                <span className="hidden sm:inline">Dashboard</span>
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 text-sm">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100">
                  <User size={12} className="text-primary-600" />
                </div>
                <span className="hidden font-medium text-gray-700 sm:inline">
                  {user?.username || "User"}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => logout.mutate()}
                isLoading={logout.isPending}
                className="text-gray-500"
              >
                <LogOut size={15} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
