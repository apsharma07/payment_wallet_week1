import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Button, Row, Col } from "react-bootstrap";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/home";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"; // Custom styles

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <Router>
            <Navbar bg="white" expand="md" className="shadow-sm py-3">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4">
                        🚀 Fast-Pay
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                        <Nav className="align-items-center">
                            {user ? (
                                <>
                                    <Nav.Link as={Link} to="/transaction" className="fw-medium text-dark">
                                        Transactions
                                    </Nav.Link>
                                    <NavDropdown 
                                        title={
                                            <>
                                                <i className="bi bi-person-circle me-2"></i> 
                                                {user.email}
                                            </>
                                        } 
                                        id="nav-dropdown"
                                        className="fw-medium"
                                    >
                                        <NavDropdown.Item onClick={handleLogout} className="text-danger">
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <Row className="gx-2">
                                    <Col xs="auto">
                                        <Nav.Link as={Link} to="/login">
                                            <Button variant="outline-primary" className="px-4 fw-medium w-100">
                                                Login
                                            </Button>
                                        </Nav.Link>
                                    </Col>
                                    <Col xs="auto">
                                        <Nav.Link as={Link} to="/signup">
                                            <Button variant="primary" className="px-4 fw-medium w-100">
                                                Signup
                                            </Button>
                                        </Nav.Link>
                                    </Col>
                                </Row>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
