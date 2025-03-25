import { useState } from "react";

export function CreateTodo() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  return (
    <div>
      <input
        style={{ padding: 10, margin: 10 }}
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="title"
      />
      <br></br>
      <input
        style={{ padding: 10, margin: 10 }}
        type="text"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder="description"
      />
      <br></br>

      <button
        style={{ padding: 10, margin: 10 }}
        onClick={() => {
          fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: description,
            }),
            headers: {
              "Content-type": "application/json",
            },
          }).then(async function (res) {
            const json = await res.json();
            console.log(json);
            alert("todo added");
          });
        }}
      >
        Add a todo
      </button>
    </div>
  );
}
