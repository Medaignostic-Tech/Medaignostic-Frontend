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
}

export default new Auth();