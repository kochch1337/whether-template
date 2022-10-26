import { ListItem as Item } from "./ListItem.styled";
import Checkbox from "@mui/material/checkbox";

export default function ListItem({ todo, toggleCheckbox }) {
  return (
    <>
      <Checkbox
        key={`check${todo.id}`}
        checked={todo.isChecked}
        onClick={() => {
          toggleCheckbox(todo.id);
        }}
      />
      <Item key={todo.id} todo={todo}>
        {todo.title}
      </Item>
    </>
  );
}
