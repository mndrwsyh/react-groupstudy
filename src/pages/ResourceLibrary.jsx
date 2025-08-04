import { useState } from "react";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { Container, Box, Typography, TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function ResourceLibrary() {
  const courseInLocalStorage = localStorage.getItem("courses");
  const [courses, setCourses] = useState(
    courseInLocalStorage ? JSON.parse(courseInLocalStorage) : []
  );

  const resourceInLocalStorage = localStorage.getItem("resources");
  const [resources, setResources] = useState(
    resourceInLocalStorage ? JSON.parse(resourceInLocalStorage) : []
  );

  const [label, setLabel] = useState("");

  const handleAddResource = () => {
    if (label === "" || resourceCourse === "") {
      toast("Please fill in the field.");
    } else {
      const updatedResource = [
        ...resources,
        {
          id: nanoid(),
          label: label,
          resourceCourse: resourceCourse,
        },
      ];
      setResources(updatedResource);
      toast("New resource has been added.");
      setLabel("");
      localStorage.setItem("resources", JSON.stringify(updatedResource));
    }
  };

  const handleDelete = (resource) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this resource material?"
    );
    if (confirmDelete) {
      const updatedResource = resources.filter(
        (item) => item.id !== resource.id
      );
      setResources(updatedResource);
      toast("Resource material has been deleted.");

      localStorage.setItem("resources", JSON.stringify(updatedResource));
    }
  };

  const [resourceCourse, setResourceCourse] = useState("All");

  const getCourse = (resource) => {
    const resourceCourse = courses.find(
      (c) => c.id === resource.resourceCourse
    );
    if (resourceCourse) {
      return resourceCourse.label;
    } else {
      return "No course boohoo";
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4">Resource Library</Typography>
        <FormControl
          sx={{
            width: "150px",
            mt: "20px",
          }}
        >
          <InputLabel id="demo-simple-select-label" color="success">
            Course
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Course"
            color="success"
            defaultValue=""
            value={resourceCourse}
            onChange={(event) => {
              setResourceCourse(event.target.value);
            }}
          >
            <MenuItem value={"All"}>All Courses</MenuItem>
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Card
          sx={{
            p: "20px",
            mt: "10px",
          }}
        >
          <InputLabel sx={{ mt: "10px" }}>Add Links/Notes/Material</InputLabel>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              mt: "5px",
            }}
          >
            <TextField
              color="success"
              disabled={resourceCourse === "All"}
              fullWidth
              label="Link/Notes/Material"
              variant="outlined"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
            <Button
              disabled={resourceCourse === "All"}
              onClick={handleAddResource}
              color="success"
              variant="contained"
            >
              Add
            </Button>
          </Box>
          <List sx={{ mt: "20px", width: "100%" }}>
            {resources

              .filter((r) => {
                if (resourceCourse === "All") {
                  return true;
                } else if (r.resourceCourse === resourceCourse) {
                  return true;
                }
                return false;
              })
              .map((resource) => (
                <ListItem
                  key={resource.id}
                  disableGutters
                  divider
                  secondaryAction={
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      {/* <IconButton onClick={() => handleUpdate(resource)}>
                        <Edit />
                      </IconButton> */}
                      <IconButton onClick={() => handleDelete(resource)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText primary={`${resource.label}`} />

                  <Chip color="success" label={getCourse(resource)} />
                </ListItem>
              ))}
          </List>
        </Card>
      </Container>
    </>
  );
}

export default ResourceLibrary;
