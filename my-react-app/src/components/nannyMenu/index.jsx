// nanny menu page
import Header from "../Header";
import Footer from "../Footer";
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

export default function nannyMenu() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      <Breadcrumb />
      <Footer />
    </div>
  );
}
