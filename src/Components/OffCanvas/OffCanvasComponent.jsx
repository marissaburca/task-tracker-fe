import "./OffCanvas.css";
import { Col, Row, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiAccountCircleFill, RiLockPasswordFill } from "react-icons/ri";
import { IoNotifications, IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useTheme } from "../../ThemeContext/ThemeProvider";
import { GrDocumentText } from "react-icons/gr";


export default function OffCanvas() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { theme } = useTheme();
  const themeClass = theme === "light" ? "light" : "dark";

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const logOutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.assign("/");
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
        className={` offCanv ${themeClass}`}
        placement="end"
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
      >
        <Offcanvas.Header closeButton className=" border-4 border-bottom ">
          <Offcanvas.Title className="fw-bold fs-3 ">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row className="p-0">
            <Col className="col-12 mx-4 border-bottom border-2 pb-3 ">
              <Link
       
                to="/dashboard"
                className="text-decoration-none text-secondary action fs-5  d-flex align-items-center "
              >
                <IoHome className="me-3 mb-1" />
                <p className="mb-0">Dashboard</p>
              </Link>
            </Col>
            <Col className="col-12 mx-4 border-bottom border-2 py-3 ">
              <Link
                to="/"
                className="text-decoration-none text-secondary action fs-5  d-flex align-items-center "
              >
                <IoNotifications className="me-3 mb-1" />
                <p className="mb-0">Notification</p>
              </Link>
            </Col>
            <Col className="col-12 mx-4 border-bottom border-2 py-3">
              <Link
                to="/account"
                className="text-decoration-none text-secondary action fs-5  d-flex align-items-center "
              >
                <RiAccountCircleFill className="me-3 mb-1" />
                <p className="mb-0">Your Account</p>
              </Link>
            </Col>
            <Col className="col-12 mx-4 border-bottom border-2 py-3">
              <Link
                to="/password"
                className="text-decoration-none text-secondary action fs-5  d-flex align-items-center "
              >
                <RiLockPasswordFill className="me-3 mb-1" />
                <p className="mb-0">Edit Password</p>
              </Link>
            </Col>
            <Col className="col-12 mx-4 border-bottom border-2 py-3">
              <Link
                to="/terms"
                className="text-decoration-none text-secondary action fs-5  d-flex align-items-center "
              >
                <GrDocumentText className="me-3 mb-1" />
                <p className="mb-0">Terms & Conditions</p>
              </Link>
            </Col>
            <Col className="col-12 text-end mt-3">
              <button
                type="button"
                className="px-3 py-1 glowing-btn-1 "
                onClick={() => {
                  logOutUser();
                }}
              >
                LOG OUT
              </button>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
