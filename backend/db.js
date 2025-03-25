const mongoose = require("mongoose");
const { boolean } = require("zod");

mongoose.connect(
  "mongodb+srv://heyrishabh13:8TuGvdZPSmouVO4Q@cluster0.rjwuyra.mongodb.net/todos"
);
const TodoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todo", TodoSchema);

module.exports = {
  todo,
};
