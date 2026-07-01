import { useState } from "react";
import { Pencil, Trash2, Calendar, GripVertical } from "lucide-react";
import { useDeleteTodo } from "../../hooks/useTodos";
import { Modal } from "../ui/Modal";
import { TodoForm } from "./TodoForm";
import { Draggable } from "@hello-pangea/dnd";

const PRIORITY_STYLES = {
  high: "bg-red-50 text-red-600 border-red-100",
  medium: "bg-amber-50 text-amber-600 border-amber-100",
  low: "bg-emerald-50 text-emerald-600 border-emerald-100",
};

const PRIORITY_DOT = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-emerald-500",
};

export function TodoItem({ todo, index }) {
  const [editOpen, setEditOpen] = useState(false);
  const deleteTodo = useDeleteTodo();

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const isCompleted = todo.status === "DONE" || todo.completed;
  const isOverdue =
    todo.due_date && !isCompleted && new Date(todo.due_date) < new Date();

  return (
    <>
      <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`group bg-white rounded-xl border px-3 py-3 flex items-start gap-3 transition-all ${
              isCompleted ? "border-gray-100 opacity-70 bg-gray-50/50" : "border-gray-200 shadow-sm"
            } ${snapshot.isDragging ? "shadow-lg scale-[1.02] z-50 ring-2 ring-primary-500" : ""}`}
            style={{
              ...provided.draggableProps.style,
            }}
          >
            {/* Drag Handle */}
            <div className="mt-1 flex-shrink-0 text-gray-300 group-hover:text-gray-500 transition-colors cursor-grab">
              <GripVertical size={16} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium leading-snug ${
                  isCompleted
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {todo.title}
              </p>

              {todo.description && (
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {todo.description}
                </p>
              )}

              {/* Meta */}
              <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                {todo.priority && (
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${
                      PRIORITY_STYLES[todo.priority] || PRIORITY_STYLES.medium
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        PRIORITY_DOT[todo.priority] || "bg-gray-400"
                      }`}
                    />
                    {todo.priority}
                  </span>
                )}

                {todo.due_date && (
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      isOverdue
                        ? "bg-red-50 text-red-500"
                        : "bg-gray-50 text-gray-500"
                    }`}
                  >
                    <Calendar size={10} />
                    {isOverdue ? "Overdue · " : ""}
                    {formatDate(todo.due_date)}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditOpen(true);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                aria-label="Edit"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTodo.mutate(todo.id);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                aria-label="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        )}
      </Draggable>

      {/* Edit Modal */}
      <Modal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Task"
      >
        <TodoForm todo={todo} onClose={() => setEditOpen(false)} />
      </Modal>
    </>
  );
}
