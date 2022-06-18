import React, { useContext, useState } from "react";
import { Container, Button, Form, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

const CreateBlog = () => {
  const [blog, setBlog] = useState({ title: "", post: "", post_url: [] });
  const { CreateBlog } = useContext(GlobalContext);
  const navigate = useNavigate();
  function postBlog(e) {
    // e.preventDefault();
    CreateBlog(blog);
    // setBlog({ title: "", post: "", post_url: "" });
    navigate("/");
  }
  return (
    <div>
      <Nav
        variant="pills"
        defaultActiveKey="/"
        className="justify-content-center m-3"
      >
        <Nav.Item>
          <Button onClick={() => navigate("/")}>Home</Button>
        </Nav.Item>
      </Nav>

      <Container>
        <Form onSubmit={postBlog} className="d-grid gap-2">
          <Form.Group controlId="forText">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              onChange={e =>
                setBlog(pre => ({ ...pre, title: e.target.value }))}
              placeholder="Blog Title..."
              value={blog.title}
              required
            />{" "}
            <br />
          </Form.Group>
          <Form.Group className="mb-3" controlId="forTextarea">
            <Form.Label>Blog</Form.Label>
            <Form.Control
              as="textarea"
              onChange={e => setBlog(pre => ({ ...pre, post: e.target.value }))}
              placeholder="Write a Blog..."
              value={blog.post}
              required
            />
            <Form.Control
              type=""
              placeholder="Add image link"
              onChange={e =>
                setBlog(pre => ({
                  ...pre,
                  post_url: e.target.value.split(" ")
                }))}
            />
          </Form.Group>
          <Button variant="success" type="submit" size="lg">
            Post
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CreateBlog;
