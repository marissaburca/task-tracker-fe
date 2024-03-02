import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "./App.css";
import { useTheme } from "./ThemeContext/ThemeProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogInPage from "./Components/LogInPage/LogInPage";
import PillButton from "./Components/StyledComponents/PillButton";
import { Container,Row, Col } from "react-bootstrap";
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import Dashboard from "./Components/Dashboard/Dashboard";
import AccountPage from "./Components/AccountPage/AccountPage";
import PasswordPage from "./Components/PasswordPage/PasswordPage";
import TermsAndConditions from "./Components/TermsAndConditions/TermsAndConditions";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
    <Container fluid >
    <Row className={`vh-100 tall ${theme}-theme`}>
      <BrowserRouter>
        <Col xs={12} className="d-flex justify-content-end theme">
          <PillButton onClick={toggleTheme} className="mt-3" />
        </Col>
        <Col xs={12} className={`px-0 middle ${theme}`}>
          <Routes>
            <Route path="/" element={<LogInPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/password" element={<PasswordPage />} />
            <Route path="/terms" element={<TermsAndConditions />} />
          </Routes>
        </Col>
      </BrowserRouter>
    </Row>
    </Container>
  </>
  );
}

export default App;
