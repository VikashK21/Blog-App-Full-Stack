import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const Verify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const [message, setMessage] = useState();

  function verify_acc(e) {
    e.preventDefault();
    fetch("/api/users/verify_acc", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(otp)
    })
      .then(res => res.json())
      .then(data => {
        if (typeof data[Object.keys(data)[0]] == "object") {
          setMessage("Your account is successfully verified.");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setMessage(data[Object.keys(data)[0]]);
        }
      })
      .catch(error => {
        setMessage(`${error}`);
      });
  }

  return (
    <div className="App-header">
      <p>
        {message}
      </p>
      <Form onSubmit={verify_acc} className="d-grid gap-3">
        <Form.Group controlId="forEmail">
          <Form.Label>Enter your Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="example@gmail.com"
            required
            onChange={e => setOtp(pre => ({ ...pre, email: e.target.value }))}
          />
        </Form.Group>
        <Form.Group controlId="forNumber">
          <Form.Label>Enter 6-digit OTP password sent on your Email</Form.Label>
          <Form.Control
            type="number"
            required
            placeholder="00 11 22"
            onChange={e =>
              setOtp(pre => ({ ...pre, otp: Number(e.target.value) }))}
          />
        </Form.Group>
        <br />
        <Button type="submit">Verify</Button>
      </Form>
    </div>
  );
};

export default Verify;
