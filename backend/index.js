const express = require("express");
const { createTodo, updateTodo, deleteTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent wrong inputs",
    });
    return;
  }
  // put it int mongodb
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });
  res.json({
    msg: "Todo created",
  });
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find({});
  res.json({
    todos,
  });
});

app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);

  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You have sent wrong inputs",
    });
    return;
  }
  await todo.update(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  res.json({
    msg: "Todo marked as completed!",
  });
});

app.delete("/delete", async (req, res) => {
  const deletePayload = req.body;
  const parsedPayload = deleteTodo.safeParse(deletePayload);

  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You have entered wrong input",
    });
    return;
  }

  const deletedTodo = await todo.findByIdAndDelete({
    _id: req.body.id,
  });

  res.json({
    deletedTodo,
  });
});

app.listen(3000);
