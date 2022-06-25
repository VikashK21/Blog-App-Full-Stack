import { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const ChangePass = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState();

  function changePass(e) {
    e.preventDefault();
    fetch("/api/users/forget_password", {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.length) {
          setMessage(data[0].message);
        } else if (data.result.includes("verify")) {
          setMessage(data.result)
          setTimeout(() => {
            navigate("/verify");
          }, 3000);
        } else {
          setMessage(data.result);
        }
      })
      .catch(error => {
        setMessage(`${error}`);
        console.error("Error: ", "Something went wrong.");
      });
  }

  return (
    <header className="App-header">
      <div>
        <h2>Change Password</h2>

        <Form onSubmit={changePass} className="d-grid gap-3">
          <p>
            {message}
          </p>
          <Form.Group controlId="forEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="mb-2"
              size="lg"
              type="email"
              value={user.email}
              placeholder="example@gmail.com"
              required
              onChange={e => {
                setUser(pre => ({ ...pre, email: e.target.value }));
              }}
            />
            <Form.Text>
              Need an Account?{" "}
              <Button onClick={() => navigate("/signup")}>Sign Up</Button>
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="forPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="mb-2"
              size="lg"
              type="password"
              value={user.password}
              placeholder="Create a Strong Password"
              required
              onChange={e => {
                setUser(pre => ({ ...pre, password: e.target.value }));
              }}
            />
          </Form.Group>
          <Button size="lg" variant="secondary" type="submit">
            Change Password
          </Button>
        </Form>
      </div>
    </header>
  );
};

export default ChangePass;
