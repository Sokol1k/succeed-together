import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { changeHeader } from "../../store/header/actions";
import "./style.css";


class Header extends Component {

    constructor() {
        super();

        this.state = {
            class: ''
        }

        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        localStorage.clear();
        this.props.changeHeader('');
        this.props.history.push('/');
    }

    render() {
        return (
            <Navbar className={"header " + this.props.header} expand="lg">
                <Container className="my-container">
                    <Navbar.Brand>
                        <Link to="/" className="header__logo">
                            Succeed Together
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="header__right">
                            {
                                localStorage._token ?
                                    <button onClick={this.logOut} className="logout">Log out</button> :
                                    <div>
                                        <Link to="/login">
                                            Log In
                                    </Link>
                                        <Link to="/signup">
                                            Sign Up
                                    </Link>
                                    </div>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return {
        header: state.header.headerColor
    };
};

const mapDispatchToProps = {
    changeHeader
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));