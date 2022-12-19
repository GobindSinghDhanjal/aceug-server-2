const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const courseEnrollmentSchema = new Schema({
  student: { type: mongoose.ObjectId, required: true },
  course: { type: mongoose.ObjectId, required: true },
  join_date: { type: Date, required: true },
  last_date: { type: Date, required: true },
},{
  timestamps: true,
});

module.exports = mongoose.model("CourseEnrollments", courseEnrollmentSchema);
