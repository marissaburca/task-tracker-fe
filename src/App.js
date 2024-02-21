import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LogInPage from "./Components/LogInPage/LogInPage";
import PillButton from "./Components/StyledComponents/PillButton";
import { Row, Col } from "react-bootstrap";
import SignInPage from "./Components/SignInPage/SignInPage";
import MyFooter from "./Components/Footer/MyFooter";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <BrowserRouter>
      <Row
        className={`h-100 mx-auto  ${
          theme === "light" ? "light-theme" : "dark-theme"
        }`}
      >
        <Col className="d-flex justify-content-end col-12 theme">
          <PillButton onClick={toggleTheme} className="mt-3" />
        </Col>
        <Col className="col-12 px-0 h-100">
          
            <Routes>
              <Route path="/" element={<LogInPage />} />
              <Route path="/register" element={<SignInPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        
        </Col>
        <MyFooter theme={toggleTheme} />
      </Row>
    </BrowserRouter>
  );
}

export default App;
