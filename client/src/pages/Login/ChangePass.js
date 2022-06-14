import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ChangePass = () => {
    const navigate = useNavigate()
  return (
    <div className='App-header'>
        It is one process...
        <Button variant='success' onClick={() => navigate('/login')}>Back</Button>
    </div>
  )
}

export default ChangePass;