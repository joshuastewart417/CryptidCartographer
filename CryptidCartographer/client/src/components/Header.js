import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink as RRNavLink, Redirect } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import { logout } from "../modules/authManager";

export default function Header({ isLoggedIn, isAdmin }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);



    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/">
                    <img className="CC_Logo" src="/CC_Logo.png" height="100px" width="auto"/>
                    Cryptid Cartographer
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {/* When isLoggedIn === true, we will render the Home link */}
                        {isLoggedIn && (
                            <>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/">
                                        Home
                                    </NavLink>
                                </NavItem>

                                {isLoggedIn ? <NavItem>
                                    <NavLink tag={RRNavLink} to="/myCryptidList">
                                        Sightings
                                    </NavLink>
                                </NavItem> : null}

                                {isLoggedIn ? <NavItem>
                                    <NavLink tag={RRNavLink} to="/trackedCryptidList">
                                        Tracking List
                                    </NavLink>
                                </NavItem> : null}
                            </>
                        )}

                    </Nav>
                    <Nav navbar>
                        {isLoggedIn && (
                            <>
                                {isAdmin ?
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to="/users">
                                            Users
                                        </NavLink>
                                    </NavItem> :
                                    <></>
                                }
                                <NavItem>
                                    <a
                                        aria-current="page"
                                        className="nav-link"
                                        style={{ cursor: "pointer" }}
                                        onClick={logout}
                                    >
                                        Logout
                                    </a>
                                </NavItem>

                            </>
                        )}
                        {!isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">
                                        Register
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}