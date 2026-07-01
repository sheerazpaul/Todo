import axiosInstance from "./axiosInstance";

export const getTodos = async () => {
  const { data } = await axiosInstance.get("/api/todos/");
  return data;
};

export const createTodo = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/todos/", payload);
    return data;
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};

export const updateTodo = async ({ id, ...payload }) => {
  const { data } = await axiosInstance.patch(`/api/todos/${id}/`, payload);
  return data;
};

export const deleteTodo = async (id) => {
  await axiosInstance.delete(`/api/todos/${id}/`);
};

export const toggleTodo = async ({ id, completed }) => {
  const { data } = await axiosInstance.patch(`/api/todos/${id}/`, {
    completed,
  });
  return data;
};
