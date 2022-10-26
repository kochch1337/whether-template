import ListItem from "../ListItem/index.js";
import { TodoList as List } from "./TodoList.styled.js";

export default function TodoList({ todos, toggleCheckbox, title }) {
  return (
    <>
      <h2>
        {title}({todos.length})
      </h2>
      <List>
        {todos.map((todo) => {
          return (
            <ListItem
              key={todo.id}
              todo={todo}
              toggleCheckbox={toggleCheckbox}
            ></ListItem>
          );
        })}
      </List>
    </>
  );
}
