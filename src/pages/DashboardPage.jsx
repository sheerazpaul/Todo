import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, CheckCircle2, Clock, LayoutList } from "lucide-react";
import { Navbar } from "../components/ui/Navbar";
import { KanbanBoard } from "../components/todos/KanbanBoard";
import { TodoForm } from "../components/todos/TodoForm";
import { Modal } from "../components/ui/Modal";
import { Button } from "../components/ui/Button";
import { useTodos } from "../hooks/useTodos";
import { useAuthStore } from "../components/store/authStore";

export default function DashboardPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const { user } = useAuthStore();


  const allQuery = useTodos("all");
  const allTodos = allQuery.data || [];

  const counts = {
    all: allTodos.length,
    todo: allTodos.filter((t) => t.status === "TODO" || (!t.status && !t.completed)).length,
    in_progress: allTodos.filter((t) => t.status === "IN_PROGRESS").length,
    done: allTodos.filter((t) => t.status === "DONE" || t.completed).length,
  };

  const completionPct = allTodos.length
    ? Math.round((counts.done / allTodos.length) * 100)
    : 0;

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <Navbar />

      <main className="max-w-5xl px-4 py-10 mx-auto sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900">
            Good day, {user?.username || "there"} 👋
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Here's what you need to focus on today.
          </p>
        </motion.div>

        {/* ── Stats Cards ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-3"
        >
          {[
            {
              label: "To Do",
              value: counts.todo,
              icon: <LayoutList size={18} className="text-gray-500" />,
              bg: "bg-gray-100",
            },
            {
              label: "In Progress",
              value: counts.in_progress,
              icon: <Clock size={18} className="text-amber-500" />,
              bg: "bg-amber-50",
            },
            {
              label: "Done",
              value: counts.done,
              icon: <CheckCircle2 size={18} className="text-emerald-500" />,
              bg: "bg-emerald-50",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="p-4 bg-white border border-gray-100 rounded-2xl shadow-card"
            >
              <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Progress Bar ─────────────────── */}
        {allTodos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4 mb-8 bg-white border border-gray-100 rounded-2xl shadow-card"
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-sm font-medium text-gray-700">
                Overall Progress
              </span>
              <span className="text-sm font-bold text-primary-600">
                {completionPct}%
              </span>
            </div>
            <div className="h-2 overflow-hidden bg-gray-100 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPct}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
              />
            </div>
          </motion.div>
        )}

        {/* ── Toolbar ─────────────────────── */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-800">Your Board</h2>
          <Button onClick={() => setCreateOpen(true)} size="sm">
            <Plus size={16} />
            New Task
          </Button>
        </div>

        {/* ── Kanban Board ───────────────────── */}
        <KanbanBoard
          todos={allQuery.data}
          isLoading={allQuery.isLoading}
          isError={allQuery.isError}
        />
      </main>

      {/* Create Modal */}
      <Modal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        title="New Task"
      >
        <TodoForm onClose={() => setCreateOpen(false)} />
      </Modal>
    </div>
  );
}
