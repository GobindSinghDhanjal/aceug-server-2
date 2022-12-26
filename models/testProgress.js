const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answerSchema = new Schema({
  question: { type: String, required: true },
  selected_option: { type: String, required: true },
});

const testProgressSchema = new Schema({
  test: { type: mongoose.ObjectId},
  student: { type: mongoose.ObjectId, required: true },
  testseries: { type: mongoose.ObjectId, required: true },
  answer_map: { type: [answerSchema], required: true },
  score: { type: Number},
  time_taken: { type: Number},
},{
  timestamps: true,
});

module.exports = mongoose.model("TestProgress", testProgressSchema);
