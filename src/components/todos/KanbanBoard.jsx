import { DragDropContext } from "@hello-pangea/dnd";
import { KanbanColumn } from "./KanbanColumn";
import { useUpdateTodo } from "../../hooks/useTodos";
import { PageSpinner } from "../ui/Spinner";
import { ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

const COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

export function KanbanBoard({ todos, isLoading, isError }) {
  const updateTodo = useUpdateTodo();

  if (isLoading) return <PageSpinner />;

  if (isError) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-red-50">
          <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-700">Failed to load tasks</p>
        <p className="mt-1 text-xs text-gray-400">Check your connection and try again.</p>
      </div>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center py-16 text-center"
      >
        <div className="flex items-center justify-center mb-4 w-14 h-14 bg-primary-50 rounded-2xl">
          <ClipboardList size={24} className="text-primary-400" />
        </div>
        <p className="text-sm font-semibold text-gray-700">No tasks yet</p>
        <p className="mt-1 text-xs text-gray-400">
          Create your first task to get started.
        </p>
      </motion.div>
    );
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const todoToUpdate = todos.find((t) => t.id.toString() === draggableId);
    if (!todoToUpdate) return;

  
    updateTodo.mutate({
      id: todoToUpdate.id,
      status: destination.droppableId,
      completed: destination.droppableId === "DONE",
    });
  };

  const getTodosByStatus = (statusId) => {
    return todos.filter((todo) => {
      const currentStatus = todo.status || (todo.completed ? "DONE" : "TODO");
      return currentStatus === statusId;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            statusId={column.id}
            title={column.title}
            todos={getTodosByStatus(column.id)}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
