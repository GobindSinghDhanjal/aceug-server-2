const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const testSeriesSchema = new Schema({
  name: { type: String, required: true },
  days: { type: Number, required: true },
  tests: [mongoose.ObjectId],
  thumbnail: { type: String, required: true },
  subject: String,
  tags: [String],
},{
  timestamps: true,
});

module.exports = mongoose.model("TestSeries", testSeriesSchema);
