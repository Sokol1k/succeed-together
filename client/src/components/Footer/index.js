import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar } from "react-bootstrap";
import "./style.css";

function Footer() {
    return (
        <div className="footer">
            <Container className="my-container d-flex">
            <Navbar.Brand>
                    <Link to="/" className="footer__logo">
                        Succeed Together
                    </Link>
                </Navbar.Brand>
                <div className="footer__rights">
                    © All rights reserved
                </div>
                {/* <div className="footer__right">
                </div> */}
            </Container>
        </div>
    );
}

export default Footer;

