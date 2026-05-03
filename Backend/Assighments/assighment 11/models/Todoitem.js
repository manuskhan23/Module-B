const mongoose = require("mongoose");

const todoItemSchema = mongoose.Schema({
  tasks: {
    type: String,
    required: true,
  },
  date: Date,
  completed:{
    type: Boolean,
    default: false
  },
}, { timestamps: true });

module.exports = mongoose.model("TodoItem", todoItemSchema);
