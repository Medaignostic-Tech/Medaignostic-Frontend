import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import './App.css';

function App() {
    return ( 
    <div className = "App">
        <Router>
            <Routes>
                <Route path = "/" exact element={<Home/>}></Route> 
                <Route path = "/login" exact element={<Login/> }></Route>
                <Route path = "/register" exact element={<Register />}></Route>
                <Route path = "/forgot_password" exact element={<ForgotPassword />}></Route>
            </Routes> 
        </Router> 
    </div>
    );
}

export default App;