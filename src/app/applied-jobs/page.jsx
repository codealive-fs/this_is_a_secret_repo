"use client";

import { useEffect, useState, useContext } from "react";
import GlobalAPI from "../_utils/GlobalApi";
import { useAuthContext } from "../_context/AuthContext";


function AppliedJobs() {
  const {user, token} = useAuthContext();  
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (user && token) {
        try {
          const response = await GlobalAPI.getAppliedJobs(user.id, token);          
          setAppliedJobs(response.data);
        } catch (error) {
          console.error("Error fetching applied jobs:", error);
        }
      }
    };
    fetchAppliedJobs();
  }, [user, token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Applied Jobs</h1>
      {appliedJobs.length === 0 ? (
        <div className="text-center text-lg">No applied jobs yet.</div>
      ) : (
        <ul className="space-y-4">
          {appliedJobs.map((job) => {
            const jobAttributes = job.attributes;
            const firmAttributes = jobAttributes?.firm?.data?.attributes;

            return (
              <li
                key={job.id}
                className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold">{jobAttributes.title}</h3>
                <p className="text-gray-700">Salary: {jobAttributes.salary}</p>
                <p className="text-gray-700">Firm: {firmAttributes?.name}</p>
                <p className="text-gray-700">Location: {firmAttributes?.location}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default AppliedJobs;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// "use client";

// import { useEffect, useState, useContext } from "react";
// import GlobalAPI from "../_utils/GlobalApi"; // Import GlobalAPI
// import { AuthContext } from "../_context/AuthContext";

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
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching applied jobs:", error);
//           setLoading(false);
//         });
//     }
//   }, [token]);

//   if (loading) {
//     return <div className="text-center text-lg">Loading...</div>;
//   }

//   if (appliedJobs.length === 0) {
//     return <div className="text-center text-lg">No applied jobs yet.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-semibold mb-6 text-center">Your Applied Jobs</h1>
//       <ul className="space-y-4">
//         {appliedJobs.map((job) => {
//           const jobAttributes = job.attributes;
//           const firmAttributes = jobAttributes?.firm?.data?.attributes;

//           return (

//             <li
//               key={job.id}
//               className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
//             >
//               <h3 className="text-xl font-bold">{jobAttributes.title}</h3>
//               <p className="text-gray-700">Salary: {jobAttributes.salary}</p>
//               <p className="text-gray-700">Firm: {firmAttributes?.name}</p>
//               <p className="text-gray-700">Location: {firmAttributes?.location}</p>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default AppliedJobs;











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
