import React, { useState } from "react";
import { Button, Input, Form, Select } from "antd";
import { connect } from "react-redux";

import { addTodo } from "../redux/actions";
import { ITodos } from "../redux/reducers/counterReducer";

const AddTodo = (props: any) => {
  const [form] = Form.useForm();
  const [inputValue, setInputValue] = useState<string>("");
  const [parentValue, setParentValue] = useState<number | null>(null);

  const parentTodos = props.todos.filter(
    (todo: ITodos) => todo.parentId === null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleParentChange = (value: number | null) => {
    setParentValue(value);
  };

  const handleSubmit = (values: { name: string; parentId: string }) => {
    const { name, parentId } = values;
    const parentValue = parentId ? parentId : null;
    if (name.trim()) {
      props.addTodo(name, parentValue);
      form.resetFields();
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="inline">
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please enter a todo name" }]}
      >
        <Input
          placeholder="Add to do"
          value={inputValue}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item name="parentId">
        <Select
          placeholder="---Choose parent todo---"
          value={parentValue}
          onChange={handleParentChange}
        >
          <Select.Option value={null}>None</Select.Option>
          {parentTodos.map((parentTodo: ITodos) => (
            <Select.Option key={parentTodo.id} value={parentTodo.id}>
              {parentTodo.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state: any) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTodo: (name: string, parentId: number | null) =>
      dispatch(addTodo(name, parentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
