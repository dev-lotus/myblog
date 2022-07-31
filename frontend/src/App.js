
import './App.css';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Map from './components/Map/Map';
import Forum from './components/Forum/Forum';
import Message from './components/Message/Message';
import Login from './components/Login/Login';
import MyProfile from './components/MyProfile/MyProfile';
import { useState } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(1);
  return (
    <div className="App">
      {isLogin == 1 ? <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/message" element={<Message />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/my-profile" element={<MyProfile />} />
        </Routes>
      </BrowserRouter> : <Login />}


    </div>
  );
}

export default App;
