import "./MyNavbar.css";
import { Col, Row } from "react-bootstrap";
import OffCanvas from "../OffCanvas/OffCanvasComponent";

export default function MyNavbar() {
  return (
    <Row className="px-2 mx-0 justify-content-between mynav">
      <Col className="col-10">
        <p className="logo">TASK-TRACKER</p>
      </Col>
      <Col>
        <OffCanvas />
      </Col>
    </Row>
  );
}
