import AddTodo from "./components/AddTodo";
import ListTodos from "./components/ListTodos";

import { connect } from "react-redux";

function App(props: any) {
  console.log(props.todos);
  return (
    <div className="App">
      <AddTodo />
      <ListTodos />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    todos: state.todos,
  };
};

export default connect(mapStateToProps)(App);
