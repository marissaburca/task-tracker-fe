import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import MyCalendar from "../Calendar/MyCalendar";
import MyNavbar from "../Navbar/MyNavbar.jsx";
import MyFooter from "../Footer/MyFooter.jsx";
import AddTaskModal from "../Modals/AddTaskModal/AddTaskModal.jsx";
import EditTaskModal from "../Modals/EditTaskModal/EditTaskModal.jsx";
import NoteBlock from "../NoteBlock/NoteBlock.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  handleGetTasks,
  updateTaskStatus,
  handleDeleteTask,
} from "../../Redux/Actions/taskActions.js";
import { MdAddTask } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useTheme } from "../../ThemeContext/ThemeProvider";

export default function Dashboard() {
  const { theme } = useTheme();
  const themeClass = theme === 'light' ? 'light' : 'dark';
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) dispatch(handleGetTasks(token));
  }, [dispatch, token]);

  // STATE AND LOGIC FOR ADDING TASK MODAL
  const [showAddModal, setShowAddModal] = useState(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  // STATE AND LOGIC FOR EDITING TASK MODAL
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const handleShowEditModal = (task) => {
    setCurrentTask(task);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => setSelectedDate(date);

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter(
        (task) =>
          new Date(task.date).toDateString() ===
          new Date(selectedDate).toDateString()
      )
    : [];

  // SORT TASK BY PRIORITY
  const sortedTasks = filteredTasks.sort((a, b) => {
    const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // FUNCTION TO CHANGE TASK STATUS
  const handleStatusChange = (id, newStatus) => {
    dispatch(updateTaskStatus(id, newStatus, token));
  };

  // FUNCTION FOR TASK DELETION
  const handleDelete = (id) => {
    dispatch(handleDeleteTask(id, token));
  };

  // FUNCTION TO OBTAIN COLOR BASED ON STATUS
  const getStatusColor = (status) => {
    switch (status) {
      case "CREATED":
        return "linear-gradient(to left, #ff2a00 0px, #ff2a00 10px, transparent 900px)";
      case "IN_PROGRESS":
        return "linear-gradient(to left, rgb(242,228,110) 0px, rgb(242,228,110) 30px, transparent 900px)";
      case "DONE":
        return "linear-gradient(to left, rgb(127, 188, 21) 0px, rgb(127, 188, 21) 100px, transparent 900px)";
      default:
        return "linear-gradient(to left, #ff2a00 0px, #ff2a00 10px, transparent 900px)";
    }
  };

  return (
    <div className="dashOrder">
      <Row className="ms-0">
        <MyNavbar />
      </Row>
      <Row className="mx-0 dashBody">
        {" "}
        <Col xs={12} md={5} className="mt-2 mx-0 dashCalendar">
          <MyCalendar selectedDate={handleDateChange} />
        </Col>
        <Col xs={12} md={7} className="mt-2 mx-0 dashNotes">
          <NoteBlock />
        </Col>
        <Col xs={12} classname={`dashTasks ${themeClass}`}>
          <Row className="task-container">
            <Col xs={12}>
              <Row className="shadowHeader">
                <Col xs={6} md={8} lg={10} className="selectedDate">
                  {selectedDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Col>
                <Col xs={6} md={4} lg={2} className="text-end my-2">
                  <button
                    className="taskBTN-1 py-1"
                    onClick={handleShowAddModal}
                  >
                    New Task <MdAddTask className="fs-5 createTask" />
                  </button>
                </Col>
              </Row>
            </Col>
            <Col xs={12} className="tasksBlock">
              {filteredTasks.length > 0 ? (
                <div className="scrollable" data-bs-spy="scroll">
                  <Row className="text-center ms-3 me-0 mb-2 align-items-center ">
                    <Col xs={2}>Title</Col>
                    <Col xs={3}>Description</Col>
                    <Col xs={1}>Time</Col>

                    <Col xs={2}>In progress</Col>
                    <Col xs={1}>Done</Col>
                    <Col xs={2}>Edit</Col>
                    <Col xs={1} className="ps-0">
                      Delete
                    </Col>
                  </Row>

                  {sortedTasks.map((task) => (
                    <Row
                      key={task.id}
                      className="text-center ms-3 me-0 my-2 py-1 align-items-center taskDim"
                      style={{
                        backgroundImage: getStatusColor(task.status),
                        borderRadius: "10px",
                      }}
                    >
                      <Col xs={2} className="cut fw-bold ">
                        {task.title}
                      </Col>
                      <Col xs={3} className="cut ">
                        {task.description}
                      </Col>
                      <Col xs={1}>{task.time.substr(0, 5)}</Col>

                      <Col xs={2}>
                        <Form.Check
                          type="checkbox"
                          checked={task.status === "IN_PROGRESS"}
                          onChange={() =>
                            handleStatusChange(task.id, "IN_PROGRESS")
                          }
                        />
                      </Col>
                      <Col xs={1}>
                        <Form.Check
                          type="checkbox"
                          checked={task.status === "DONE"}
                          onChange={() => handleStatusChange(task.id, "DONE")}
                        />
                      </Col>
                      <Col xs={2}>
                        <button
                          className="taskBTN "
                          onClick={() => handleShowEditModal(task)}
                        >
                          <CiEdit />
                        </button>
                      </Col>
                      <Col xs={1} className="ps-0">
                        <button
                          className="taskBTN"
                          onClick={() => handleDelete(task.id)}
                        >
                          <MdDeleteOutline />
                        </button>
                      </Col>
                    </Row>
                  ))}
                </div>
              ) : (
                <p>No tasks found for selected date.</p>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="ms-0">
        <MyFooter />
      </Row>
      {/* MODALS FOR DELETION OR UPDATE TASK*/}
      <AddTaskModal show={showAddModal} handleClose={handleCloseAddModal} />
      {currentTask && (
        <EditTaskModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          task={currentTask}
        />
      )}
    </div>
  );
}
