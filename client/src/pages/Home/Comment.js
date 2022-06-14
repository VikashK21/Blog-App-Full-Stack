import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { GlobalContext } from '../../context/GlobalState';

function Comment({blog_id}) {
    const [comment, setComment] = useState('')
    const {Comment} = useContext(GlobalContext) 
    function sendMsg() {
        Comment(blog_id, comment)
        console.log('her we are');
        setComment('')
    }
  return (
    <>
        <Form.Control type="text" value={comment} placeholder="Comment your exploration..." onChange={(e) => {setComment(e.target.value); console.log(comment)}} />
        <Button type="submit" onClick={sendMsg}>Comment</Button>        
    </>
  )
}

export default Comment