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
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import Grid from "@mui/material/Grid";

function SessionScheduler() {
  const navigate = useNavigate();
  const courseInLocalStorage = localStorage.getItem("courses");
  const [courses, setCourses] = useState(
    courseInLocalStorage ? JSON.parse(courseInLocalStorage) : []
  );

  const groupInLocalStorage = localStorage.getItem("group");

  const [groups, setGroups] = useState(
    groupInLocalStorage ? JSON.parse(groupInLocalStorage) : []
  );

  const sessionInLocalStorage = localStorage.getItem("sessions");
  const [sessions, setSessions] = useState(
    sessionInLocalStorage ? JSON.parse(sessionInLocalStorage) : []
  );

  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(dayjs());
  const [topic, setTopic] = useState("");
  const [location, setLocation] = useState("");

  const handleAddSession = () => {
    if (
      selectedDateTime === dayjs() ||
      selectedGroup === "" ||
      topic === "" ||
      location === ""
    ) {
      toast("Please fill in all fields.");
    } else {
      const updatedSession = [
        ...sessions,
        {
          id: nanoid(),
          selectedDateTime: selectedDateTime.toLocaleString(),
          selectedGroup: selectedGroup,
          topic: topic,
          location: location,
        },
      ];
      setSessions(updatedSession);

      localStorage.setItem("sessions", JSON.stringify(updatedSession));
      toast("Session has been created.");

      navigate("/");
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ pt: "60px", mb: "25px" }}>
        <Typography variant="h4">Create a Session</Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["StaticDateTimePicker"]}>
                <DemoItem>
                  <StaticDateTimePicker
                    value={selectedDateTime}
                    onChange={(newDateTime) => {
                      setSelectedDateTime(newDateTime);
                    }}
                    disablePast
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7 }}>
            <Paper elevation={1} sx={{ p: "30px", mt: "9px", mb: "40px" }}>
              <Box sx={{ mt: "15px" }}>
                <Typography variant="h6">
                  Selected Time: {selectedDateTime.format("DD/MM/YYYY hh:mm A")}
                </Typography>
              </Box>
              <FormControl sx={{ mt: "25px" }} fullWidth>
                <InputLabel color="success" id="demo-simple-select-label">
                  Group
                </InputLabel>
                <Select
                  color="success"
                  labelId="note_category_label"
                  id="group_name"
                  label="Group"
                  defaultValue=""
                  onChange={(event) => {
                    setSelectedGroup(event.target.value);
                  }}
                >
                  {groups.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.groupName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                color="success"
                sx={{ mt: "25px" }}
                fullWidth
                id="group_topic"
                label="Topic"
                variant="outlined"
                autoFocus
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
              />
              <TextField
                color="success"
                sx={{ mt: "25px" }}
                fullWidth
                id="group_location"
                label="Location"
                variant="outlined"
                autoFocus
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
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
                  onClick={handleAddSession}
                >
                  Create Session
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default SessionScheduler;
