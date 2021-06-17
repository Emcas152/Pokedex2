import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md="3">
            <h1 className="title">Emcas152•</h1>
          </Col>
          <Col md="3">
            <Nav>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Inicio
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/Pokemon" tag={Link}>
                  Pokemon
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/Regiones" tag={Link}>
                  Regiones
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/Items" tag={Link}>
                  Items
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
