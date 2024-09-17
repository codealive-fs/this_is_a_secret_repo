const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api'
})


const getJobs = () => axiosClient.get("/jobs?populate=*").then(resp => {
    console.log("++++++++++++", resp.data);
    return resp.data;
});

const registerUser = (username, email, password) => axiosClient.post('/auth/local/register', {
    username: username,
    email: email,
    password: password
});

const signIn = (email, password) => axiosClient.post("/auth/local", {
    identifier: email,
    password: password
});
export default{
    getJobs,
    registerUser,
    signIn
};









// const getJobs = async (keyword = "") => {
//     let queryString = `/jobs?populate=*`;
//     // If a keyword is provided, add it to the query string
//     if (keyword) {
//       queryString += `&filters[title][$containsi]=${keyword}`;
//     }
//     const resp = await axiosClient.get(queryString);
//     return resp.data;
//   };
