import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { Button, Paper, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";

function AddGroup() {
  const navigate = useNavigate();

  const checkStudent = (id) => {
    let checkedStudent = [...selectedStudent];
    // check if the id is already in the array or not
    if (checkedStudent.includes(id)) {
      // remove
      checkedStudent = checkedStudent.filter((sid) => sid !== id);
    } else {
      // add
      checkedStudent.push(id);
    }
    setSelectedStudent(checkedStudent);
    localStorage.setItem("selectedStudent", JSON.stringify(checkedStudent));
  };

  const renderRow = ({ index, style }) => {
    const student = students[index];
    const isChecked = selectedStudent.includes(student.id);

    return (
      <ListItem style={style} key={student.id} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={student.labelStudent} />
          <Checkbox
            checked={isChecked}
            onChange={() => checkStudent(student.id)}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [groupName, setGroupName] = useState("");

  const courseInLocalStorage = localStorage.getItem("courses");
  const [courses, setCourses] = useState(
    courseInLocalStorage ? JSON.parse(courseInLocalStorage) : []
  );

  const studentInLocalStorage = localStorage.getItem("students");
  const [students, setStudents] = useState(
    studentInLocalStorage ? JSON.parse(studentInLocalStorage) : []
  );

  const groupInLocalStorage = localStorage.getItem("group");
  const [group, setGroup] = useState(
    groupInLocalStorage ? JSON.parse(groupInLocalStorage) : []
  );

  const handleAddGroup = () => {
    if (groupName === "" || selectedCourse === "" || selectedStudent === "") {
      toast("Please fill in all fields.");
    } else {
      const updatedGroup = [
        ...group,
        {
          id: nanoid(),
          groupName: groupName,
          selectedCourse: selectedCourse,
          selectedStudent: selectedStudent,
        },
      ];
      setGroup(updatedGroup);
      toast("New group has been created.");
      localStorage.setItem("group", JSON.stringify(updatedGroup));

      setSelectedStudent([]);
      localStorage.setItem("selectedStudent", JSON.stringify([]));

      navigate("/");
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ pt: "60px" }}>
        <Typography variant="h4">Create a New Group</Typography>
        <Paper
          key={group.id}
          elevation={3}
          sx={{ p: "30px", mt: "20px", mb: "40px" }}
        >
          <TextField
            fullWidth
            id="group_location"
            label="Group Name"
            variant="outlined"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
          />
          <FormControl sx={{ mt: "25px" }} fullWidth>
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
            <Select
              key={courses.id}
              labelId="note_category_label"
              id="group_course"
              label="Course"
              value={selectedCourse}
              onChange={(event) => {
                setSelectedCourse(event.target.value);
              }}
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mt: "25px" }}>
            <Typography variant="body2" sx={{ mb: "10px", color: "gray" }}>
              Students
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: 190,
              bgcolor: "background.paper",
            }}
          >
            <FixedSizeList
              key={students.id}
              height={190}
              fullWidth
              itemSize={46}
              itemCount={students.length}
              overscanCount={5}
            >
              {renderRow}
            </FixedSizeList>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              mt: "20px",
            }}
          >
            <Button
              color="success"
              variant="contained"
              onClick={handleAddGroup}
            >
              Create Group
            </Button>
            <Button
              component={RouterLink}
              to="/"
              color="success"
              variant="outlined"
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default AddGroup;
