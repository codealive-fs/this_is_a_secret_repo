"use client"
import Sidebar from './Sidebar';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext to get user and token
import { JobsContext } from "../context/JobsContext";
import GlobalAPI from "../_utils/GlobalAPI"; // Import GlobalAPI

export default function Hero() {
  
  // const [jobs, setJobs] = useState(jobList || []);
  const { jobs: jobList, loading } = useContext(JobsContext);
  const { user, token } = useContext(AuthContext); // Get logged-in user and token
  const [jobs, setJobs] = useState(jobList || []);

  const [filters, setFilters] = useState({
    fullTime: false,
    partTime: false,
    permanent: false,
    contractual: false,
    educationBScAssociate: false,
    educationBachelorsCS: false,
    educationBachelorsBusiness: false,
    educationMastersBusiness: false,
    educationBachelorsProjectMgmt: false, 
    experienceJunior: false,
    experienceMidLevel: false,
    experienceSenior: false,
    minSalary: "",
    maxSalary: "",
  });
  const [searchQuery, setSearchQuery] = useState({ keyword: "", location: "" });

  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery, jobList]);

  const applyForJob = async (jobId) => {
    if (!user || !token) {
      alert("You must be logged in to apply.");
      return;
    }

    try {
      const response = await GlobalAPI.applyForJob(jobId, user.id, token);
      console.log("userId", user.id, "jobId", jobId);
      alert("Successfully applied to the job!");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Failed to apply for the job.");
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value !== undefined ? value : !prevFilters[filterName],
    }));
  };


