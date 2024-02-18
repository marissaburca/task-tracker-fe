import { Col, Row, Offcanvas, Button } from "react-bootstrap";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoNotifications, IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function OffCanvas() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const logOutUser = (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    const pswd = localStorage.getItem("pswd");
    localStorage.removeItem("email", email);
    localStorage.removeItem("pswd", pswd);
  };

  return (
    <>
      <div
        className="d-flex justify-content-start py-2 "
        onClick={toggleOffcanvas}
      >
        <GiHamburgerMenu className="fs-2 text-secondary hamburger" />
      </div>
      <Offcanvas
        placement="end"
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
      >
        <Offcanvas.Header closeButton className=" border-4 border-bottom ">
          <Offcanvas.Title className="fw-bold fs-3 ">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row className="p-0">
          <Col className="col-12 mx-4 border-bottom border-2 pb-3">
              <Link to="/dashboard" className="text-decoration-none text-body fs-5">
                <IoHome className="me-3 mb-1" />
                Home
              </Link>
            </Col>
            <Col className="col-12 mx-4 border-bottom border-2 py-3">
              <Link to="/" className="text-decoration-none text-body fs-5">
                <IoNotifications className="me-3 mb-1" />
                Notifications
              </Link>
            </Col>
            <Col className="col-12 mx-4 border-bottom border-2 py-3">
              <Link to="/" className="text-decoration-none text-body fs-5">
                <RiAccountCircleFill className="me-3 mb-1" />
                Account
              </Link>
            </Col>
            <Col className="col-12 text-end mt-3">
              <Link to="/">
                <Button
                  className="px-3 py-1 "
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    logOutUser();
                  }}
                >
                  LOG OUT
                </Button>
              </Link>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
