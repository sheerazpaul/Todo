import { Droppable } from "@hello-pangea/dnd";
import { TodoItem } from "./TodoItem";

const COLUMN_STYLES = {
  TODO: "bg-gray-50 border-gray-200",
  IN_PROGRESS: "bg-amber-50/50 border-amber-100",
  DONE: "bg-emerald-50/50 border-emerald-100",
};

export function KanbanColumn({ statusId, title, todos }) {
  return (
    <div className={`flex flex-col rounded-2xl border p-4 min-h-[400px] ${COLUMN_STYLES[statusId] || COLUMN_STYLES.TODO}`}>
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
        <span className="text-xs font-medium bg-white border text-gray-500 rounded-full px-2 py-0.5 shadow-sm">
          {todos.length}
        </span>
      </div>

      <Droppable droppableId={statusId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 flex flex-col gap-3 transition-colors rounded-xl p-1 ${
              snapshot.isDraggingOver ? "bg-black/5" : ""
            }`}
          >
            {todos.map((todo, index) => (
              <TodoItem key={todo.id} todo={todo} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
