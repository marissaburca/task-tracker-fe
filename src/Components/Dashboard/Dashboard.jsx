import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import MyCalendar from "../Calendar/MyCalendar";
import MyNavbar from "../Navbar/MyNavbar.jsx";
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
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export default function Dashboard() {
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
        return "red";
      case "IN_PROGRESS":
        return "yellow";
      case "DONE":
        return "green";
      default:
        return "red";
    }
  };

  return (
    <>
      <Row className="ms-0">
        <MyNavbar />
      </Row>
      <Row className="mx-0">
        <Col className="col-xs-12 col-lg-9 mt-3 mx-0">
          <NoteBlock />
        </Col>
        <Col className="col-xs-12 col-lg-3 mt-3 mx-auto">
          <MyCalendar selectedDate={handleDateChange} />
        </Col>
        <Col className="col-12">
          <Row className="pt-2 border border-3 mt-3 mx-auto">
            <Col className="col-12">
              <Row className="shadowHeader justify-content-center">
                <Col className="col-md-9 col-lg-10 selectedDate text-center text-body">
                  {selectedDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Col>
                <Col className="col-md-3 col-lg-2 text-end mt-2">
                  <button
                    className="btn btn-success rounded-pill py-1"
                    onClick={handleShowAddModal}
                  >
                    New Task <MdAddTask className="fs-5 createTask" />
                  </button>
                </Col>
              </Row>
            </Col>
            <Col className="col-12">
              {filteredTasks.length > 0 ? (
                <>
                  <Row className="text-center">
                    <Col className="col-2">Title</Col>
                    <Col className="col-3">Description</Col>
                    <Col className="col-1">Time</Col>

                    <Col className="col-2">In progress</Col>
                    <Col className="col-1">Done</Col>
                    <Col className="col-2">Edit</Col>
                    <Col className="col-1">Delete</Col>
                  </Row>
                  {filteredTasks.map((task) => (
                    <Row
                      key={task.id}
                      className="text-center"
                      style={{ backgroundColor: getStatusColor(task.status) }}
                    >
                      <Col className="col-2">{task.title}</Col>
                      <Col className="col-3">{task.description}</Col>
                      <Col className="col-1">{task.time.substr(0, 5)}</Col>

                      <Col className="col-2">
                        <Form.Check
                          type="checkbox"
                          checked={task.status === "IN_PROGRESS"}
                          onChange={() =>
                            handleStatusChange(task.id, "IN_PROGRESS")
                          }
                        />
                      </Col>
                      <Col className="col-1">
                        <Form.Check
                          type="checkbox"
                          checked={task.status === "DONE"}
                          onChange={() => handleStatusChange(task.id, "DONE")}
                        />
                      </Col>
                      <Col className="col-2">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleShowEditModal(task)}
                        >
                          <FaRegEdit />
                        </button>
                      </Col>
                      <Col className="col-1">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(task.id)}
                        >
                          <MdDeleteOutline />
                        </button>
                      </Col>
                    </Row>
                  ))}
                </>
              ) : (
                <p>No tasks found for selected date.</p>
              )}
            </Col>
          </Row>
        </Col>
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
    </>
  );
}
