import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import TasksList from "./components/taskListComp/tasksListComp/tasksList";
import EditTask from "./components/taskListComp/editTaskComp/editTask";
import NewTask from "./components/taskListComp/newTaskComp/newTask";
import { useState } from "react";
import Settings from "./components/taskListComp/settingComp/setting";
import ThemeContext from "./context/themeContext";

function App() {
  const [theme, setTheme] = useState({
    name: "light",
    color: "gray",
    backgroundColor: "white",
  });

  const swicthTheme = () => {
    alert(theme.name);
    if ((theme.name === "light")) {
      setTheme({
        name: "dark",
        color: "white",
        backgroundColor: "gray",
      });
    } else {
      setTheme({
        name: "light",
        color: "gray",
        backgroundColor: "white",
      });
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        style={{
          color: theme.color,
          backgroundColor: theme.backgroundColor,
        }}
      >
        <Routes>
          <Route path="/" element={<TasksList />} ></Route>
          <Route path="/edit/:id" element={<EditTask />}></Route>
          <Route path="/new" element={<NewTask />}></Route>
          <Route
            path="/set"
            element={<Settings onChange={swicthTheme} />}
          ></Route>
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
