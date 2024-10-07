"use client";

import { useEffect, useState, useContext } from "react";
import GlobalAPI from "../_utils/GlobalApi"; // Import GlobalAPI
import { AuthContext } from "../_context/AuthContext";

function AppliedJobs() {
  const { user, token } = useContext(AuthContext); // Get logged-in user and token
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      // Fetch applied jobs for the logged-in user
      GlobalAPI.getAppliedJobs(user.id, token)
        .then((data) => {
          setAppliedJobs(data.data); // Assuming response structure is { data: [...] }
          
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching applied jobs:", error);
          setLoading(false);
        });
      }
    }, [token]);
    console.log(appliedJobs);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (appliedJobs.length === 0) {
    return <div>No applied jobs yet.</div>;
  }

  return (
    <div>
      <h1>Your Applied Jobs</h1>
      <ul>
        {appliedJobs.map((application) => {
          // const { status, jobs, company } = application.attributes;
          const job = application.attributes; // Access the job attributes
          // const job1 = application.attributes.company.data[0].attributes;
          console.log("JOBS---->",job);
          
          return (
            <li key={application.id}>
              {job ? (
                <>
                  <h3>{job?.jobs?.data?.attributes?.title}</h3>
                  <p>Company: {job?.company?.data?.attributes?.name}</p>
                  <p>Location: {job?.jobs?.data?.attributes?.location}</p>
                  <p>Status: {application?.attributes?.status}</p>
                </>
              ) : (
                <p>Job information is not available.</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AppliedJobs;











//////////////////////////////////////////////////////////////////////////////////////////////////
// "use client"

// import { useEffect, useState, useContext } from "react";
// import GlobalAPI from "../_utils/GlobalApi"; // Import GlobalAPI
// import { AuthContext } from "../context/AuthContext";

// function AppliedJobs() {
//   const { user, token } = useContext(AuthContext); // Get logged-in user and token
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user && token) {
//       // Fetch applied jobs for the logged-in user
//       GlobalAPI.getAppliedJobs(user.id, token)
//         .then((data) => {
//           setAppliedJobs(data.data); // Assuming response structure is { data: [...] }
//           console.log(appliedJobs);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching applied jobs:", error);
//           setLoading(false);
//         });
//     }
//   }, [user, token]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (appliedJobs.length === 0) {
//     return <div>No applied jobs yet.</div>;
//   }

//   return (
//     <div>
//       <h1>Your Applied Jobs</h1>
//       <ul>
//         {appliedJobs.map((application) => (
//           <li key={application.id}>
//             <h3>{application.attributes.job.title}</h3>
//             <p>{application.attributes.job.company}</p>
//             <p>Status: {application.attributes.status}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default AppliedJobs;
