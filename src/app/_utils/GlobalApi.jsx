const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api'
})


const getJobs = () => axiosClient.get("/jobs?populate=*").then(resp => {
    // console.log("++++++++++++", resp.data);
    return resp.data;
});

const registerUser = (fullName, username, email, password) => axiosClient.post('/auth/local/register', {
    fullName: fullName,
    username: username,
    email: email,
    password: password
});

const signIn = (email, password) => axiosClient.post("/auth/local", {
    identifier: email,
    password: password
});


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
    console.log("file", file);
    
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


const applyForJob = async (jobId, userId, token) => {
  try {
    // Fetch the existing job data (with applied_users populated)
    const jobResponse = await axiosClient.get(`/jobs/${jobId}?populate=applied_users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const jobData = jobResponse.data;
    // Extract the current applied users
    const currentAppliedUsers = jobData.data.attributes.applied_users.data;

    // Map the applied users to an array of objects with just the ID
    const updatedAppliedUsers = currentAppliedUsers.map(user => ({ id: user.id }));

    // Add the new user to the applied_users array (if not already applied)
    if (!updatedAppliedUsers.some(user => user.id === userId)) {
      updatedAppliedUsers.push({ id: userId });
    }

    // Update the job with the new applied_users array
    const updateResponse = await axiosClient.put(`/jobs/${jobId}`, {
      data: {
        applied_users: updatedAppliedUsers,
      },
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Updated job with applied users: ', updateResponse.data);
    return updateResponse.data;

  } catch (error) {
    console.error('Error applying to job: ', error);
  }
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const applyForJob = async (jobId, userId, token) => {
//   try {
//     // Fetch the existing job data (with applied_users populated)
//     const jobResponse = await axiosClient.get(`/jobs/${jobId}?populate=applied_users`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const jobData = jobResponse.data;
//     // console.log("lksjdflksjdjobData===================>", jobData);
    
    
//     // Add the new user to the applied_users array if they aren't already in it
//     console.log("I am nobody-------->", jobData.data.attributes.applied_users.data);
//     const updatedAppliedUsers = [...jobData.data.attributes.applied_users.data, userId];

//     // Update the job with the new applied_users array
//     const updateResponse = await axiosClient.put(`/jobs/${jobId}`, {
//       data: {
//         applied_users: updatedAppliedUsers,
//       },
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log('Updated job with applied users: ', updateResponse.data);
//     return updateResponse.data;

//   } catch (error) {
//     console.error('Error applying to job: ', error);
//   }
// };



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const applyForJob = async (jobId, companyId,userId, token) => {
//   try {
  
//     // Log jobId and userId to check if they are being passed correctly
//     console.log("Job ID:", jobId);
//     console.log("CompanyID", companyId);
//     console.log("User ID:", userId);
//     console.log("Token:", token);
  
//     const response = await axiosClient.post('/job-applications', {
//       data: {
//         jobs: {id: jobId},
//         status: 'applied',
//         company: {id: companyId},
//         users_permissions_user: {id: userId}
//       }
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
    
//     console.log("Job application successful:", response);
//     return response.data;
//   } catch (error) {
//     console.error("Error applying for job:", error);
//     throw error;
//   }
// };

  const getUserCompany = async (userId, token) => {
  const response = await axiosClient.get(`/users/${userId}?populate=company`, {
    
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log("COMPANY RESPONSE: ", companyResponse)
  // console.log("getUserCompany========>", response.data);
  
  return response.data;
};


const getAppliedJobs = async (userId, token) => {
  try {
    const response = await axiosClient.get(`/jobs?filters[applied_users][id][$eq]=${userId}&populate=applied_jobs&populate=firm`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Applied Jobs: ', response.data);
    return response.data;  // Returns the list of jobs applied to by the user
  } catch (error) {
    console.error('Error fetching applied jobs: ', error);
    throw error;
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const getAppliedJobs = async (userId, token) => {
//   try {
//     const response = await axiosClient.get(`/job-applications?filters[users_permissions_user][$eq]=${userId}&populate=*`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     console.log("Fetched applied jobs:", response.data);
    
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching applied jobs:", error);
//     throw error;
//   }
// };

const registerCompany = async (name, address, location, userId, token) => {
  try {
    // Log company data for debugging
    console.log("Company Name:", name);
    console.log("Address:", address);
    console.log("Location:", location);
    console.log("User ID:", userId);
    console.log("Token:", token);

    // API call to register the company
    const response = await axiosClient.post('/companies', {
      data: {
        name: name,
        address: address,
        location: location,
        owner:{
          id: userId
        }
          // Associate the company with the logged-in user
      }
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data'
      }
    });

    console.log("Company registration successful:", response);
    return response.data;
  } catch (error) {
    console.error("Error registering company:", error);
    throw error;
  }
};


const addJob = async (title, salary, expiaryDate, jobType, education, experience, companyId, userId, token) => {
  try {

    // API call to add the job
    const response = await axiosClient.post('/jobs', {
      data: {
        title: title,
        salary: salary,
        expiary_date: expiaryDate,
        jobType: jobType,
        education: education,
        experience: experience,
        author: { id: userId },
        firm: { id: companyId },
      }
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("Job added successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error adding job:", error);
    throw error;
  }
};


const getUserPostedJobs = async (userId, token) => {
  const response = await axiosClient.get(`/users/${userId}?populate=jobs&populate=company`, {
    
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("getUserJobs Response: ", response.data); // Log full response if needed
  const jobsData = response.data; // Access jobs from the response
  console.log("Jobs Posted by User: ", jobsData);
  
  
  return jobsData;  // Return the jobs data directly
};




const editJob = async (jobId, title, salary, expiaryDate, jobType, education, experience, companyId, userId, token) => {
  try {
    // API call to update the job
    const response = await axiosClient.put(`/jobs/${jobId}`, {
      data: {
        title: title,
        salary: salary,
        expiary_date: expiaryDate,
        jobType: jobType,
        education: education,
        experience: experience,
        author: { id: userId },  // Update author relation
        firm: { id: companyId },  // Update firm relation
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    console.log("Job updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

export default{
  getJobs,
  registerUser,
  signIn,
  uploadCV,
  getAppliedJobs,
  getUserCompany,
  applyForJob,
  updateUserProfile,
  registerCompany,
  addJob,
  getUserPostedJobs,
  editJob,
};







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const getJobApplications = async (jobId, token) => {
//   try {
  //     const response = await axiosClient.get(`/jobs/${jobId}?populate[0]=job_application&populate[job_application][populate]=users_permissions_user`, {
    //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
//     });
    
//     // console.log("Job Applications Data: ", response.data);
//     // return response?.data?.data?.attributes?.job_applications?.data;
//     // return response.data.attributes.job_application.data[0];
//     return response.data.data.attributes.job_application.data.map(job => 
//       {
//         console.log(job.attributes.owner.data.attributes)
//         return job.attributes.owner.data.attributes;
//       }
//     );
//     // debugger
//   } catch (error) {
//     console.error("Error fetching job applications: ", error);
//     throw error;
//   }
// };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const addJob = async (e) => {
  //   e.preventDefault();
//   setLoading(true);
//   setError("");

//   try {
//     const response = await fetch('/api/add-job', {
//       method: 'POST',
//       headers: {
  //         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Failed to add job');
//     }

//     const result = await response.json();
//     console.log("Job added successfully:", result);
//     toast.success("Job added successfully!");
//     router.push("/jobs");
//   } catch (error) {
//     console.error("Error adding job:", error);
//     setError(error.message || "An error occurred while adding the job.");
//     toast.error(error.message || "An error occurred while adding the job.");
//   } finally {
  //     setLoading(false);
//   }
// };

////////////////////////////////////////////////////////////////////////////////////////////////////

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

// const getJobs = async (keyword = "") => {
//     let queryString = `/jobs?populate=*`;
//     // If a keyword is provided, add it to the query string
//     if (keyword) {
  //       queryString += `&filters[title][$containsi]=${keyword}`;
//     }
//     const resp = await axiosClient.get(queryString);
//     return resp.data;
//   };
