import "../SharedCSS/AccessPages.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAvatars from "../StructuralApi/AvatarApi";
import MyNavbar from "../Navbar/MyNavbar";
import { getUserDetails, updateUserDetails } from "../StructuralApi/UserApi";

export default function AccountPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [userDetails, setUserDetails] = useState({
    name: "",
    surname: "",
    username: "",
    gender: "",
    avatarId: "",
    email: ""
  });
 

    //AVATARS

    const [avatars, setAvatars] = useState([]);
    const [selectedAvatarId, setSelectedAvatarId] =  useState();

    useEffect(() => {
      const fetchAvatars = async () => {
        try {
          const data = await getAvatars();
          setAvatars(data);
        } catch (error) {
          console.error("Error while recovering avatars: ", error);
        }
      };
  
      fetchAvatars();
    }, []);
  
    const handleAvatarClick = (id) => {
      console.log("Id selected avatar:", id);
      setSelectedAvatarId(id);
      setUserDetails(userDetails => ({
        ...userDetails,
        avatarId: id 
      }));
     
    };
    useEffect(() =>{
    console.log(userDetails)
    }, [userDetails]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserDetails(token); // CALL TO ASYNC FUNCTION
        setUserDetails(userDetails => ({
          ...userDetails,
          name: data.name, 
          surname: data.surname, 
          username: data.username, 
          gender: data.gender,
          avatarId: data.avatar.id ,
          email: data.email, 
        }));
        // SAVES DATA IN COMPONENT STATE
        setSelectedAvatarId(data.avatar.id)

      } catch (error) {
        console.error("Error while recovering user details: ", error.message);
      }
    };

    fetchUser();
  }, []);

  const handleFocus = (inputId) => {
    setFocusedInput(inputId);
  };

  const inputStyle = (inputId) => ({
    borderColor: focusedInput === inputId ? "rgb(219, 98, 55)" : "",
    boxShadow: focusedInput === inputId ? "0 0 20px 5px #ff2a00" : "",
  });
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

 
  
    const handleSubmit = (e) => {
      e.preventDefault(); 
      console.log(userDetails);
      updateUserDetails(userDetails, token)
      .then(response => {
        if (response){
        alert("Dettagli utente aggiornati:", response);
      }else{
        throw new Error("Error in getting response")
      }
      }).catch(error => {
        console.error("Error in updating user details:", error.message);
      });
    };

  /* *************** GENDER DROPDOWN ************* */
  const Gender = {
    MALE: "MALE",
    FEMALE: "FEMALE",
    NON_BINARY: "NON BINARY",
    GENDERQUEER: "GENDERQUEER",
    GENDERFLUID: "GENDERFLUID",
    AGENDER: "AGENDER",
    TWO_SPIRIT: "TWO SPIRIT",
    OTHER: "OTHER",
    PREFER_NOT_TO_SAY: "PREFER NOT TO SAY",
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  




  return (
    <>
      <Row>
        <MyNavbar />
      </Row>
      <Row className="mx-auto w-75 h-75 ">
        <Col className="px-0 logFormExt col-12 ">
          <Form className="logFormInt text-start" onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group
                className="col-12 mb-3"
                controlId="validationCustom01"
              >
                <Form.Label className="labels">NAME</Form.Label>
                <Form.Control
                  onFocus={() => handleFocus("fn")}
                  style={inputStyle("fn")}
                  className="glow2"
                  required
                  type="text"
                  placeholder="name.."
                  name="name"
                  value={userDetails.name}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="col-12 mb-3"
                controlId="validationCustom02"
              >
                <Form.Label className="labels">SURNAME</Form.Label>
                <Form.Control
                  onFocus={() => handleFocus("sn")}
                  style={inputStyle("sn")}
                  className="glow2"
                  required
                  type="text"
                  name="surname"
                  value={userDetails.surname}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="col-12 mb-3"
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
                    className="glow2"
                    name="username"
                  value={userDetails.username}
                  onChange={handleChange}
                  />
                  <Form.Control.Feedback>Nice one!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please choose an username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="genderSelect" className="col-12 mb-3 w-75">
                <Form.Label className="labels">GENDER</Form.Label>
                <Form.Select
                  onFocus={() => handleFocus("gr")}
                  style={inputStyle("gr")}
                  className="glow2"
                  aria-label="Gender select"
                  name="gender"
                  value={userDetails.gender}
                  onChange={handleChange}
                >
                  {genderOptions.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="avatarSelect" className="col-11 mb-5">
                <Form.Label className="labels">
                  CHOOSE ANOTHER AVATAR
                </Form.Label>
                <div className="avatar-selection-container">
                  {Array.isArray(avatars) &&
                    avatars.map((avatar) => (
                      <div
                        key={avatar.id}
                        className={`avatar-option ${
                          selectedAvatarId === avatar.id
                            ? "avatar-img-clicked1"
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
                          className="avatar-img1"
                        />
                      </div>
                    ))}
                </div>
              </Form.Group>
              <Form.Group
                className="col-12 mb-3"
                controlId="validationCustom01"
              >
                <Form.Label className="labels">EMAIL</Form.Label>
                <Form.Control
                  onFocus={() => handleFocus("fn")}
                  style={inputStyle("fn")}
                  className="glow2"
                  required
                  type="text"
                  placeholder="email.."
                  name="email"
                  value={userDetails.email}
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
        </Col>
      </Row>
    </>
  );
}
