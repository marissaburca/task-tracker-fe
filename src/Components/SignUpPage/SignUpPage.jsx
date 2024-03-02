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
  signupUser,
} from "../../Redux/Actions/userActions";
import getAvatars from "../StructuralApi/AvatarApi";

export default function SignUpPage() {
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

  const name = useSelector((state) => state.user.name);
  const surname = useSelector((state) => state.user.surname);
  const username = useSelector((state) => state.user.username);
  const gender = useSelector((state) => state.user.gender);
  const avatarId = useSelector((state) => state.user.avatarId);
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      alert("Error due to validation! Fill correctly the fields.");
    } else {
      dispatch(
        signupUser({
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
    <Row className="mx-auto w-75 mt-5 ">
      <Col xs={12} className="anim2 d-flex text-center mb-3 ">
        <h1 className="enter2 animate__animated animate__flip">TASK TRACKER</h1>
      </Col>
      <Col xs={12} className="px-0 ">
        <Form onSubmit={handleSubmit} className="logFormInt2 text-start">
          <Row className="mb-3">
            <Form.Group className="mb-3 col-12" controlId="validationCustom01">
              <Form.Label className="labels">NAME</Form.Label>
              <Form.Control
                onFocus={() => handleFocus("fn")}
                style={inputStyle("fn")}
                className="glow1"
                required
                onChange={(e) => dispatch(setName(e.target.value))}
                type="text"
                placeholder="name.."
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group  controlId="validationCustom02" className="col-12">
              <Form.Label className="labels">SURNAME</Form.Label>
              <Form.Control
                onFocus={() => handleFocus("sn")}
                style={inputStyle("sn")}
                className="glow1"
                onChange={(e) => dispatch(setSurname(e.target.value))}
                required
                type="text"
                placeholder="surname..."
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group 
              className="mb-2 col-9"
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
                  className="glow1 rounded-end"
                  onChange={(e) => dispatch(setUsername(e.target.value))}
                />
                <Form.Control.Feedback>Nice one!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please choose an username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="genderSelect" className="col-9 mb-2">
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
            <Form.Group controlId="avatarSelect" className="col-12">
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
            <Form.Group xs={12} className="mb-3" controlId="validationCustom03">
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
            <Form.Group xs={12} className="mb-3" controlId="validationCustom04">
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
          <Form.Group className="mb-3">
            <Form.Check
              required
              type="checkbox"
              label={
                <>
                  Agree to{" "}
                  <Link to="/terms" className="text-white">Terms and conditions</Link>
                </>
              }
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>
          <Col xs={12}  className="d-flex justify-content-between">
            <button type="submit" className="glowing-btn-2 px-3 py-1 fw-bold">
              SUBMIT
            </button>
            <Link to="/">
              <button className="glowing-btn-1 px-3 py-1 fw-bold">
                BACK TO LOG IN
              </button>
            </Link>
          </Col>
        </Form>
      </Col>
    </Row>
  );
}
