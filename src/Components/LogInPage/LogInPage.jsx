import "../SharedCSS/AccessPages.css";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import {
  setEmail,
  setPassword,
  loginUser,
} from "../../Redux/Actions/authActions.js";

export default function LogInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.formBasicEmail.value;
    const password = e.target.formBasicPassword.value;
    dispatch(setEmail(email));
    dispatch(setPassword(password));
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  /* ******* FOCUS ON INPUT FIELD AND OUT ********* */
  const [focusedInput, setFocusedInput] = useState(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.tagName !== "INPUT") {
        setFocusedInput(null);
      }
    }

    // ADDING EV. LISTENER TO DOC
    document.addEventListener("mousedown", handleClickOutside);

    // REMOVING EV. LISTINER WHEN COMPONENT UNMOUNTED (AVOIDS BUGS)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // EMPTY ARRAY MAKES SURE THAT EFFECT IS APPLIED JUST FOR MOUNTING AND UNMOUNTING

  const handleFocus = (inputId) => {
    setFocusedInput(inputId);
  };

  const inputStyle = (inputId) => ({
    borderColor: focusedInput === inputId ? "rgb(219, 98, 55)" : "",
    boxShadow: focusedInput === inputId ? "0px 0px 20px 5px #ffaa00" : "",
  });

  return (

    <Row className="mx-auto w-75 mt-5 ">
      <Col className="anim d-flex text-center mb-3 mt-5 ">
        <h1 className="enter animate__animated animate__flip ">
          TASK TRACKER
        </h1>
      </Col>
      <Col xs={12} className="px-0 logFormExt ">
        <Form onSubmit={handleSubmit} className="logFormInt">
          <Row>
            <Col xs={12}>
              <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
                <Form.Label className="labels">EMAIL ADDRESS</Form.Label>
                <Form.Control
                  onFocus={() => handleFocus("em")}
                  style={inputStyle("em")}
                  required
                  type="email"
                  placeholder="enter email..."
                  className="glow"
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="labels">PASSWORD</Form.Label>
                <Form.Control
                  onFocus={() => handleFocus("pw")}
                  style={inputStyle("pw")}
                  required
                  type="password"
                  placeholder="password..."
                  className="glow"
                />
              </Form.Group>
            </Col>
            <Col xs={6} className=" d-flex align-self-end ">
              <button className="px-3 py-1 glowing-btn-1 fw-bold" type="submit">
                LOG IN
              </button>
            </Col>
            <Col   xs={6} className="text-end">
              <div className="register"> Don't you have an account yet?</div>

              <Link to="/register">
                <button className="px-3 py-1 glowing-btn-2 fw-bold ">
                  SIGN UP
                </button>
              </Link>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
