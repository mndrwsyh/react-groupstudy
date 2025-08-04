import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { toast } from "sonner";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";

import dayjs from "dayjs";

function StartSession() {
  const courseInLocalStorage = localStorage.getItem("sessions");
  const [sessions, setSessions] = useState(
    courseInLocalStorage ? JSON.parse(courseInLocalStorage) : []
  );

  const studentInLocalStorage = localStorage.getItem("students");
  const [students, setStudents] = useState(
    studentInLocalStorage ? JSON.parse(studentInLocalStorage) : []
  );

  const groupInLocalStorage = localStorage.getItem("group");
  const [groups, setGroups] = useState(
    groupInLocalStorage ? JSON.parse(groupInLocalStorage) : []
  );

  const { id } = useParams();
  const navigate = useNavigate();
  const [checked, setChecked] = useState([]);

  // const checkStudent = (id) => {
  //   let checkedStudent = [...selectedStudent];
  //   // check if the id is already in the array or not
  //   if (checkedStudent.includes(id)) {
  //     // remove
  //     checkedStudent = checkedStudent.filter((sid) => sid !== id);
  //   } else {
  //     // add
  //     checkedStudent.push(id);
  //   }
  //   setSelectedStudent(checkedStudent);
  // };

  const checkStudent = (id) => {
    setChecked((checked) => ({
      ...checked,
      [id]: !checked[id],
    }));
  };

  const renderRow = ({ index, style }) => {
    const student = selectedStudent[index];
    const isChecked = checked[student.id];

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

  const selectedSession = sessions.find((s) => s.id === id);
  const [location, setLocation] = useState(
    selectedSession ? selectedSession.location : ""
  );
  const [topic, setTopic] = useState(
    selectedSession ? selectedSession.topic : ""
  );

  const [selectedDateTime, setSelectedDateTime] = useState(
    selectedSession ? selectedSession.selectedDateTime : ""
  );

  const groupInSession = groups.find(
    (g) => g.id === selectedSession.selectedGroup
  );

  const [selectedStudent, setSelectedStudent] = useState(
    groupInSession
      ? students.filter((student) =>
          groupInSession.selectedStudent.includes(student.id)
        )
      : []
  );

  const handleDelete = (session) => {
    const confirmDelete = confirm("Are you sure you want to end the session?");
    if (confirmDelete) {
      const updatedSession = sessions.filter((item) => item.id !== session.id);
      setSessions(updatedSession);
      localStorage.setItem("sessions", JSON.stringify(updatedSession));
      navigate("/");
      toast("Session has ended.");
    }
  };

  if (!selectedSession) {
    return <div>Session or group not found boohoo lolololol</div>;
  }

  const getGroup = (session) => {
    const groupSelected = groups.find((g) => g.id === session.selectedGroup);
    if (groupSelected) {
      return groupSelected.groupName;
    } else {
      return "No group boohoo";
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ pt: "40px" }}>
        <Paper elevation={3} sx={{ p: "30px", mt: "20px", mb: "40px" }}>
          <Box>
            <Typography variant="h6">
              Group: {getGroup(selectedSession)}
            </Typography>
          </Box>
          <Box sx={{ mt: "15px" }}>
            <Typography variant="h6">
              Date/Time: {dayjs(selectedDateTime).format("DD/MM/YYYY hh:mm A")}
            </Typography>
          </Box>
          <Box sx={{ mt: "15px" }}>
            <Typography variant="h6">Topic: {topic}</Typography>
          </Box>
          <Box sx={{ mt: "15px" }}>
            <Typography variant="h6">Location: {location}</Typography>
          </Box>
          <Box sx={{ mt: "15px" }}>
            <Typography variant="h6" sx={{ mb: "10px" }}>
              Attendence:
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
              itemCount={selectedStudent.length}
              overscanCount={5}
            >
              {renderRow}
            </FixedSizeList>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              mt: "20px",
            }}
          >
            <Button
              fullWidth
              color="error"
              variant="contained"
              onClick={() => handleDelete(selectedSession)}
            >
              End Session
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
export default StartSession;
