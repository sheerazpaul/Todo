import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useCreateTodo, useUpdateTodo } from "../../hooks/useTodos";

const PRIORITY_OPTIONS = [
  { value: "L", label: "Low", color: "text-emerald-600 bg-emerald-50" },
  { value: "M", label: "Medium", color: "text-amber-600 bg-amber-50" },
  { value: "H", label: "High", color: "text-red-600 bg-red-50" },
];

export function TodoForm({ todo, onClose }) {
  const isEdit = Boolean(todo);
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: todo?.title || "",
      description: todo?.description || "",
      priority: todo?.priority || "medium",
      due_date: todo?.due_date || "",
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      due_date: data.due_date || null,
    };

    if (isEdit) {
      updateTodo.mutate(
        { id: todo.id, ...payload },
        { onSuccess: onClose }
      );
    } else {
      createTodo.mutate(payload, { onSuccess: onClose });
    }
  };

  const isPending = createTodo.isPending || updateTodo.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="title"
        label="Task title"
        placeholder="e.g. Design landing page"
        error={errors.title?.message}
        {...register("title", { required: "Title is required" })}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Description{" "}
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Add more details..."
          className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none"
          {...register("description")}
        />
      </div>

      {/* Priority */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Priority</label>
        <div className="flex gap-2">
          {PRIORITY_OPTIONS.map((p) => (
            <label
              key={p.value}
              className="flex-1 cursor-pointer"
            >
              <input
                type="radio"
                value={p.value}
                className="sr-only peer"
                {...register("priority")}
              />
              <div
                className={`text-center py-2 rounded-lg border-2 text-xs font-semibold transition-all
                  peer-checked:border-primary-500 peer-checked:bg-primary-50 peer-checked:text-primary-700
                  border-gray-200 text-gray-500 hover:border-gray-300`}
              >
                {p.label}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Due date */}
      <Input
        id="due_date"
        label="Due date (optional)"
        type="date"
        {...register("due_date")}
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isPending}>
          {isEdit ? "Save Changes" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
