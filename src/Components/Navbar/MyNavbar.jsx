import "./MyNavbar.css";
import { Col, Row } from "react-bootstrap";
import OffCanvas from "../OffCanvas/OffCanvasComponent";
import { Link } from "react-router-dom";
import { useTheme } from "../../ThemeContext/ThemeProvider";

export default function MyNavbar() {
  const currentUsername = localStorage.getItem("username");
  const currentAvatar = localStorage.getItem("avatar url");
  const { theme } = useTheme();
  const themeClass = theme === 'light' ? 'light' : 'dark';
  return (
    <Row className={`px-2 mx-0 justify-content-between mynav ${themeClass}`}>
      <Col xs={3}>
        <Link to="/">
          <p className="logo mt-0">TASK-TRACKER</p>
        </Link>
      </Col>
      <Col>
     <div className="currentUser">
        <span className="userUsername">{currentUsername}</span>
        <img src={currentAvatar} alt="user-avatar" className="profileAV" /></div>
        <OffCanvas />
      </Col>
    </Row>
  );
}
