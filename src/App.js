// import './index.css'
import Navbar from './component/Navbar'
import Home from './component/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './component/Login';
import Signup from './component/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (

    <NoteState>
      <BrowserRouter>
        <div className="App">
          <ToastContainer
            theme="colored" />
          <Navbar />
          {/* <Home /> */}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
