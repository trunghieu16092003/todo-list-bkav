import React, { useState } from "react";
import { ITodos } from "../App";

interface AddTodoProps {
  addTodo: (
    name: string,
    parentId: number | null,
    childrens: ITodos[] | null
  ) => void;
  todos: ITodos[];
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo, todos }) => {
  const [inputValue, setInputValue] = useState("");
  const [parentValue, setParentValue] = useState<string>("");

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleChangeParentValue = (e: any) => {
    setParentValue(e.target.value);
  };

  const parentTodos = todos.filter((todo: ITodos) => todo.parentId === null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const parentId = parentValue === "" ? null : parseInt(parentValue);
      addTodo(inputValue, parentId, null);
      setInputValue("");
      setParentValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add to do"
        value={inputValue}
        onChange={handleChange}
      />

      <select value={parentValue} onChange={handleChangeParentValue}>
        <option value="">---Choose parent todo---</option>
        {parentTodos.map((parentTodo: ITodos) => (
          <option key={parentTodo.id} value={parentTodo.id}>
            {parentTodo.name}
          </option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddTodo;
