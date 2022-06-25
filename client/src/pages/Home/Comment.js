import React, { useContext, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { GlobalContext } from "../../context/GlobalState";
import "../../App.css"

function Comment({ blog_id, id }) {
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("")
  const [commentsReply, setCommentReply] = useState([]);
  const { Comment } = useContext(GlobalContext);
  function sendMsg() {
    Comment(blog_id, comment);
    setComment("");
    setMsg('Click on the eye button to view messages detail.')
    setTimeout(() => 
    setMsg('')
      , 10000)
  }
  return (
    <>
      <p className="text-secondary">{msg}</p>
      <Form.Control
        type="text"
        value={comment}
        placeholder="Comment your exploration..."
        onChange={e => {
          setComment(e.target.value);
        }}
      />
      <Button type="submit" onClick={sendMsg}>
        Comment
      </Button>

    <div className="mt-3">
      {commentsReply.length > 0 &&
        commentsReply.map(ele => {
          if (ele.commenter_id === id) {
            return (
              <Card className="flex2 m-2" style={{color: 'black'}}>
                <i
                  className="fa fa-user-secret"
                  style={{ fontSize: "48px", color: "#0492C2" }}
                />{" "}
                <p>{ele.comment_msg}</p>
              </Card>
            );
          }
        })}

    </div>

    </>
  );
}

export default Comment;
