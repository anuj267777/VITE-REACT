import React from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Registration';
// import Blog from './components/Blog';
import Dashboard from './components/Dashbord';
import CreatePost from './components/Blog/CreatePost';
import GetPosts from './components/Blog/GetPosts';
import EditPost from './components/Blog/EditPost';
import ViewPost from './components/Blog/viewPost';
import ARview from './components/ARView';
import "react-toastify/dist/ReactToastify.css"; // Importing toastify styles
import { toast, ToastContainer } from "react-toastify"; 




const App = () => {
  return (
    
    <div className='bg-red-400 text-white'>
     <Router>
      <Routes>
        

      {/* <Route path="/" element={<Login />} /> */}
      
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/get-posts" element={<GetPosts />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/view-post/:id" element={<ViewPost />} />
        <Route path="/ar-view" element={<ARview/>}/>
      </Routes>
      <ToastContainer/>
    </Router>
  
  </div>
  )
}

export default App