const TestSeries = require("../models/testseries");
const TestSeriesEnrollments = require("../models/testSeriesEnrolments");
const TestProgress = require("../models/testProgress");
const C = require("../models/testProgress");
const mongoose = require("mongoose");
const Student = require("../models/student");

const enrollStudentTest = async (studentId, testSeriesId) => {
  
  const enrolled = {
    status: false,
    msg: "",
  };
  //Checking if student is already enrolled
  let alreadyEnrolledCheck = await TestSeriesEnrollments.exists({
    testseries: testSeriesId,
    student: studentId,
  });

  //Checking if studentid is correct
  let validStudentCheck = await Student.exists({
    id: studentId,
  });

  //Checking if course id is correct
  let validTestSeriesCheck = await TestSeries.exists({
    id: testSeriesId,
  });
  console.log(alreadyEnrolledCheck, validTestSeriesCheck, validStudentCheck);

  if (!alreadyEnrolledCheck) {
    TestSeries.findById(testSeriesId)
      .then((course) => {
        console.log(course);
        Student.findById(studentId)
          .then((student) => {
            console.log("Loaded Student");
            var join_date = new Date();
            var last_date = new Date();

            last_date.setDate(join_date.getDate() + course.days);
            console.log("Created Last Date");
            const newEnrollment = {
              testseries: mongoose.Types.ObjectId(testSeriesId),
              student: mongoose.Types.ObjectId(studentId),
              join_date: join_date,
              last_date: last_date,
            };

            //Enrolling Student in Course
            console.log("Created New enrollment");
            TestSeriesEnrollments.create(newEnrollment)
              .then((enrollment) => {
                console.log("vsdvsdvbkjbjkb");
                //Create Course Progress Document Here After the User is successfully Enrolled
                TestProgress.create({
                  testseries: testSeriesId,
                  student: studentId,
                  answer_map: [],
                })
                  .then((courseProgressSaved) => {
                    console.log("cascbhjaschjj");
                    console.log(courseProgressSaved);
                    //Adding course in student
                    student.series_enrolled.push(testSeriesId);
                    console.log("dsvsdvsdvdsfbdfbvsf");
                    student.save();
                    console.log("Saved ");
                    return {
                      ...enrolled,
                      status: true,
                      msg: "Successfully Enrolled",
                    };
                  })
                  .catch((err) => {
                    return { ...enrolled, msg: err };
                  });
              })
              .catch((err) => {
                return { ...enrolled, msg: err };
              });
          })
          .catch((err) => {
            return { ...enrolled, msg: err };
          });
      })
      .catch((err) => {
        return { ...enrolled, msg: "Course Not Found" };
      });
  } else {
    return { ...enrolled, msg: "Already Enrolled" };
  }
};

module.exports.enrollStudentTest = enrollStudentTest;