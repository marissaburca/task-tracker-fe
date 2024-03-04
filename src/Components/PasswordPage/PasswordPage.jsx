import "./PasswordPage.css"
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { updateUserPassword } from "../StructuralApi/UserApi";
import MyNavbar from "../Navbar/MyNavbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyFooter from "../Footer/MyFooter";

export default function PasswordPage() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [choosedPasswords, setChoosedPasswords] = useState({
    pswdOne: "",
    pswdTwo: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setChoosedPasswords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (choosedPasswords.pswdOne === choosedPasswords.pswdTwo) {
      updateUserPassword({ password: choosedPasswords.pswdTwo }, token)
        .then(message => {
          alert(message); 
          navigate("/dashboard");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("You typed two different passwords");
    }
  };

  /* ******* FOCUS ON INPUT FIELD AND OUT ********* */
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.tagName !== "INPUT") {
        setFocusedInput(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleFocus = (inputId) => {
    setFocusedInput(inputId);
  };

  const inputStyle = (inputId) => ({
    borderColor: focusedInput === inputId ? "rgb(219, 98, 55)" : "",
    boxShadow: focusedInput === inputId ? "0 0 20px 5px #ff2a00" : "",
  });
  return (
    <div className="pswdChange">
      <Row className="mx-0">
        <MyNavbar />
      </Row>
      <Row className="mx-0 middle">
        <Form className=" myFormPsws text-start mx-auto mt-5">
          <Row className="mb-3">
            <Row>
              <Col xs={12}>
                <h2>EDIT PASSWORD</h2>
              </Col>
              <Col xs={12}>
                <p>Remember that the contents of input fields must be same</p>
              </Col>
            </Row>
            <Col xs={12}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label className="labels"></Form.Label>
              <Form.Control
                onFocus={() => handleFocus("np")}
                style={inputStyle("np")}
                className="glow2"
                required
                type="password"
                placeholder="new password.."
                name="pswdOne"
                value={choosedPasswords.pswdOne}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12}>
            <Form.Group  className="mb-3" controlId="validationCustom02">
              <Form.Label className="labels"></Form.Label>
              <Form.Control
                onFocus={() => handleFocus("npa")}
                style={inputStyle("npa")}
                className="glow2"
                required
                type="password"
                placeholder="type again new password.."
                name="pswdTwo"
                value={choosedPasswords.pswdTwo}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            </Col>
          </Row>

          <Row className="mx-0 mt-4  justify-content-center">
            <Col xs={12} className="px-0">
            <button type="submit" className="glowing-btn-1 px-3 py-1 fw-bold" onClick={handleSubmit}>
              Save changes
            </button></Col>
          </Row>
        </Form>
      </Row>
      <Row>
        <MyFooter/>
      </Row>

    </div>
  );
}
