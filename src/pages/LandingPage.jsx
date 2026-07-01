import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckSquare,
  ArrowRight,
  Play,
  Zap,
  RefreshCw,
  BarChart2,
  Star,
} from "lucide-react";

import { Button } from "../components/ui/Button";
import { Navbar } from "../components/ui/Navbar";

/* ─── Hero Mock Widget ─────────────────────────── */
const mockTasks = [
  { title: "Refine landing page interactions", tag: "NEW", done: true },
  { title: "Review quarterly analytics report", tag: "MID", done: false },
  { title: "Design System documentation", tag: "HIGH", done: false },
];

const TAG_COLORS = {
  NEW: "bg-emerald-100 text-emerald-700",
  MID: "bg-amber-100 text-amber-700",
  HIGH: "bg-red-100 text-red-600",
};

function HeroWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 w-full max-w-xs"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-gray-800 text-sm">Focus Sessions</span>
        <button className="text-gray-300 hover:text-gray-500 transition-colors">
          •••
        </button>
      </div>
      <ul className="space-y-3">
        {mockTasks.map((task, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex items-center gap-3"
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                task.done
                  ? "bg-primary-600 border-primary-600"
                  : "border-gray-300"
              }`}
            >
              {task.done && (
                <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 12 12">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className={`text-xs flex-1 ${task.done ? "line-through text-gray-400" : "text-gray-700"}`}>
              {task.title}
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${TAG_COLORS[task.tag]}`}>
              {task.tag}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Features ─────────────────────────────────── */
const features = [
  {
    icon: <Zap size={20} className="text-primary-600" />,
    title: "Smart Organization",
    desc: "AI-driven prioritization that learns your workflow habits and automatically suggests your next most impactful task.",
    link: "Learn More",
  },
  {
    icon: <RefreshCw size={20} className="text-primary-600" />,
    title: "Seamless Sync",
    desc: "Real-time synchronization across all your devices with end-to-end encryption. Pick up exactly where you left off.",
    link: "See Integrations",
  },
  {
    icon: <BarChart2 size={20} className="text-primary-600" />,
    title: "Advanced Analytics",
    desc: "Identify productivity bottlenecks with deep visual insights and weekly performance trends generated from your habits.",
    link: "View Dashboard",
  },
];

/* ─── Testimonials ─────────────────────────────── */
const testimonials = [
  {
    text: "The glassmorphic interface isn't just eye candy. It creates a focused, calm workspace that I didn't know I needed until I used TaskFlow.",
    name: "Sarah Jenkins",
    role: "Design Lead, Apex Studio",
    avatar: "SJ",
  },
  {
    text: "Finally, a productivity app that understands the balance between power and simplicity. It's my morning ritual now.",
    name: "Marcus Thorne",
    role: "Full-Stack Architect",
    avatar: "MT",
  },
  {
    text: "The smart prioritization actually works. I spend less time planning and more time actually doing. Remarkable tool.",
    name: "Elena Rodriguez",
    role: "Founder, Visionary Lab",
    avatar: "ER",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* ── Hero ─────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-primary-100"
          >
            <Star size={12} />
            TRUSTED BY 50K+ PROFESSIONALS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight"
          >
            Orchestrate your{" "}
            <span className="text-primary-600">flow</span>
            <br />
            with surgical precision.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 mt-5 text-base leading-relaxed max-w-md"
          >
            TaskFlow combines minimal design with powerful automation to
            eliminate mental clutter and focus on what truly moves the needle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex items-center gap-3 mt-8"
          >
            <Link to="/register">
              <Button size="lg" className="shadow-sm">
                Start Building Your Workflow
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="lg" className="gap-2">
                <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                  <Play size={10} fill="currentColor" className="text-gray-600 ml-0.5" />
                </div>
                Watch Demo
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Widget */}
        <div className="flex justify-center md:justify-end">
          <HeroWidget />
        </div>
      </section>

      {/* ── Features ─────────────────────────── */}
      <section id="features" className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900"
            >
              Engineered for Frictionless Work
            </motion.h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              We stripped away the noise to leave you with the features that
              actually matter for elite productivity.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover transition-shadow group"
              >
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {f.desc}
                </p>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                >
                  {f.link} <ArrowRight size={13} />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────── */}
      <section id="testimonials" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900"
            >
              Loved by those who build the future.
            </motion.h2>
            <p className="text-gray-500 mt-2 text-sm max-w-sm">
              From solo founders to design agencies, TaskFlow is the secret
              weapon of high-output teams.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array(5).fill(0).map((_, s) => (
                    <Star key={s} size={14} fill="#FBBF24" className="text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-xs font-bold text-primary-700">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-12 text-center relative overflow-hidden"
          >
            {/* BG decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -translate-x-10 translate-y-10" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Ready to find your flow?
              </h2>
              <p className="text-primary-200 text-sm mb-8 max-w-md mx-auto">
                Join 50,000+ high-performers who have already reclaimed their
                focus. Start your free 14-day trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/register">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-primary-700 hover:bg-primary-50 border-0 shadow-soft"
                  >
                    Get Started for Free
                  </Button>
                </Link>
                <Button
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                >
                  Schedule a Demo
                </Button>
              </div>
              <p className="text-primary-300 text-xs mt-5">
                No credit card required · Cancel anytime
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────── */}
      <footer className="border-t border-gray-100 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
              <CheckSquare size={12} className="text-white" />
            </div>
            <span className="font-bold text-gray-800 text-sm">
              Task<span className="text-primary-600">Flow</span>
            </span>
          </div>
          <p className="text-xs text-gray-400">© 2024 TaskFlow Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Contact Support</a>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors"></a>
            <a href="#" className="hover:text-gray-600 transition-colors"></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
