import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "../types";

export interface ITodos {
  id: number;
  name: string;
  parentId: number | null;
  childrens: ITodos[] | null;
}

const initialState: ITodos[] = [];

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodo = action.payload;

      if (newTodo.parentId !== null) {
        return state.map((todo: ITodos) =>
          todo.id === newTodo.parentId
            ? { ...todo, childrens: [...(todo.childrens || []), newTodo] }
            : todo
        );
      }
      return [...state, newTodo];

    case EDIT_TODO:
      const { id, name } = action.payload;
      return state.map((todo) => {
        if (todo.id === id) {
          return { ...todo, name };
        }

        if (todo.childrens) {
          return {
            ...todo,
            childrens: todo.childrens.map((child) =>
              child.id === id ? { ...child, name } : child
            ),
          };
        }
        return todo;
      });

    case DELETE_TODO:
      const { id: todoId, parentId } = action.payload;
      if (parentId !== null) {
        return state.map((todo: ITodos) => {
          if (todo.id === parentId) {
            const updatedChildrens = (todo.childrens || []).filter(
              (child: ITodos) => child.id !== todoId
            );
            return { ...todo, childrens: updatedChildrens };
          }
          return todo;
        });
      } else {
        return state.filter((todo: ITodos) => todo.id !== todoId);
      }
    default:
      return state;
  }
};

export default reducer;
