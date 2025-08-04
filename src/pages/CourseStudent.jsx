import { useState } from "react";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import {
  Container,
  Box,
  Typography,
  TextField,
  InputLabel,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

function CourseStudent() {
  const [value, setValue] = React.useState("courses");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [color, setColor] = useState(false);

  const groupsInLocalStorage = localStorage.getItem("group");
  const [groups, setGroups] = useState(
    groupsInLocalStorage ? JSON.parse(groupsInLocalStorage) : []
  );

  const courseInLocalStorage = localStorage.getItem("courses");
  const [courses, setCourses] = useState(
    courseInLocalStorage ? JSON.parse(courseInLocalStorage) : []
  );

  const [label, setLabel] = useState("");

  const handleAddNew = () => {
    if (label === "") {
      toast("Please fill in a course.");
    } else {
      const updatedCourses = [
        ...courses,
        {
          id: nanoid(),
          label: label,
        },
      ];
      setCourses(updatedCourses);
      toast("New course has been added.");
      setLabel("");
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
    }
  };

  const handleUpdate = (course) => {
    const newCourse = prompt(
      "Please enter the new label for the selected course.",
      course.label
    );
    if (newCourse) {
      const updatedCourses = courses.map((item) => {
        if (item.id === course.id) {
          item.label = newCourse;
        }
        return item;
      });
      setCourses(updatedCourses);
      toast("Course has been updated.");
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
    }
  };

  const handleDelete = (course) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this course?"
    );
    if (confirmDelete) {
      const updatedCourses = courses.filter((item) => item.id !== course.id);
      setCourses(updatedCourses);
      toast("Course has been deleted.");

      localStorage.setItem("courses", JSON.stringify(updatedCourses));
    }
  };

  const studentInLocalStorage = localStorage.getItem("students");

  const [students, setStudents] = useState(
    studentInLocalStorage ? JSON.parse(studentInLocalStorage) : []
  );

  const [labelStudent, setLabelStudent] = useState("");

  const handleAddNewStudent = () => {
    if (labelStudent === "") {
      toast("Please fill in a student name.");
    } else {
      const updatedStudents = [
        ...students,
        {
          id: nanoid(),
          labelStudent: labelStudent,
        },
      ];
      setStudents(updatedStudents);
      toast("New student has been added.");
      setLabelStudent("");
      localStorage.setItem("students", JSON.stringify(updatedStudents));
    }
  };

  const handleUpdateStudent = (student) => {
    const newStudent = prompt(
      "Please enter the new label for the selected student.",
      student.labelStudent
    );
    if (newStudent) {
      const updatedStudents = students.map((item) => {
        if (item.id === student.id) {
          item.labelStudent = newStudent;
        }
        return item;
      });
      setStudents(updatedStudents);
      toast("Student name has been updated.");
      localStorage.setItem("students", JSON.stringify(updatedStudents));
    }
  };

  const handleDeleteStudent = (student) => {
    const confirmDelete = confirm(
      "Are you sure you want to remove this student?"
    );
    if (confirmDelete) {
      const updatedStudents = students.filter((item) => item.id !== student.id);
      setStudents(updatedStudents);
      toast("Student has been removed.");
      localStorage.setItem("students", JSON.stringify(updatedStudents));
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4">Courses & Students</Typography>
        <TabContext value={value}>
          <Box>
            <TabList
              sx={{
                "& .MuiTab-root": {
                  color: "gray", // unselected tab color
                },
                "& .Mui-selected": {
                  color: "#2e7d32 !important", // selected tab text color
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "success.main", // underline indicator color
                },
              }}
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Courses" value="courses" />
              <Tab label="Students" value="students" />
            </TabList>
          </Box>
          <TabPanel sx={{ padding: "0px" }} value="courses">
            <Card
              sx={{
                p: "20px",
              }}
            >
              <InputLabel>Add New Course</InputLabel>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  mt: "5px",
                }}
              >
                <TextField
                  fullWidth
                  label="Course"
                  variant="outlined"
                  value={label}
                  onChange={(event) => setLabel(event.target.value)}
                />
                <Button
                  color="success"
                  variant="contained"
                  onClick={handleAddNew}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ mt: "25px" }}>
                <InputLabel>Existing Courses ({courses.length})</InputLabel>
                <List sx={{ width: "100%" }}>
                  {courses.map((course) => {
                    const courseInGroup = groups.some((g) =>
                      g.selectedCourse.includes(course.id)
                    );
                    return (
                      <ListItem
                        key={course.id}
                        disableGutters
                        divider
                        secondaryAction={
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <IconButton onClick={() => handleUpdate(course)}>
                              <Edit />
                            </IconButton>
                            <IconButton
                              disabled={courseInGroup}
                              onClick={() => handleDelete(course)}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        }
                      >
                        <ListItemText primary={`${course.label}`} />
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Card>
          </TabPanel>
          <TabPanel sx={{ padding: "0px" }} value="students">
            <Card
              sx={{
                p: "20px",
              }}
            >
              <InputLabel>Add Student</InputLabel>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  mt: "5px",
                }}
              >
                <TextField
                  fullWidth
                  label="Student"
                  variant="outlined"
                  value={labelStudent}
                  onChange={(event) => setLabelStudent(event.target.value)}
                />
                <Button
                  color="success"
                  variant="contained"
                  onClick={handleAddNewStudent}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ mt: "25px" }}>
                <InputLabel>Students ({students.length})</InputLabel>
                <List sx={{ width: "100%" }}>
                  {students.map((student) => {
                    const studentInGroup = groups.some((g) =>
                      g.selectedStudent.includes(student.id)
                    );
                    return (
                      <ListItem
                        key={student.id}
                        disableGutters
                        divider
                        secondaryAction={
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <IconButton
                              onClick={() => handleUpdateStudent(student)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              disabled={studentInGroup}
                              onClick={() => handleDeleteStudent(student)}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        }
                      >
                        <ListItemText primary={`${student.labelStudent}`} />
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Card>
          </TabPanel>
        </TabContext>
      </Container>
    </>
  );
}

export default CourseStudent;
