import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { updateUserPassword } from "../StructuralApi/UserApi";
import MyNavbar from "../Navbar/MyNavbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PasswordPage() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [choosedPasswords, setChoosedPasswords] = useState({
    pswdOne: "",
    pswdTwo: "",
  });
 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setChoosedPasswords(prevState => ({
      ...prevState,
      [name]: value, 
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault(); 
    if(choosedPasswords.pswdOne === choosedPasswords.pswdTwo){
        updateUserPassword({password: choosedPasswords.pswdTwo }, token) 
       .then((message) => {
          alert(message);
          navigate('/dashboard');
       })
       .catch(error => {
          console.error("Errore while updating password", error.message);
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
    <>
    <Row>
<MyNavbar/>
    </Row>
    <Row className="text-body">
      <Form className="logFormInt text-start" onSubmit={handleSubmit}>
        <Row className="mb-3">
            <Row className=""> 
               <Col className="col-12">
               <h2>EDIT PASSWORD</h2></Col>  
               <Col className="col-12">
               <p>Remember that the contents of  input fields must be same</p></Col>  
            </Row>
          <Form.Group className="col-12 mb-3" controlId="validationCustom01">
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
        </Row>
        <Row className="mb-3">
          <Form.Group className="col-12 mb-3" controlId="validationCustom02">
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
        </Row>

        <Row className="col-12 d-flex justify-content-between">
          <button type="submit" className="glowing-btn-1 px-3 py-1 fw-bold">
            Save changes
          </button>
        </Row>
      </Form>
    </Row>
    </>
  );
}
