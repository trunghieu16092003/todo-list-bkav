import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";

import { ITodos } from "../redux/reducers/counterReducer";
import { deleteTodo, editTodo } from "../redux/actions";

const ListTodos = (props: any) => {
  const [edit, setEdit] = useState<number | null>(null);
  const [name, setName] = useState("");

  const handleEdit = (id: number, name: string) => {
    setEdit(id);
    setName(name);
  };

  const handleSave = (values: { name: string }) => {
    const { name } = values;
    props.editTodo(edit, name);
    setEdit(null);
  };
  return (
    <div>
      <ul>
        {props.todos.map((todo: ITodos) => (
          <li key={todo.id}>
            {edit === todo.id ? (
              <Form onFinish={handleSave}>
                <Form.Item name="name" initialValue={name}>
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <div>
                <span>{todo.name}</span>
                <button onClick={() => handleEdit(todo.id, todo.name)}>
                  edit
                </button>
                <button
                  onClick={() => props.deleteTodo(todo.id, todo.parentId)}
                >
                  delete
                </button>
              </div>
            )}

            <ul>
              {todo.childrens?.map((children: ITodos) => (
                <li key={children.id}>
                  {edit === children.id ? (
                    <Form onFinish={handleSave}>
                      <Form.Item name="name" initialValue={name}>
                        <Input />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                      </Form.Item>
                    </Form>
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
                          props.deleteTodo(children.id, children.parentId)
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
const mapStateToProps = (state: any) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    editTodo: (id: number, name: string) => dispatch(editTodo(id, name)),
    deleteTodo: (id: number, parentId: number) =>
      dispatch(deleteTodo(id, parentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTodos);
