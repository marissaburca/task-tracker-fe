import { Col, Row, Offcanvas, Button } from "react-bootstrap";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiAccountCircleFill, RiLockPasswordFill } from "react-icons/ri";
import { IoNotifications, IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";



export default function OffCanvas() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const logOutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.assign("/")
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
              <Link
                to="/dashboard"
                className="text-decoration-none text-body fs-5"
              >
                <IoHome className="me-3 mb-1" />
                Dashboard
              </Link>
            </Col>
            <Col className="col-12 mx-4 border-bottom border-2 py-3">
              <Link to="/" className="text-decoration-none text-body fs-5">
                <IoNotifications className="me-3 mb-1" />
                Notifications
              </Link>
            </Col>
            <Col className="col-12 mx-4 border-bottom border-2 py-3">
              <Link to="/account" className="text-decoration-none text-body fs-5">
                <RiAccountCircleFill className="me-3 mb-1" />
                Your Account
              </Link>
            </Col>
            <Col className="col-12 mx-4 border-bottom border-2 py-3">
              <Link to="/password" className="text-decoration-none text-body fs-5">
                <RiLockPasswordFill className="me-3 mb-1" />
                Edit Password
              </Link>
            </Col>
            <Col className="col-12 text-end mt-3">

                <Button
                  className="px-3 py-1 "
                  onClick={() => {
                    logOutUser();
                  }}
                >
                  LOG OUT
                </Button>

            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
