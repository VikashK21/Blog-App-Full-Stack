import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { Form, Button, Row, Col } from "react-bootstrap";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [message, setMessage] = useState();

  function signup(e) {
    e.preventDefault();
    if (user.password !== user.confirm_pass) {
      return setMessage("The password did not match!!");
    }
    delete user.confirm_pass;
    fetch("/api/users/signup", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (typeof data.result == "object") {
          setMessage("Successfully Signed Up.");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          if (data.length > 0) {
            return setMessage(data[0].message);
          }
          setMessage(data.result);
        }
      })
      .catch(error => {
        setMessage(`${error}`);
        console.error("Error:", "Something went wrong.");
      });
  }

  return (
    <header className="App-header">
      <h2>Sign Up</h2>
      <p>
        {message}
      </p>
      <Form onSubmit={signup} className="d-grid gap-2">
        <Row>
          <Form.Group controlId="forText">
            <Form.Label>Full Name*</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Example"
              required
              onChange={e => {
                setUser(pre => ({ ...pre, name: e.target.value }));
              }}
            />
          </Form.Group>
          <Form.Group controlId="forEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              size="lg"
              className="mb-2"
              type="email"
              placeholder="example@gmail.com"
              required
              onChange={e => {
                setUser(pre => ({ ...pre, email: e.target.value }));
              }}
            />
            <Form.Text>
              Already have an account?{" "}
              <Button variant="success" onClick={() => navigate("/login")}>
                Log In
              </Button>
            </Form.Text>
          </Form.Group>
        </Row>
        <Row>
          <Col md>
            <Form.Group controlId="forNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                size="lg"
                type="number"
                placeholder="+91 8877665544"
                onChange={e => {
                  setUser(pre => ({ ...pre, phone_number: e.target.value }));
                }}
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group>
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                size="lg"
                type="date"
                onChange={e => {
                  setUser(pre => ({ ...pre, dob: e.target.value }));
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Password*</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              placeholder="Create a Strong Password..."
              required
              onChange={e => {
                setUser(pre => ({ ...pre, password: e.target.value }));
              }}
            />
            <Form.Text>Don't worry even the creator also can not access your Password.</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password*</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              placeholder="Confirm Password..."
              required
              onChange={e =>
                setUser(pre => ({ ...pre, confirm_pass: e.target.value }))}
            />
          </Form.Group>
        </Row>
        <Button type="submit" size="lg">
          Sign Up
        </Button>
      </Form>
    </header>
  );
};

export default Signup;
