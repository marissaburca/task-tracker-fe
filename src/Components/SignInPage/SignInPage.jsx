import "../SharedCSS/AccessPages.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setSurname,
  setUsername,
  setGender,
  setAvatar,
  setEmail,
  setPassword,
  signinUser,
} from "../../Redux/Actions/signinActions";

async function getAvatars() {
  try {
    const response = await fetch("http://localhost:3001/avatar");
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error(`Request failed: ${response.status}`);
    }
  } catch (error) {
    //HANDLES NETWORK ERRORS OR OTHERS
    console.error("Error while fetching avatars: ", error.message);
    throw error;
  }
}

export default function SignInPage() {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const data = await getAvatars(); // CALL TO ASYNC FUNCTION
        setAvatars(data); // SAVES DATA IN COMPONENT STATE
      } catch (error) {
        console.error("Error while recovering avatars: ", error);
      }
    };

    fetchAvatars();
  }, []);

  /* ***************** USER REGISTRATION  ****************** */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);

  const name = useSelector((state) => state.signin.name);
  const surname = useSelector((state) => state.signin.surname);
  const username = useSelector((state) => state.signin.username);
  const gender = useSelector((state) => state.signin.gender);
  const avatarId = useSelector((state) => state.signin.avatarId);
  const email = useSelector((state) => state.signin.email);
  const password = useSelector((state) => state.signin.password);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      alert("Error due to validation! Fill correctly the fields.");
    } else {
      setValidated(true);
      dispatch(
        signinUser({
          name,
          surname,
          username,
          gender,
          avatarId,
          email,
          password,
        })
      );
      navigate("/");
    }
  };

  /* *************** GENDER DROPDOWN ************* */
  const Gender = {
    MALE: "MALE",
    FEMALE: "FEMALE",
    NON_BINARY: "NON_BINARY",
    GENDERQUEER: "GENDERQUEER",
    GENDERFLUID: "GENDERFLUID",
    AGENDER: "AGENDER",
    TWO_SPIRIT: "TWO_SPIRIT",
    OTHER: "OTHER",
    PREFER_NOT_TO_SAY: "PREFER_NOT_TO_SAY",
  };

  const genderOptions = Object.values(Gender);

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
    borderColor: focusedInput === inputId ? "rgb(166, 244, 32)" : "",
    boxShadow:
      focusedInput === inputId ? "0px 0px 20px 5px rgb(166, 244, 32)" : "",
  });
  /* AVATAR CLICKED */
  const [selectedAvatarId, setSelectedAvatarId] = useState(null);

  const handleAvatarClick = (id) => {
    dispatch(setAvatar(id));
    setSelectedAvatarId(id); // UPDATE AVATAR ID WHEN SELECTED
  };

  /* ************************************************ */

  return (
    <Row className="mx-auto w-75 ">
      <Col className="anim2 d-flex text-center col-12 mb-3 ">
        <h1 className="enter2 animate__animated animate__flip">TASK TRACKER</h1>
      </Col>
      <Col className="px-0 logFormExt2 col-12 ">
        <Form onSubmit={handleSubmit} className="logFormInt2 text-start">
          <Row className="mb-3" validated={validated}>
            <Form.Group className="col-6 mb-3" controlId="validationCustom01">
              <Form.Label className="labels">FIRST NAME</Form.Label>
              <Form.Control
                onFocus={() => handleFocus("fn")}
                style={inputStyle("fn")}
                className="glow1"
                required
                onChange={(e) => dispatch(setName(e.target.value))}
                type="text"
                placeholder="first name.."
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="col-6" controlId="validationCustom02">
              <Form.Label className="labels">LAST NAME</Form.Label>
              <Form.Control
                onFocus={() => handleFocus("sn")}
                style={inputStyle("sn")}
                className="glow1"
                onChange={(e) => dispatch(setSurname(e.target.value))}
                required
                type="text"
                placeholder="last name..."
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="col-12 mb-2"
              controlId="validationCustomUsername"
            >
              <Form.Label className="labels">USERNAME</Form.Label>
              <InputGroup>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  onFocus={() => handleFocus("us")}
                  style={inputStyle("us")}
                  type="text"
                  placeholder="username.."
                  aria-describedby="inputGroupPrepend"
                  required
                  className="glow1"
                  onChange={(e) => dispatch(setUsername(e.target.value))}
                />
                <Form.Control.Feedback>Nice one!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please choose an username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="genderSelect" className="col-12 mb-2 w-75">
              <Form.Label className="labels">GENDER</Form.Label>
              <Form.Select
                onFocus={() => handleFocus("gr")}
                style={inputStyle("gr")}
                className="glow1"
                aria-label="Gender select"
                onChange={(e) => dispatch(setGender(e.target.value))}
              >
                {genderOptions.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="avatarSelect" className="col-11">
              <Form.Label className="labels">CHOOSE AN AVATAR</Form.Label>
              <div className="avatar-selection-container">
                {Array.isArray(avatars) &&
                  avatars.map((avatar) => (
                    <div
                      key={avatar.id}
                      className={`avatar-option ${
                        selectedAvatarId === avatar.id
                          ? "avatar-img-clicked"
                          : ""
                      }`}
                      onClick={() => handleAvatarClick(avatar.id)}
                      style={{
                        cursor: "pointer",
                        display: "inline-block",
                        margin: "5px",
                      }}
                    >
                      <img
                        src={avatar.url}
                        alt={`Avatar ${avatar.id}`}
                        className="avatar-img"
                      />
                    </div>
                  ))}
              </div>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group className="col-12 mb-3" controlId="validationCustom03">
              <Form.Label className="labels">EMAIL</Form.Label>
              <Form.Control
                onFocus={() => handleFocus("em")}
                style={inputStyle("em")}
                className="glow1"
                onChange={(e) => dispatch(setEmail(e.target.value))}
                type="email"
                placeholder="type email..."
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="col-12 mb-3" controlId="validationCustom04">
              <Form.Label className="labels">PASSWORD</Form.Label>
              <Form.Control
                onFocus={() => handleFocus("pw")}
                style={inputStyle("pw")}
                className="glow1"
                type="password"
                placeholder="type password..."
                required
                onChange={(e) => dispatch(setPassword(e.target.value))}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Col className="col-12 d-flex test-start">
            <Form.Group className="mb-3">
              <Form.Check
                required
                type="checkbox"
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
          </Col>
          <Col className="col-12 d-flex justify-content-between">
            <button type="submit" className="glowing-btn-2 px-3 py-1 fw-bold">
              SUBMIT
            </button>
            <Link to="/">
              <button className="glowing-btn-1 px-3 py-1 fw-bold">
                BACK TO LOGIN
              </button>
            </Link>
          </Col>
        </Form>
      </Col>
    </Row>
  );
}
