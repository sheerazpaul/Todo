import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} from "../api/todoApi";

const TODOS_KEY = ["todos"];

export function useTodos(filter = "all") {
  return useQuery({
    queryKey: TODOS_KEY,
    queryFn: getTodos,
    select: (data) => {
      if (filter === "active") return data.filter((t) => !t.completed);
      if (filter === "completed") return data.filter((t) => t.completed);
      return data;
    },
    staleTime: 30_000,
  });
}

export function useCreateTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onMutate: async (newTodo) => {
      await qc.cancelQueries({ queryKey: TODOS_KEY });
      const previous = qc.getQueryData(TODOS_KEY);
      qc.setQueryData(TODOS_KEY, (old = []) => [
        ...old,
        { id: Date.now(), completed: false, ...newTodo },
      ]);
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      qc.setQueryData(TODOS_KEY, ctx.previous);
      toast.error("Failed to create task.");
    },
    onSuccess: () => toast.success("Task created!"),
    onSettled: () => qc.invalidateQueries({ queryKey: TODOS_KEY }),
  });
}

export function useUpdateTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updated) => {
      await qc.cancelQueries({ queryKey: TODOS_KEY });
      const previous = qc.getQueryData(TODOS_KEY);
      qc.setQueryData(TODOS_KEY, (old = []) =>
        old.map((t) => (t.id === updated.id ? { ...t, ...updated } : t))
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      qc.setQueryData(TODOS_KEY, ctx.previous);
      toast.error("Failed to update task.");
    },
    onSuccess: () => toast.success("Task updated!"),
    onSettled: () => qc.invalidateQueries({ queryKey: TODOS_KEY }),
  });
}

export function useToggleTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: toggleTodo,
    onMutate: async ({ id, completed }) => {
      await qc.cancelQueries({ queryKey: TODOS_KEY });
      const previous = qc.getQueryData(TODOS_KEY);
      qc.setQueryData(TODOS_KEY, (old = []) =>
        old.map((t) => (t.id === id ? { ...t, completed } : t))
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      qc.setQueryData(TODOS_KEY, ctx.previous);
      toast.error("Failed to toggle task.");
    },
    onSettled: () => qc.invalidateQueries({ queryKey: TODOS_KEY }),
  });
}

export function useDeleteTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: TODOS_KEY });
      const previous = qc.getQueryData(TODOS_KEY);
      qc.setQueryData(TODOS_KEY, (old = []) =>
        old.filter((t) => t.id !== id)
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      qc.setQueryData(TODOS_KEY, ctx.previous);
      toast.error("Failed to delete task.");
    },
    onSuccess: () => toast.success("Task deleted."),
    onSettled: () => qc.invalidateQueries({ queryKey: TODOS_KEY }),
  });
}
