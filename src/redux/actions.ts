import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "./types";

import { ITodos } from "./reducers/counterReducer";

export const addTodo = (name: string, parentId: number | null) => {
  const newTodo: ITodos = {
    id: Math.random(),
    name,
    parentId,
    childrens: null,
  };
  return {
    type: ADD_TODO,
    payload: newTodo,
  };
};

export const editTodo = (id: number, name: string) => {
  return {
    type: EDIT_TODO,
    payload: { id, name },
  };
};

export const deleteTodo = (id: number, parentId: number | null) => {
  return {
    type: DELETE_TODO,
    payload: { id, parentId },
  };
};
