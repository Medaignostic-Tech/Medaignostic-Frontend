import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import UserDashboard from "./components/UserDashboard";
import UploadReports from "./components/UploadReports";
import Profile from "./components/Profile";
import ViewReports from "./components/Report";
import auth from './utils/auth';
import './App.css';

function App() {
    return ( 
    <div className = "App" style={{ backgroundColor: "aquamarine" }}>
        <BrowserRouter>
            <Routes>
                <Route path = "/" exact element={<Home />}></Route> 
                <Route path = "/login" exact element={<Login /> }></Route>
                <Route path = "/about" exact element={<About /> }></Route>
                <Route path = "/register" exact element={<Register />}></Route>
                <Route path = "/forgot_password" exact element={<ForgotPassword />}></Route>
                <Route path = "/reset_password" exact element={<ResetPassword />}></Route>
                <Route path = "/dashboard" exact element={auth.isAuthenticated() ? <UserDashboard /> : <Navigate to="/login" />}></Route>
                <Route path = "/upload_reports" exact element={auth.isAuthenticated() ? <UploadReports /> : <Navigate to="/login" />}></Route>
                <Route path = "/profile" exact element={auth.isAuthenticated() ? <Profile /> : <Navigate to="/login" />}></Route>
                <Route path = "/report" exact element={auth.isAuthenticated() ? <ViewReports /> : <Navigate to="/login" />}></Route>
            </Routes> 
        </BrowserRouter> 
    </div>
    );
}

export default App;