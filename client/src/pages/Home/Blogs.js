import React, { useContext, useState } from "react";
import "../../App.css";
import { GlobalContext } from "../../context/GlobalState";
import { Card, Container, Button } from "react-bootstrap";
import Comment from "./Comment";
import ViewBlogs from "./ViewBlogs";

const Blogs = ({ blogs, id }) => {
  const [reaction, setReaction] = useState({
    liked: blogs.liked,
    disliked: blogs.disliked,
    totalLikes: blogs.likes,
    totalDislikes: blogs.dislikes
  });
  const [changeLay, setChangeLay] = useState(0);
  const { Likes_Dislikes } = useContext(GlobalContext);
  const day1 = new Date(blogs.created_at);
  const day2 = new Date();
  const difference = Math.abs(day2 - day1);
  const days = difference / (1000 * 3600 * 24);
  function Details(e) {
    const opt = e.target.value;
    if (opt === '1') {
      setChangeLay("View");
    } else if (opt === '2') {
      setChangeLay("Edit");
    } else if (opt === '3') {
      setChangeLay("Save");
    }
  }

  return (
    <Container className="mb-2">
      {/* <div className='flex'> */}
      {/* logger and reactions*/}

      {/* Blogs and users */}
      <ViewBlogs permission={changeLay} id={blogs.id} />
      <Card style={{ background: "black", border: "2px solid" }}>
        <div className="flex" style={{ borderBottom: "1px grey solid" }}>
          <Card.Title className="flex">
            <i
              className="fa fa-user m-3 "
              style={{ fontSize: "240%", color: "silver" }}
            />
            <h4 className="mt-2 mb-0" style={{ color: "white" }}>
              {blogs.user.name}{" "}
              <p className="mt-2" style={{ color: "silver", fontSize: "18px" }}>
                {Math.floor(days)} day/s ago
              </p>
            </h4>
          </Card.Title>
          <Card.Title className="m-4">
            <select
              className="form-select form-select-sm"
              aria-label="Default select example"
              onChange={Details}
            >
              <option defaultValue hidden>
                ...
              </option>
              <option value="1">View</option>
              <option value="2">Edit</option>
              <option value="3">Save</option>
            </select>
          </Card.Title>
        </div>
        <Card.Body>
          <Card.Title style={{ color: "#FF4500", fontSize: "150%" }}>
            {blogs.title}
          </Card.Title>
          <Card.Text style={{ color: "#FF5800" }}>
            {blogs.post}
          </Card.Text>
          {/* <Card.Img src="https://picsum.photos/200/70" alt="image" /> */}
          {blogs.post_url.length > 0 &&
            <Card.Img
              style={{ height: "40vh" }}
              src={blogs.post_url[0]}
              alt="image"
            />}
          {/* <Card.Img
            style={{ height: "40vh" }}
            src={blogs.post_url[0]}
            alt="image"
          /> */}
        </Card.Body>
      </Card>

      <Card className="bg-black flex">
        <Card.Title>
          <i
            className="fa fa-user-secret"
            style={{ fontSize: "48px", color: "#0492C2" }}
          />
        </Card.Title>
        <Card.Body>
          <div className="flex">
            <p>
              {blogs.likes}
            </p>
            <Button
              className="bg-black"
              onClick={() => {
                // likes("likes");
                Likes_Dislikes(blogs.id, { likes: true, dislikes: false });
                setReaction(pre => ({ liked: !pre.liked, disliked: false }));
              }}
            >
              <i
                className="fa fa-thumbs-up"
                style={{
                  fontSize: "36px",
                  color: reaction.liked ? "green" : "white"
                }}
              />{" "}
              <br />
            </Button>
          </div>
          <div className="flex">
            <p>
              {blogs.dislikes}
            </p>
            <Button
              className="bg-black"
              onClick={() => {
                // likes("dislikes");
                Likes_Dislikes(blogs.id, { likes: false, dislikes: true });
                setReaction(pre => ({
                  disliked: !pre.disliked,
                  liked: false
                }));
              }}
            >
              <i
                className="fa fa-thumbs-down"
                style={{
                  fontSize: "36px",
                  color: reaction.disliked ? "orange" : "white"
                }}
              />
            </Button>
          </div>
        </Card.Body>
        {/* <Form.Control type="text" placeholder="Comment your exploration..." />
        <Button type="submit">Comment</Button> */}
        <Comment blog_id={blogs.id} />
      </Card>
    </Container>
  );
};

export default Blogs;
