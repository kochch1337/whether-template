export default function AddToDoForm({ addTodo }) {
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit(event, addTodo);
        }}
      >
        <input
          maxLength="20"
          type="text"
          className="todo-input"
          name="inputText"
        ></input>
        <button className="todo-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
        <button className="todo-button" type="cancel">
          <i className="fas fa-minus-square"></i>
        </button>
        <div className="select">
          <div>
            <input
              type="radio"
              id="always"
              value="always"
              name="weather"
            ></input>
            <label htmlFor="always">always</label>
          </div>
          <div>
            <input type="radio" id="good" value="good" name="weather"></input>
            <label htmlFor="good">good</label>
          </div>
          <div>
            <input type="radio" id="bad" value="bad" name="weather"></input>
            <label htmlFor="bad">bad</label>
          </div>
        </div>
      </form>
    </>
  );
}

function submit(event, addTodo) {
  const formData = new FormData(event.target);
  addTodo(formData.get("inputText"), formData.get("weather"));
}
