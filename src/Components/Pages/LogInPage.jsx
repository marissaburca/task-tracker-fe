import "../CSS/AccessPages.css"
import { Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



export default function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
  /* ************************************************ */
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await getUser();
      const token = localStorage.getItem("token");
      console.log("Saved token:", token);
      localStorage.setItem("email", email);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login request:", error);
    }
  };
  async function getUser() {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      console.log("Token:", data.token);
    } catch (error) {
      alert("WRONG CREDENTIALS! Try again.");
      throw new Error(error);
    }
  }
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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
                  type="submit"
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
