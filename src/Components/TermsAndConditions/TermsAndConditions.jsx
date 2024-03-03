import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import { Link} from "react-router-dom";

export default function TermsAndConditions() {
  const token = localStorage.getItem("token");
  const linkPath= token?  "/dashboard" : "/register";
  const buttonText = token ? "GO TO DASHBOARD" : "BACK TO SIGNUP";

  return (
    <Container className="my-5">
      <Row className="justify-content-center ">
        <Col xs={12} md={8} className="terms">
          <h1>Terms and Conditions</h1>
          <p className="mt-4">
            Welcome to our Task Tracker App. By accessing or using our app, you
            agree to be bound by these terms and conditions. If you disagree
            with any part of the terms, you may not access the app.
          </p>
          <h2>Usage License</h2>
          <p>
            Subject to your compliance with these terms, we grant you a limited,
            non-exclusive, non-transferable license to use the app for your
            personal, non-commercial purposes.
          </p>
          <h2>User Content</h2>
          <p>
            You are responsible for the content that you post on the app,
            including its legality, reliability, and appropriateness. You grant
            us the right and license to use, modify, publicly perform, publicly
            display, reproduce, and distribute such content on and through the
            app.
          </p>
          <h2>Prohibited Uses</h2>
          <p>
            You may not use the app in a way that causes, or may cause, damage
            to the app or impairment of the availability or accessibility of the
            app; or in any way which is unlawful, illegal, fraudulent, or
            harmful, or in connection with any unlawful, illegal, fraudulent, or
            harmful purpose or activity.
          </p>
          <h2>Amendments to Terms</h2>
          <p>
            We reserve the right to amend or change these terms at any time and
            your continued use of the app following any changes shall be deemed
            to be your acceptance of such change.
          </p>
          <h2>Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us.</p>
          <Link to={linkPath} >
            {" "}
            <button variant="primary" type="button" className="glowing-btn-1 mt-5 p-2">
              {buttonText}
            </button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
