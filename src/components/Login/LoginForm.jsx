import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/fa';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Config from '../Settings/config';
console.log(Config)
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSocialButtons, setShowSocialButtons] = useState(false);
  const navigate = useNavigate();
  const socialButtonsAnimation = useSpring({
    opacity: showSocialButtons ? 1 : 0,
    transform: showSocialButtons ? 'translateY(0px)' : 'translateY(50px)',
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(Config.url_login, data)
      .then((res) => {
        setSuccessMessage(res.data.message);
        const token = res.data.accessToken;
        localStorage.setItem('token', token);
        navigate(`${Config.url_home}`);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
      });
  };
  const handleShowSocialButtons = () => {
    setShowSocialButtons(true);
  };

  return (
    <>
      <Header />
      <Container className="mt-2">
        <div>
          {errorMessage && <h2 className="alert alert-danger">{errorMessage}</h2>}
          {successMessage && <h2 className="alert alert-success">{successMessage}</h2>}
        </div>
        <Form onSubmit={handleSubmit} className="border p-4 shadow">
          <h1 className="text-center mb-4">Login</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          </Form.Group>
          <br />
          <Button variant="success" type="submit" block>
            Login
          </Button>
          <div>
            <p>
              You don't have an account? Click <Link to="/registration">Here</Link>
            </p>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Form.Check type="checkbox" label="Remember me" />
            <a href="/" className="text-success">
              Forgot password?
            </a>
          </div>

          <animated.hr className="mt-4 mb-4" style={socialButtonsAnimation} />
          <p className="text-success">Or</p>
          <div className="mb-3 d-flex ">
            <Button variant="danger" onMouseEnter={handleShowSocialButtons}>
              <FaGoogle />{' '}
              <Link to={Config.url_google} style={{ textDecoration: 'none', color: 'white' }}>
                Login with Google
              </Link>
            </Button>
            <span style={{ width: '10px' }}></span>
            <Button variant="primary" onMouseEnter={handleShowSocialButtons}>
              <FaFacebook />{' '}
              <Link to={Config.url_facebook} style={{ textDecoration: 'none', color: 'white' }}>
                Login with Facebook
              </Link>
            </Button>
            <span style={{ width: '10px' }}></span>
            <Button variant="info" onMouseEnter={handleShowSocialButtons}>
              <FaLinkedin />
              <Link to={Config.url_linkedin} style={{ textDecoration: 'none', color: 'white' }}>
                Login with LinkedIn
              </Link>
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default LoginForm;
