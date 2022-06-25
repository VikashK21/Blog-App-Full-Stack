import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import { ChangePass, Login } from '../pages/Login';
import Signup from '../pages/Signup';
import Error from '../pages/Error';
import Verify from '../pages/Auth';
import CreateBlog from '../pages/Home/CreateBlog';
import EditBlogs from '../pages/Home/EditBlogs';
import ViewBlogs from '../pages/Home/ViewBlogs';


function Routers() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/verify' element={<Verify />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/change_password' element={<ChangePass />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/profile' element={<CreateBlog />} />
        <Route exact path='/:id' element={<EditBlogs/>} />
        <Route exact path='/blog/:name' element={<ViewBlogs />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
    </>
  )
}

export default Routers