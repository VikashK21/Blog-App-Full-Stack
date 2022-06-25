import React, { useContext, useState } from "react";
import { Container, Button, Form, Nav } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

function EditBlogs(e) {
  e.preventDefault();
  const { EditBlog, oneBlog } = useContext(GlobalContext);
  const [blog, setBlog] = useState(oneBlog);
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);
  function postBlog(e) {
    if (blog.blog_url[0].length>5) {
      blog.post_url = blog.blog_url;
    }
    EditBlog(id, blog);
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
              value={blog.title}
              onChange={e =>
                setBlog(pre => ({ ...pre, title: e.target.value }))}
              placeholder="Blog Title..."
              required
            />{" "}
            <br />
          </Form.Group>
          <Form.Group className="mb-3" controlId="forTextarea">
            <Form.Label>Blog</Form.Label>
            <Form.Control
              as="textarea"
              value={blog.post}
              onChange={e => setBlog(pre => ({ ...pre, post: e.target.value }))}
              placeholder="Write a Blog..."
              required
            />
            <Form.Control
              type=""
              placeholder="Want to change image address"
              // value={JSON.parse(blog.post_url[0])}
              onChange={e =>
                setBlog(pre => ({
                  ...pre,
                  blog_url: e.target.value.split(" ")
                }))}
            />
          </Form.Group>
          <Button variant="success" type="submit" size="lg">
            Edit Blog
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default EditBlogs;
