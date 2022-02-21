import { initStorage, getAllTasks, deleteTask } from "./services/tasksServices";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CreateTask } from "./components/CreateTask";
import { TasksTable } from "./components/TasksTable";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isTaskEdited, setTaskEdited] = useState(false);
  const [numberOfTasks, setNumberOfTasks] = useState(0);
  const fetchData = useRef(() => {});

  fetchData.current = () => {
    const allTasks = getAllTasks();
    setTasks(allTasks);
    setNumberOfTasks(allTasks.length);
  };

  useEffect(() => {
    initStorage();
  }, []);

  useEffect(() => {
    fetchData.current();
    setTaskEdited(false);
  }, [fetchData, numberOfTasks, isTaskEdited]);

  const showEditModalHandler = (data) => setTaskEdited(data.isEdited);

  const taskCreated = () => setNumberOfTasks(numberOfTasks + 1);

  const deleteTaskHandler = (data) => {
    deleteTask(data);
    setNumberOfTasks(numberOfTasks - 1);
  };

  return (
    <div className="app">
      <div>
        <Header />
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-12">
              <CreateTask taskCreated={taskCreated} />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <TasksTable
          tasks={tasks}
          showEditModalHandler={showEditModalHandler}
          deleteHandler={deleteTaskHandler}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
