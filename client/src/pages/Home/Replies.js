import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

function Replies({ shouldRender, indexing }) {
  const [reply, setReply] = useState("");
  function sendRepl(e) {
    e.preventDefault();
    fetch("/api/blog/comment/reply/3", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ reply_msg: reply })
    })
    .then(res => res.json())
    .then(() => {
        setReply('Your reply is successfully sent... Viewing for reply messages is on process.')
    })
    .catch(err => {
        setReply('Please reload or try again later.')
    })
  }
  return shouldRender === indexing
    ? <div>
        <Form onSubmit={sendRepl} className="d-flex flex-row">
          <Form.Control
            type="text"
            value={reply}
            onChange={e => setReply(e.target.value)}
            placeholder="Form your reply"
          />
          <Button type="submit">Reply</Button>
        </Form>
      </div>
    : false;
}

export default Replies;
