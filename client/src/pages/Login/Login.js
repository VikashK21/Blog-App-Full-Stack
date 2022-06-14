import { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState();

  function loginChec(e) {
    e.preventDefault();
    fetch("/api/users/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (typeof data.result == "object") {
          setMessage("Successfully Logged In.");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          if (data.length > 0) {
            return setMessage(data[0].message);
          } else if (data.result.includes("verify")) {
            setTimeout(() => {
              navigate("/verify");
            }, 3000);
          }
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
        <h2>Log In</h2>

        <Form onSubmit={loginChec} className="d-grid gap-3">
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
              placeholder="Password@12"
              required
              onChange={e => {
                setUser(pre => ({ ...pre, password: e.target.value }));
              }}
            />
            <Form.Text>
              Forgot password?{" "}
              <Button
                variant="secondary"
                onClick={() => navigate("/change_password")}
              >
                Change Password
              </Button>
            </Form.Text>
          </Form.Group>
          <Button size="lg" variant="success" type="submit">
            Log In
          </Button>
        </Form>
      </div>
    </header>
  );
};

export default Login;
