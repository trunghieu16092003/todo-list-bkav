import React, { Children, useState } from "react";
import AddTodo from "./components/AddTodo";
import ListTodos from "./components/ListTodos";

export interface ITodos {
  id: number;
  name: string;
  parentId: number | null;
  childrens: ITodos[] | null;
}

function App() {
  const [todos, setTodos] = useState<ITodos[]>([
    {
      id: 0,
      name: "doing exercise",
      parentId: null,
      childrens: null,
    },
  ]);

  function randomId() {
    const min = 0;
    const max = 9999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  const addTodo = (name: string, parentId: number | null) => {
    const newTodo = { id: randomId(), name, parentId, childrens: null };
    setTodos((prevTodos) => {
      if (parentId !== null) {
        return prevTodos.map((todo) =>
          todo.id === parentId
            ? { ...todo, childrens: [...(todo.childrens || []), newTodo] }
            : todo
        );
      }
      return [...prevTodos, newTodo];
    });
  };

  const updateTodo = (id: number, name: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
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
    });
  };

  const deleteTodo = (id: number, parentId: number | null) => {
    if (parentId !== null) {
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === parentId) {
            const updatedChildrens = (todo.childrens || []).filter(
              (child) => child.id !== id
            );
            return { ...todo, childrens: updatedChildrens };
          }
          return todo;
        });
      });
    } else {
      const filterTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filterTodos);
    }
  };

  return (
    <>
      <AddTodo addTodo={addTodo} todos={todos} />
      <ListTodos
        todos={todos}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </>
  );
}

export default App;
