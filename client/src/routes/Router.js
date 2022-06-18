import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import { ChangePass, Login } from '../pages/Login';
import Signup from '../pages/Signup';
import Error from '../pages/Error';
import Verify from '../pages/Auth';
import CreateBlog from '../pages/Home/CreateBlog';
import ViewBlogs from '../pages/Home/ViewBlogs';


function Routers() {
  return (
    <>
    <div className='m-3 mt-3' style={{color: 'orangered', float: 'right'}} title='Darshat, Rajesh, Vikash, Kumar'><h6>DRVK</h6></div>
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/verify' element={<Verify />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/change_password' element={<ChangePass />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/profile' element={<CreateBlog />} />
        <Route exact path='/:id' element={<ViewBlogs/>} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
    </>
  )
}

export default Routers