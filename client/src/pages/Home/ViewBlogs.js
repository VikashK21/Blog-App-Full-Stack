import React, { useContext, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import Replies from "./Replies";

function ViewBlogs() {
  const { allComments, id } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [permi, setPermi] = useState(-1);
  // const [allReplies, setAllReplies] = useState([]);
  return (
    <Container>
      <Button className="m-3" onClick={() => navigate("/")}>
        Home
      </Button>
      <Card className="bg-black">
        {/* <Card.Img src={JSON.parse(oneBlog.post_url[0])}></Card.Img> */}
        <h3 className="text-success text-center">Comments And Replies</h3>
        {allComments.length > 0 &&
          allComments.map((ele, indE) => {
            const day1 = new Date(ele.created_at);
            const day2 = new Date();
            const difference = Math.abs(day2 - day1);
            const days = difference / (1000 * 3600 * 24);
            if (ele.commenter_id === id) {
              return (
                <Card.Body
                  key={indE}
                  className="bg-white text-black mb-2 rounded"
                >
                  <div className="flex">
                    <div className="d-flex flex-row">
                      <i
                        className="fa fa-user-secret"
                        style={{ fontSize: "240%", color: "#0492C2" }}
                      />
                      <Card.Title
                        className="mt-2 m-2"
                        style={{ color: "orangered" }}
                      >
                        {ele.commenter.name}
                      </Card.Title>
                    </div>
                    <div className="d-flex flex-row gap-3">
                      <p className="mt-2 m-2" style={{ color: "orangered" }}>
                        {Math.floor(days)} day/s ago
                      </p>
                      <Button variant="" onClick={() => setPermi(indE)}>
                        <i
                          class="fa-solid fa-reply m-2 text-success"
                          style={{ fontSize: "240%" }}
                        />
                      </Button>
                    </div>
                  </div>
                  <h5 className=" text-center ">
                    {ele.comment_msg}
                  </h5>
                  <Replies
                    shouldRender={permi}
                    indexing={indE}
                    // replies={allReplies}
                  />
                </Card.Body>
              );
            } else {
              return (
                <Card.Body
                  key={indE}
                  className="bg-white text-black mb-2 rounded"
                >
                  <div className="flex">
                    <div className="d-flex flex-row">
                      <i
                        className="fa fa-user m-1"
                        style={{ fontSize: "290%", color: "silver" }}
                      />
                      <Card.Title
                        className="mt-2 m-2"
                        style={{ color: "orangered" }}
                      >
                        {ele.commenter.name}
                      </Card.Title>
                    </div>
                    <div className="d-flex flex-row gap-3">
                      <p className="mt-2 m-2" style={{ color: "orangered" }}>
                        {Math.floor(days)} day/s ago
                      </p>
                      <Button variant="" onClick={() => setPermi(indE)}>
                        <i
                          class="fa-solid fa-reply m-2 text-success"
                          style={{ fontSize: "240%" }}
                        />
                      </Button>
                    </div>
                  </div>
                  <h5 className="text-center">
                    {ele.comment_msg}
                  </h5>
                  <Replies
                    shouldRender={permi}
                    indexing={indE}
                    id = {ele.id}
                    // replies={allReplies}
                  />
                </Card.Body>
              );
            }
          })}
      </Card>
    </Container>
  );
}

export default ViewBlogs;
