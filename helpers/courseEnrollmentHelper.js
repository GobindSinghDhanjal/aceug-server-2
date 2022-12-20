const Course = require("../models/course");
const CourseEnrollments = require("../models/courseEnrollments");
const CourseProgress = require("../models/courseProgress");
const mongoose = require("mongoose")

const Student = require("../models/student");

const enrollStudent = async (studentId, courseId) => {

    console.log(studentId, courseId);

    const enrolled = {
        status: false,
        msg: ""
    };
  //Checking if student is already enrolled
  let check = await CourseEnrollments.exists({
    course: courseId,
    student: studentId,
  });

  console.log(check);

  if (!check) {
    Course.findById(courseId)
      .then((courseFetched) => {
        if (!courseFetched) {
          return {...enrolled, msg: "Invalid Course"};
        } else {
          Student.findById(studentId)
            .then((student) => {
              if (student) {
                var join_date = new Date();
                var last_date = new Date();

                last_date.setDate(join_date.getDate() + courseFetched.days);

                const newEnrollment = {
                  course: mongoose.Types.ObjectId(courseId),
                  student: mongoose.Types.ObjectId(studentId),
                  join_date: join_date,
                  last_date: last_date,
                };

                //Enrolling Student in Course

                CourseEnrollments.create(newEnrollment)
                  .then((enrollment) => {
                    //Create Course Progress Document Here After the User is successfully Enrolled
                    CourseProgress.create({
                      course: courseId,
                      student: studentId,
                      statusMap: [],
                    })
                      .then((courseProgressSaved) => {

                        //Adding course in student
                        // Student.findOneAndUpdate({_id: studentId},{course_enrolled: })
                        return {...enrolled,status: true, msg: "Successfully Enrolled"};
                     
                      })
                      .catch((err) => {
                        return {...enrolled, msg: err};
                        
                      });
                  })
                  .catch((err) => {
                    return {...enrolled, msg: err};
            
                  });
              } else {
                return {...enrolled, msg: "Student Does Not Exist"};
        
              }
            })
            .catch((err) => {
                return {...enrolled, msg: err};
            
            });
        }
      })
      .catch((err) => {
        return {...enrolled, msg: "Course Not Found"};
   
      });
  } else {
    return {...enrolled, msg: "Already Enrolled"};
  }
};

module.exports.enrollStudent = enrollStudent;
