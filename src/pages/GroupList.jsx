import { useState } from "react";
import { toast } from "sonner";
import { Link as RouterLink, useNavigate } from "react-router";
import { Button, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const actions = [
  { icon: <BookmarkAddIcon />, name: "Create Session", link: "scheduler" },
  { icon: <GroupAddIcon />, name: "Add Group", link: "/addgroup" },
];

function GroupList() {
  const navigate = useNavigate();

  const [openSession, setOpenSession] = useState("");
  const [viewMember, setViewMember] = useState("");
  const [filterSession, setFilterSession] = useState("All");

  const courseInLocalStorage = localStorage.getItem("courses");
  const [courses, setCourses] = useState(
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

  const sessionInLocalStorage = localStorage.getItem("sessions");
  const [sessions, setSessions] = useState(
    sessionInLocalStorage ? JSON.parse(sessionInLocalStorage) : []
  );

  const [selectedCourse, setSelectedCourse] = useState("All");

  const getCourse = (group) => {
    const selectedCourse = courses.find((c) => c.id === group.selectedCourse);
    if (selectedCourse) {
      return selectedCourse.label;
    } else {
      return "No group boohoo";
    }
  };

  const getStudent = (student) => {
    const selectedStudent = students.find((s) => s.id === student);
    if (selectedStudent) {
      return selectedStudent.labelStudent;
    } else {
      return "No student boohoo";
    }
  };

  const getMember = (group) => {
    return group.selectedStudent;
  };

  const handleGroupDelete = (group) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this group?"
    );
    if (confirmDelete) {
      const updatedGroup = groups.filter((item) => item.id !== group.id);
      setGroups(updatedGroup);
      localStorage.setItem("group", JSON.stringify(updatedGroup));

      const updatedSession = sessions.filter(
        (session) => session.selectedGroup !== group.id
      );
      setSessions(updatedSession);
      localStorage.setItem("sessions", JSON.stringify(updatedSession));
      toast("Group has been deleted.");
    }
  };

  const handleSessionDelete = (session) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this session?"
    );
    if (confirmDelete) {
      const updatedSession = sessions.filter((item) => item.id !== session.id);
      setSessions(updatedSession);
      localStorage.setItem("sessions", JSON.stringify(updatedSession));
      toast("Session has been deleted.");
    }
  };
  const startSession = (session) => {
    const confirmStart = confirm(
      "Are you sure you want to start this session?"
    );
    if (confirmStart) {
      navigate(`/sessionstart/${session.id}`);
    } else {
      navigate("/");
    }
  };

  const upcomingSession = (session) => {
    const sessionTime = dayjs(session.selectedDateTime);
    const now = dayjs();
    const in24Hours = sessionTime.diff(now, "hour");

    return in24Hours >= 0 && in24Hours <= 24;
  };
  return (
    <>
      <Container maxWidth="md" sx={{ pt: "60px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: "50px",
          }}
        >
          <Box>
            <Typography variant="h4">All Groups ({groups.length})</Typography>
          </Box>
          <Box sx={{ gap: "20px" }}>
            <FormControl color="success" sx={{ width: "215px", mr: "15px" }}>
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
                labelId="group_course_label"
                id="group_course"
                label="Sort By"
                value={filterSession}
                defaultValue=""
                onChange={(event) => {
                  setFilterSession(event.target.value);
                }}
              >
                <MenuItem value={"All"}>All Groups & Sessions</MenuItem>
                <MenuItem value={"Soon"}>Upcoming Sessions (In 24h)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#337a31",
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                <TableCell
                  sx={{
                    color: "#ffffff",
                    fontWeight: "bold",
                    paddingLeft: "25px",
                  }}
                >
                  Group Name
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  Members
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  Course
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  Sessions
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            {groups
              .filter((group) => {
                if (filterSession === "All") {
                  return true;
                } else {
                  const groupSessions = sessions.filter(
                    (s) => s.selectedGroup === group.id
                  );
                  return groupSessions.some(upcomingSession);
                }
              })
              .map((group) => (
                <TableBody key={group.id}>
                  <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell
                      sx={{ paddingLeft: "25px" }}
                      component="th"
                      scope="row"
                    >
                      {group.groupName}
                    </TableCell>
                    <TableCell align="right">
                      {getMember(group).length}
                      <Button
                        size="xs"
                        variant="outlined"
                        color="success"
                        sx={{
                          marginLeft: "10px",
                          fontSize: "10px",
                          padding: "5px",
                        }}
                        onClick={() =>
                          setViewMember(viewMember === group.id ? "" : group.id)
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                    {/*modal */}
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={viewMember === group.id}
                      onClose={() => setViewMember("")}
                      closeAfterTransition
                      slots={{ backdrop: Backdrop }}
                      slotProps={{
                        backdrop: {
                          timeout: 500,
                        },
                      }}
                    >
                      <Fade in={viewMember === group.id}>
                        <Box sx={style}>
                          <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            Group: {group.groupName}
                          </Typography>
                          {group.selectedStudent.map((student) => (
                            <Typography key={student.id} sx={{ mt: 2 }}>
                              - {getStudent(student)}
                            </Typography>
                          ))}
                        </Box>
                      </Fade>
                    </Modal>
                    <TableCell align="right">
                      <Chip label={getCourse(group)} />
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={`${
                          sessions.filter((s) => s.selectedGroup === group.id)
                            .length
                        } Sessions`}
                      />
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() =>
                          setOpenSession(
                            openSession === group.id ? "" : group.id
                          )
                        }
                      >
                        {openSession === group.id ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup>
                        <Button
                          size="small"
                          component={RouterLink}
                          to={`/g/${group.id}`}
                        >
                          <CreateIcon sx={{ mr: "5px" }}></CreateIcon>
                        </Button>
                        <Button
                          color="error"
                          size="small"
                          onClick={() => handleGroupDelete(group)}
                        >
                          <DeleteIcon sx={{ mr: "5px" }}></DeleteIcon>
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={openSession === group.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="h6" gutterBottom component="div">
                            Sessions (
                            {
                              sessions.filter(
                                (s) => s.selectedGroup === group.id
                              ).length
                            }
                            )
                          </Typography>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              {sessions

                                .filter((s) => s.selectedGroup === group.id)
                                .map((session) => (
                                  <TableRow key={session.id}>
                                    <TableCell>
                                      {dayjs(session.selectedDateTime).format(
                                        "DD/MM/YYYY hh:mm A"
                                      )}
                                    </TableCell>
                                    <TableCell align="center">
                                      <ButtonGroup>
                                        <Button
                                          size="small"
                                          component={RouterLink}
                                          to={`/s/${session.id}`}
                                        >
                                          <CreateIcon
                                            sx={{ mr: "5px" }}
                                          ></CreateIcon>
                                        </Button>
                                        <Button
                                          color="error"
                                          size="small"
                                          onClick={() =>
                                            handleSessionDelete(session)
                                          }
                                        >
                                          <DeleteIcon
                                            sx={{ mr: "5px" }}
                                          ></DeleteIcon>
                                        </Button>
                                      </ButtonGroup>
                                    </TableCell>
                                    <TableCell align="right">
                                      <Button
                                        size="small"
                                        color="success"
                                        variant="contained"
                                        onClick={() => startSession(session)}
                                      >
                                        Start Session
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableHead>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </TableContainer>

        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          FabProps={{ color: "success" }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              component={RouterLink}
              to={action.link}
            />
          ))}
        </SpeedDial>
      </Container>
    </>
  );
}

export default GroupList;