/////////////////////////////////////////////////////////////////////////////////////////////////
  // const handleFilterChange = (filterName) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [filterName]: !prevFilters[filterName],
  //     // [filterName]: value !== undefined ? value : !prevFilters[filterName],
  //   }));
  // };

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    // console.log("Job list before filtering:", jobList);
    // console.log("Current filters:", filters); 
    let filteredJobs = jobList;

    // Apply filter conditions
    if (filters.fullTime) {
      filteredJobs = filteredJobs.filter((job) => job.attributes.jobType === "Full-Time");
    }
    if (filters.partTime) {
      filteredJobs = filteredJobs.filter((job) => job.attributes.jobType === "Part-Time");
    }
    if (filters.permanent) {
      filteredJobs = filteredJobs.filter((job) => job.attributes.jobType === "Permanent");
    }
    if (filters.contractual) {
      filteredJobs = filteredJobs.filter((job) => job.attributes.jobType === "Contractual");
    }
    if (filters.educationBScAssociate) {
      filteredJobs = filteredJobs.filter((job) => job.attributes.education === "BSc. 2 Year Associate Degree");
      console.log("Filtered by BSc. 2 Year Associate Degree:", filteredJobs);
    }
    if (filters.educationBachelorsCS) {
      filteredJobs = filteredJobs.filter((job) => job.attributes.education === "Bachelors in CS/SE");
      console.log("Filtered by Bachelors in CS/SE:", filteredJobs);
    }
    if (filters.educationBachelorsBusiness) {
      filteredJobs = filteredJobs.filter((job) => job.attributes.education === "Bachelors in Business Administration");
      console.log("Filtered by Bachelors in Business Administration", filteredJobs);
    }
    if (filters.educationMastersBusiness) {
      filteredJobs = filteredJobs.filter((job) => job.attributes.education === "Masters in Busniess Administration");
      console.log("Filtered by Masters in Business Administration", filteredJobs);
    }
    if (filters.educationBachelorsProjectMgmt) {
      filteredJobs = filteredJobs.filter((job) => job.attributes.education === "Bachelors in Project Management");
      console.log("Filtered by Bachelors in Project Management", filteredJobs);
    }
    // Apply search query
    const { keyword, location } = searchQuery;
    if (keyword) {
      filteredJobs = filteredJobs.filter((job) =>
        job.attributes.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    if (location) {
      filteredJobs = filteredJobs.filter((job) =>
        job.attributes.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    // Apply experience filters
    if (filters.experienceJunior) {
      filteredJobs = filteredJobs.filter((job) => job.attributes.experience === "Junior");
    }
    if (filters.experienceMidLevel) {
      filteredJobs = filteredJobs.filter((job) => job.attributes.experience === "Mid-Level");
    }
    if (filters.experienceSenior) {
      filteredJobs = filteredJobs.filter((job) => job.attributes.experience === "Senior");
    }
      // Apply Salary Range Filter
    if (filters.minSalary) {
      filteredJobs = filteredJobs.filter((job) =>
        parseInt(job.attributes.salary) >= parseInt(filters.minSalary)
      );
    }
    if (filters.maxSalary) {
      filteredJobs = filteredJobs.filter((job) =>
        parseInt(job.attributes.salary) <= parseInt(filters.maxSalary)
      );
    }
    console.log("Filtered jobs:", filteredJobs); // Log filtered jobs
    setJobs(filteredJobs);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    applyFilters();
    console.log(filters);
  };

  return (
    <section className="py-8">
      <h1 className="text-4xl text-center font-bold mb-8">
        Find your next <br /> dream job
      </h1>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Sidebar filters={filters} onFilterChange={handleFilterChange} />
        <div className="lg:col-span-2">
          {/* Search form */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-md mx-auto">
             <input
               name="keyword"
               type="search"
               className="border border-gray-400 rounded-md px-2 py-2 w-full"
               placeholder="Job title or keyword.."
               value={searchQuery.keyword}
               onChange={handleSearchChange}
             />
             <input
               name="location"
               type="search"
               className="border border-gray-400 rounded-md px-2 py-2 w-full"
               placeholder="Location.."
               value={searchQuery.location}
               onChange={handleSearchChange}
               />
               <button className="bg-blue-600 text-white rounded-md px-4 py-2" type="submit">
                 Search
               </button>
             </form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => {
              const deadlinePassed = new Date(job.attributes.expiary_date) < new Date();

              return (
                <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold">{job.attributes.title}</h3>
                  <p className="text-gray-700">
                    {job.attributes.company} - {job.attributes.location} - {job.attributes.jobType}
                  </p>
                  <p className="text-gray-700">{job.attributes.description}</p>
                  <p className="text-red-500 font-bold">
                    Deadline: {new Date(job.attributes.expiary_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">{job.attributes.salary}</p>

                  <button
                    className={`mt-4 px-4 py-2 rounded ${
                      deadlinePassed ? "bg-gray-400" : "bg-blue-600 text-white"
                    }`}
                    onClick={() => {
                      console.log("Button clicked", job.id, user.id);
                      applyForJob(job.id, user.id, token)

                    }}
                    disabled={deadlinePassed}
                  >
                    {deadlinePassed ? "Deadline Passed" : "Apply Now"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // return (
  //   <section className="py-8">
  //     <h1 className="text-4xl text-center font-bold mb-8">
  //       Find your next <br /> dream job
  //     </h1>

  //     <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
  //       <Sidebar filters={filters} onFilterChange={handleFilterChange} />
  //       <div className="lg:col-span-2">
  //         <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-md mx-auto">
  //           <input
  //             name="keyword"
  //             type="search"
  //             className="border border-gray-400 rounded-md px-2 py-2 w-full"
  //             placeholder="Job title or keyword.."
  //             value={searchQuery.keyword}
  //             onChange={handleSearchChange}
  //           />
  //           <input
  //             name="location"
  //             type="search"
  //             className="border border-gray-400 rounded-md px-2 py-2 w-full"
  //             placeholder="Location.."
  //             value={searchQuery.location}
  //             onChange={handleSearchChange}
  //           />
  //           <button className="bg-blue-600 text-white rounded-md px-4 py-2" type="submit">
  //             Search
  //           </button>
  //         </form>

  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //           {jobs.map((job) => (
  //             <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
  //               <h3 className="text-xl font-bold">{job.attributes.title}</h3>
  //               {/* <p className="text-gray-700">{job.attributes.location}</p> */}
  //               {/* <h3 className="text-xl font-bold">{job.attributes.title}</h3> */}
  //               <p className="text-gray-700">
  //                 {job.attributes.company} - {job.attributes.location} - {job.attributes.jobType}
  //               </p>
  //               <p className="text-gray-700">{job.attributes.description}</p>
  //               <p className="text-red-500 font-bold">
  //                 Deadline: {new Date(job.attributes.expiary_date).toLocaleDateString()}
  //               </p>
  //               <p className="text-gray-700">{job.attributes.salary}</p>
  //               <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
  //                 Apply Now
  //               </button>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
// }


////////////////////////////////////////////////////////
// "use client"
// import Sidebar from './Sidebar';
// import { useState } from "react";

// export default function Hero({ jobList }) {
//   const [jobs, setJobs] = useState(jobList || []);
//   const [searchQuery, setSearchQuery] = useState({ keyword: "", location: "" });

//   const getJobsList = () => {
//     const { keyword, location } = searchQuery;

//     if (keyword || location) {
//       const filteredJobs = jobList.filter((job) =>
//         job.attributes.title.toLowerCase().includes(keyword.toLowerCase()) &&
//         (!location || job.attributes.location.toLowerCase().includes(location.toLowerCase()))
//       );
//       setJobs(filteredJobs);
//     } else {
//       setJobs(jobList);
//     }
//   };

//   const handleSearch = (event) => {
//     event.preventDefault();
//     console.log(jobs);
    
//     getJobsList();

//   };

//   return (
//     <section className="py-12">
//       <h1 className="text-4xl text-center font-bold mb-8">
//         Find your next <br /> dream job
//       </h1>

//       {/* Main layout with sidebar on the left */}
//       <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Sidebar */}
//         <Sidebar jobList={jobList} />
//         {/* Main content: form and job listings */}
//         <div className="lg:col-span-2">
//           <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-md mx-auto">
//             <input
//               name="keyword"
//               type="search"
//               className="border border-gray-400 rounded-md px-2 py-2 w-full"
//               placeholder="Job title or keyword.."
//               onChange={(e) => setSearchQuery({ ...searchQuery, keyword: e.target.value })}
//             />
//             <input
//               name="location"
//               type="search"
//               className="border border-gray-400 rounded-md px-2 py-2 w-full"
//               placeholder="Location.."
//               onChange={(e) => setSearchQuery({ ...searchQuery, location: e.target.value })}
//             />
//             <button className="bg-blue-600 text-white rounded-md px-4 py-2" type="submit">
//               Search
//             </button>
//           </form>

//           {/* Job Listings */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {jobs.map((job) => (
//               <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="text-xl font-bold">{job.attributes.title}</h3>
//                 <p className="text-gray-700">{job.attributes.location}</p>
//                 <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
//                   Apply Now
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
