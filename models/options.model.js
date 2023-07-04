const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  question:{ type: mongoose.Schema.Types.ObjectId, ref: 'Questions' },
  votes: {
    type: Number,
    default: 0,
  },
  text: {
    type: String,
    default: null,
  },
  link_to_vote: {
    type: String,
    default: null,
  },
});

const OptionSchema = mongoose.model("Options", optionSchema);
module.exports = OptionSchema;
