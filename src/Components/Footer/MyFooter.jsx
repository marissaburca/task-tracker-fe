import "./MyFooter.css";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import { useTheme } from "../../ThemeContext/ThemeProvider";

export default function MyFooter() {
  const { theme } = useTheme();
  const themeClass = theme === 'light' ? 'light' : 'dark';
  return (
    <Row id="footer" className={`mx-auto  ${themeClass}`}>
      <Col xs={8}  className="copyright text-start fw-bold">
        <p  id="footerText">
          &copy; 2024 | Developed by Marissa Burca | Capstone Project for Web
          App Development
        </p>
      </Col>
      <Col xs={4} className="footerIcons">
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
        <a
          href="https://github.com/marissaburca"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="myIcon" />
        </a>
      </Col>
    </Row>
  );
}
