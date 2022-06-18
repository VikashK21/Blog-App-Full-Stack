import React, { useContext, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { GlobalContext } from "../../context/GlobalState";

function Comment({ blog_id, id }) {
  const [comment, setComment] = useState("");
  const [commentsReply, setCommentReply] = useState([
    {
      role: "USER",
      id: 4,
      blog_id: 9,
      commenter_id: 15,
      comment_msg: "By looking at this I also realise something..",
      reply_msg: [],
      created_at: "2022-06-10T14:31:24.167Z",
      updated_at: "2022-06-10T14:31:24.168Z",
      commenter: {
        role: "USER",
        id: 15,
        name: "Vikash",
        email: "vikash21@navgurukul.org",
        phone_number: "9988776655",
        password:
          "$2b$10$SbFKYzjctYw7sRadbgToDumnCm0yw9i.ya/GILwBPvRt.AquzoEY.",
        dob: "2022-05-30",
        verify: false,
        first_time: false,
        otp: null,
        created_at: "2022-05-31T06:56:36.500Z",
        updated_at: "2022-06-18T04:37:57.283Z"
      }
    },
    {
      role: "USER",
      id: 3,
      blog_id: 9,
      commenter_id: 15,
      comment_msg: "This is something which I like..",
      reply_msg: [
        '{"9":["Achha Vikash.","Can you explain what you liked the most."],"10":["Yes Vikash me too.","and one more thing..."]}'
      ],
      created_at: "2022-06-10T14:29:46.709Z",
      updated_at: "2022-06-12T04:42:44.227Z",
      commenter: {
        role: "USER",
        id: 15,
        name: "Vikash",
        email: "vikash21@navgurukul.org",
        phone_number: "9988776655",
        password:
          "$2b$10$SbFKYzjctYw7sRadbgToDumnCm0yw9i.ya/GILwBPvRt.AquzoEY.",
        dob: "2022-05-30",
        verify: false,
        first_time: false,
        otp: null,
        created_at: "2022-05-31T06:56:36.500Z",
        updated_at: "2022-06-18T04:37:57.283Z"
      }
    }
  ]);
  const { Comment } = useContext(GlobalContext);
  function sendMsg() {
    Comment(blog_id, comment);
    setComment("");
  }
  return (
    <>
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
      {commentsReply.length < 0 &&
        commentsReply.map(ele => {
          if (ele.commenter_id === id) {
            return (
              <div>
                <i
                  className="fa fa-user-secret"
                  style={{ fontSize: "48px", color: "#0492C2" }}
                />{" "}
                <p>{ele.comment_msg}</p>
              </div>
            );
          }
        })}

    </>
  );
}

export default Comment;
