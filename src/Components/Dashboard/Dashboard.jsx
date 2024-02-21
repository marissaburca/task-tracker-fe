import { Col, Row } from "react-bootstrap";
import MyCalendar from "../Calendar/MyCalendar.jsx";
import MyNavbar from "../Navbar/MyNavbar.jsx";
import { MdAddTask } from "react-icons/md";
import React, { useState } from "react";
import MyModal from "../Modal/MyModal.jsx";

const token = localStorage.getItem("token");

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  async function handleAddTask(task) {
    try {
      const response = await fetch("http://localhost:3001/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      alert("Some error occurred during fetch: " + error.message);
      throw new Error(error);
    }
  }

  return (
    <>
      <Row className="ms-0">
        <MyNavbar />
      </Row>
      <Row className=" mx-0">
        <Col className="col-xs-12 col-lg-8 mt-3 mx-0"></Col>
        <Col className="col-xs-12 col-lg-4 mt-3 mx-0 ">
          <MyCalendar />
        </Col>
        <Col className="col-12">
          <Row className="pt-2 border border-3 mt-3 mx-auto">
            <Col className="col-md-9 col-lg-10"></Col>
            <Col className="col-md-3 col-lg-2 text-end">
              <button
                className="btn btn-success rounded-pill py-1"
                onClick={handleShowModal}
              >
                New Task <MdAddTask className="fs-5 createTask" />
              </button>
              <MyModal
                show={showModal}
                handleClose={handleCloseModal}
                handleAddTask={handleAddTask}
              />
            </Col>
            <Col className="col-12"> Placeholder</Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
