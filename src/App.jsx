import { BrowserRouter as Router, Routes, Route } from "react-router";
import AppBar from "./components/AppBar";
import { Toaster } from "sonner";
import GroupList from "./pages/GroupList";
import CourseStudent from "./pages/CourseStudent";
import SessionScheduler from "./pages/SessionScheduler";
import ResourceLibrary from "./pages/ResourceLibrary";
import AddGroup from "./pages/AddGroup";
import EditGroup from "./pages/EditGroup";
import EditSession from "./pages/EditSession";
import StartSession from "./pages/StartSession";

/*
Routes:
All Notes = /
Add Note = /add
Categories = /categories
*/

function App() {
  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path="/" element={<GroupList />} />
        <Route path="/sessionstart/:id" element={<StartSession />} />
        <Route path="/addgroup" element={<AddGroup />} />
        <Route path="/g/:id" element={<EditGroup />} />
        <Route path="/scheduler" element={<SessionScheduler />} />
        <Route path="/s/:id" element={<EditSession />} />
        <Route path="/CourseStudent" element={<CourseStudent />} />
        <Route path="/library" element={<ResourceLibrary />} />
      </Routes>
      <Toaster position="bottom-left" />
    </Router>
  );
}

export default App;
