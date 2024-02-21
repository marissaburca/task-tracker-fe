import "../SharedCSS/AccessPages.css";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { Row, Col} from "react-bootstrap";
import { setEmail, setPassword, loginUser } from '../../Redux/Actions/authActions.js';

export default function LogInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    navigate("/dashboard");
};


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
    <Row className="mx-auto w-75 ">
      <Col className="anim d-flex text-center col-12 mb-3 ">
        <h1 className="enter  animate__animated animate__flip ">TASK TRACKER</h1>
      </Col>
      <Col className="px-0 logFormExt col-12">
        <Form onSubmit={handleSubmit} className="logFormInt">
          <Row>
            <Col className=" col-12">
              <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
                <Form.Label className="labels">EMAIL ADDRESS</Form.Label>
                <Form.Control
                  onFocus={() => handleFocus("em")}
                  style={inputStyle("em")}
                  required
                  type="email"
                  placeholder="enter email..."
                  value={email}
                  onChange={(e) => dispatch(setEmail(e.target.value))}
                  className="glow"
                />
              </Form.Group>
            </Col>
            <Col className=" col-12">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="labels">PASSWORD</Form.Label>
                <Form.Control
                  onFocus={() => handleFocus("pw")}
                  style={inputStyle("pw")}
                  required
                  type="password"
                  placeholder="password..."
                  value={password}
                  onChange={(e) => dispatch(setPassword(e.target.value))}
                  className="glow"
                />
              </Form.Group>
            </Col>
            <Col className="col-4 d-flex align-self-end ">
              <button className="px-3 py-1 glowing-btn-1 fw-bold" type="submit">
                LOGIN
              </button>
            </Col>
            <Col className="col-8 text-end">
              <div className="register"> Don't you have an account yet?</div>

              <Link to="/register">
                <button
                  className="px-3 py-1 glowing-btn-2 fw-bold "
                >
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
