import "./MyFooter.css";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

export default function MyFooter({ theme }) {
  return (
    <Row className={`footer mx-auto ${theme}`}>
      <Col className="copyright col-8 text-start fw-bold">
        © 2024 Marissa Burca
      </Col>
      <Col className="social-icons col-4 text-end">
        <a
          href="https://facebook.com/marissa.burca.5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF className="myIcon" />
        </a>
        <a
          href="https://www.instagram.com/marissaburca/?igsh=MTlkeHJkdmgwYzQxeg%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="myIcon" />
        </a>
        <a href="https://github.com/marissaburca" target="_blank" rel="noopener noreferrer">
          <FaGithub className="myIcon" />
        </a>
      </Col>
    </Row>
  );
}
