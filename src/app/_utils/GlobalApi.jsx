const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api'
})


const getJob = () => axiosClient.get("/jobs?populate=*");

const registerUser = (username, email, password) => axiosClient.post('/auth/local/register', {
    username: username,
    email: email,
    password: password
});

export default{
    getJob,
    registerUser
};