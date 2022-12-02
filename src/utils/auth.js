import decodeJwt from 'jwt-decode';
import axios from 'axios';

class Auth {
    login = async(email, password) => {
        var response = [];
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        await axios.post(`http://localhost/auth/jwt/login`, formData)
            .then(res => {
                const data = res.data;
                if ('access_token' in data) {
                    const decodedToken = decodeJwt(data['access_token']);
                    console.log(decodedToken);
                    localStorage.setItem('token', data['access_token']);
                    localStorage.setItem('permissions', 'user');
                    response = ["Login Success", "text-success"];
                } else {
                    response = ["API Error", "text-danger"];
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 500) {
                        response = ["Internal Server Error", "text-danger"];
                    } else {
                        const data = err.response.data;
                        if (err.response.status >= 400 && err.response.status < 500) {
                            if (data.detail) {
                                if (data.detail === "LOGIN_BAD_CREDENTIALS") {
                                    response = ["Invalid Login Credentials", "text-danger"];
                                } else if (data.detail === "LOGIN_USER_NOT_VERIFIED") {
                                    response = ["User is not verified", "text-danger"];
                                } else {
                                    response = ["Internal Server Error", "text-danger"];
                                }
                            } else {
                                response = ["Internal Server Error", "text-danger"];
                            }
                        } else {
                            response = ["Internal Server Error", "text-danger"];
                        }
                    }
                }

            });
        return response;
    }

    register = async(name, email, phone, age, gender, password) => {
        var response = [];
        const formData = {
            "name": name,
            "email": email,
            "phone": phone,
            "age": age,
            "gender": gender,
            "password": password,
            "is_active": true,
            "is_superuser": false,
            "is_verified": false,
            "hashed_password": ""
        };
        await axios.post(`http://localhost/auth/register`, formData)
            .then(res => {
                const data = res.data;
                if ('id' in data) {
                    response = ["Registration Successful", "success"];
                } else {
                    response = ["API Error", "failure"];
                }
            })
            .catch(err => {
                if (err.response.status === 400) {
                    const data = err.response.data;
                    if (data.detail === "REGISTER_USER_ALREADY_EXISTS") {
                        response = ["User Already Exists", "failure"];
                    } else {
                        response = ["Password Validation Failed", "failure"];
                    }
                } else {
                    response = ["Internal Server Error", "failure"];
                }
            });
        return response;
    }

    forgotPassword = async(email) => {
        var response = [];
        const formData = {
            "email": email
        }
        await axios.post(`http://localhost/auth/forgot-password`, formData)
            .then(res => {
                const data = res.data;
                console.log(data);
                if (data === null) {
                    response = ["Secret code sent successfully to your registered mail", "success"];
                } else {
                    response = ["API Error", "failure"];
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    const data = err.response.data;
                    if (data.detail === "User does not exist") {
                        response = ["User does not exist", "failure"];
                    } else {
                        response = ["Internal Server Error", "failure"];
                    }
                } else if (err.response.status === 422) {
                    response = ["Validation Error", "failure"];
                } else {
                    response = ["Internal Server Error", "failure"];
                }
            });
        return response;
    }

    resetPassword = async(secretCode, newPassword) => {
        var response = [];
        const formData = {
            "token": secretCode,
            "password": newPassword
        };
        await axios.post(`http://localhost/auth/reset-password`, formData)
            .then(res => {
                const data = res.data;
                if (data === null) {
                    response = ["Password changed successfully", "success"];
                } else {
                    response = ["API Error", "failure"];
                }
            })
            .catch(err => {
                if (err.response.status === 400) {
                    const data = err.response.data;
                    if (data.detail === "RESET_PASSWORD_BAD_TOKEN") {
                        response = ["Invalid Secret Code", "failure"];
                    } else {
                        response = ["Password Validation Failed", "failure"];
                    }
                } else {
                    response = ["Internal Server Error", "failure"];
                }
            });
        return response;
    }

    isAuthenticated = () => {
        const permissions = localStorage.getItem('permissions');
        if (!permissions) {
            return false;
        }
        return permissions === 'user' ? true : false;
    }

    logout = (callback) => {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        callback();
    }
}

export default new Auth();