import React from 'react';
import { Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

import { GoSearch } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";

import "./style.css";

function Navigation() {
    return (
        <Nav className="profile__nav" variant="pills" defaultActiveKey="/profile">
            <Nav.Item className={ window.location.pathname === '/profile' ? "active" : ''}>
                <Link to="/profile"> <AiOutlineUnlock /> </Link>
            </Nav.Item>
            <Nav.Item className={ window.location.pathname === '/private' ? "active" : ''}>
                <Link to="/private"> <AiOutlineLock /> </Link>
            </Nav.Item>
            <Nav.Item className={ window.location.pathname === '/publication' ? "active" : ''}>
                <Link to="/publication"> <FaUserFriends /> </Link>
            </Nav.Item>
            <Nav.Item className={ window.location.pathname === '/search' ? "active" : ''}>
                <Link to="/search"> <GoSearch /> </Link>
            </Nav.Item>
        </Nav>
    )
}

export default Navigation;