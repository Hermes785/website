import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, InputGroup, Input, Button } from "reactstrap";
import img from "../../assests/images/seo.png";
import config from "../Settings/config.jsx";
import { Link } from "react-router-dom";

const Courses = () => {
  const [pictures, setPictures] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value)
    // Faites ici votre logique de recherche
    console.log("Recherche effectuée :", searchTerm);
  };

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(config.url_backend)
        .then((res) => {
          setPictures(res.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, []);
  const handleChangeSearches = (e) => {
    setSearchTerm(e.target.value)
    console.log(searchTerm)

  }


  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h2>Les formations les plus populaires</h2>
                <p>
                  Découvrez dès maintenant notre catalogue de formations proposées par des écoles et universités de renom. Consultez notre catalogue en ligne pour trouver la formation qui correspond à vos aspirations et boostez votre carrière !
                </p>
              </div>
              <div className="w-50 text-end">

              </div>
            </div>
          </Col>
          <Col lg="12" className="mb-4">
            <div className="search__bar">
              <Form onSubmit={handleSearch}>
                <InputGroup>
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={handleChangeSearches}
                  />
                  <Button type="submit" color="success">
                    Rechercher
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </Col>
          {pictures.map((picture) => (
            <Col lg="4" md="6" key={picture.id}>
              <div className="single__course__item">
                <div className="course__img">
                  <img src={img} alt="web design" className="w-100" />
                </div>
                <div className="course__details">
                  <h6 className="course__title mb-4">{picture.title}</h6>
                  <div className="">
                    <p className="d-flex align-items-center gap-1">
                      <i style={{ color: "#17bf92" }} className="ri-user-line"></i>
                      Localisation : {picture.ville}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="lesson d-flex align-items-center gap-1">
                      <i style={{ color: "#17bf92" }} className="ri-star-fill"></i>
                      Coût de la formation : {picture.price}€
                    </p>
                  </div>
                </div>
                <div className="text-end">
                  <Link className="btn btn-success" to={`training/${picture._id}`}>
                    Voir plus
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Courses;
