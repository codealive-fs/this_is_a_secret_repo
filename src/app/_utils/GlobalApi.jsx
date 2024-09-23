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


// Update user profile including CV upload
// const updateUserProfile = async (userId, updatedData, token) => {
//   console.log("updatedData", updatedData);
  
//   try {
//     // Create FormData to handle text fields and file uploads
//     const formData = new FormData();

//     // Append the text fields like username and email
//     formData.append('username', updatedData.username);
//     formData.append('email', updatedData.email);

//     // Check if a CV file is present and append it
//     if (updatedData.cv) {
//       formData.append('cv', updatedData.cv);  // 'cv' is the name for the CV field in Strapi
//     }

//     // Log each FormData field to check what's being sent
//     for (const [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }
//     // Make PUT request to update user with authorization token
//     console.log("formData", updatedData);
//     const resp = await axiosClient.put(`/users/${userId}`, updatedData, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data'  // Specify this to handle file upload
//       },
//     });
    
//     console.log("User profile updated successfully:", resp);
//     return resp.data;
//   } catch (error) {
//     console.error("Error updating user profile:", error);
//     throw error;
//   }
// };

// Upload file to Strapi

const updateUserProfile = async (userId, updatedData, token) => {
  console.log("updatedData", updatedData);

  try {
    // Prepare data for updating user profile
    const payload = {
      username: updatedData.username,
      email: updatedData.email,
      ...(updatedData.cv && { cv: updatedData.cv })  // Attach CV ID if present
    };

    const resp = await axiosClient.put(`/users/${userId}`, payload, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    console.log("User profile updated successfully:", resp.data);
    return resp.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};


const uploadCV = async (file, token) => {
  try {
    const formData = new FormData();
    formData.append('files', file);  // 'files' is the key for uploading multiple files

    const response = await axiosClient.post('/upload', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    });

    console.log("CV uploaded successfully:", response.data);
    return response.data;  // This will return an array of uploaded files, each with an ID
  } catch (error) {
    console.error("Error uploading CV:", error);
    throw error;
  }
};

// Update user profile
// const updateUserProfile = async (userId, updatedData, token) => {
//     try {
//       const resp = await axiosClient.put(`/users/${userId}`, updatedData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("User profile updated successfully:", resp.data);
//       return resp.data;
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//       throw error;
//     }
//   };
  

export default{
    getJobs,
    registerUser,
    signIn,
    uploadCV,
    updateUserProfile,
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
