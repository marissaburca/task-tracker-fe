import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes, useLo } from "react-router-dom";
import LogInPage from "./Components/Pages/LogInPage";
import PillButton from "./Components/Buttons/PillButton";
import { Row, Col } from "react-bootstrap";
import SignInPage from "./Components/Pages/SignInPage";

function App( ) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

 
  return (
    <BrowserRouter>
    <Row
      className={`login h-100 mx-auto align-items-start text-center ${
        theme === "light" ? "light-theme" : "dark-theme"
      }`}
    >
      <Col
        className="d-flex justify-content-end mt-2 col-12 flex-grow-2"
      >
        <PillButton onClick={toggleTheme} className="mt-3" />
      </Col>
      <Col  className="col-12">
      
          <Routes>
            <Route path="/" element={<LogInPage />} />
            <Route path="/register" element={<SignInPage />} />
          </Routes>
        
      </Col>
      <Col className="col-12"></Col>
    </Row>
    </BrowserRouter>
  );
}

export default App;
