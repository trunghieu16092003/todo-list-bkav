import React, { useState } from "react";
import { ITodos } from "../App";

interface ListTodosProps {
  todos: ITodos[];
  deleteTodo: (id: number, parentId: number | null) => void;
  updateTodo: (id: number, name: string) => void;
}

const ListTodos: React.FC<ListTodosProps> = ({
  todos,
  deleteTodo,
  updateTodo,
}) => {
  console.log(todos);
  const [edit, setEdit] = useState<number | null>(null);
  const [name, setName] = useState("");

  const handleEdit = (id: number, name: string) => {
    setEdit(id);
    setName(name);
  };

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  const handleSave = (id: number) => {
    updateTodo(id, name);
    setEdit(null);
  };
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {edit === todo.id ? (
              <div>
                <input type="text" value={name} onChange={handleChange} />{" "}
                <button onClick={() => handleSave(todo.id)}>save</button>
              </div>
            ) : (
              <div>
                <span>{todo.name}</span>
                <button onClick={() => handleEdit(todo.id, todo.name)}>
                  edit
                </button>
                <button onClick={() => deleteTodo(todo.id, todo.parentId)}>
                  delete
                </button>
              </div>
            )}

            <ul>
              {todo.childrens?.map((children: ITodos) => (
                <li key={children.id}>
                  {edit === children.id ? (
                    <div>
                      <input type="text" value={name} onChange={handleChange} />{" "}
                      <button onClick={() => handleSave(children.id)}>
                        save
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span>{children.name}</span>
                      <button
                        onClick={() => handleEdit(children.id, children.name)}
                      >
                        edit
                      </button>
                      <button
                        onClick={() =>
                          deleteTodo(children.id, children.parentId)
                        }
                      >
                        delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTodos;
