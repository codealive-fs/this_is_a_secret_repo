
"use client"
import Sidebar from './Sidebar';
import { useState, useEffect, useContext } from "react";
import { useAuthContext } from "../_context/AuthContext"; // Import AuthContext to get user and token
import { JobsContext } from "../_context/JobsContext";
import { calculateJobStats } from "../_utils/statsUtils";
import GlobalAPI from "../_utils/GlobalAPI"; // Import GlobalAPI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { MapPin, Pyramid, Search, History } from "lucide-react";
// import Markdown from 'markdown-to-jsx';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import Markdown from 'react-markdown';

export default function Hero() {
  
  const {user, token} = useAuthContext();  
  // const [jobs, setJobs] = useState(jobList || []);
  const { jobs: jobList, loading } = useContext(JobsContext);

  const [jobs, setJobs] = useState(jobList || []);
  const [jobStats, setJobStats] = useState({
    totalJobs: 0,
    averageSalary: 0,
    minSalary: 0,
    maxSalary: 0,
  });
  
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
  const [appliedJobs, setAppliedJobs] = useState([]);

      
  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery, jobList]);

  useEffect(() => {
    if (user && token) {
      // Fetch the jobs the user has already applied for
      GlobalAPI.getAppliedJobs(user.id, token)
        .then((response) => {
          console.log("response----------->", response);
          const appliedJobIds = response.data.map((jobs) => jobs.id);
          
          setAppliedJobs(appliedJobIds); // Save the applied job IDs to state
          // debugger
        })
        .catch((error) => console.error("Error fetching applied jobs:", error));
    }
  }, [user, token]);

  const applyForJob = async (jobId) => {
    if (!user || !token) {
      alert("You must be logged in to apply.");
      return;
    }
    
    try {
      await GlobalAPI.applyForJob(jobId, user.id, token); // Removed companyId
      setAppliedJobs([...appliedJobs, jobId]); // Add the job to the list of applied jobs
      
      alert("Successfully applied to the job!");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Failed to apply for the job.");
    }
  };
 // console.log(appliedJobs);


  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value !== undefined ? value : !prevFilters[filterName],
    }));
  };

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };
  
  const applyFilters = () => {
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
      // job?.attributes?.location?.toLowerCase().includes(location.toLowerCase())
    job?.attributes?.firm?.data?.attributes?.location?.toLowerCase().includes(location.toLowerCase())
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
// console.log("Filtered jobs:", filteredJobs); // Log filtered jobs
setJobs(filteredJobs);
// console.log("---------------->", filteredJobs);


const stats = calculateJobStats(filteredJobs);
setJobStats(stats);
};

  const handleSearch = (event) => {
    event.preventDefault();
    applyFilters();
    // console.log(filters);
  };
  // console.log('jobs---------->', jobs);

  return (
    
    <section className="py-8">
    <div className="main-heading ">
       <h1 className="text-4xl text-center font-bold">
         Find your next <br /> dream job
       </h1>
    </div>

    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Sidebar filters={filters} onFilterChange={handleFilterChange} />
      <div className="lg:col-span-2">
        {/* Search form */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-md mx-auto">
            <div className='flex gap-3 items-center border border-purple-400 rounded-full p-2'>
               <Search />
               <input
                 name="keyword"
                 type="search"
                 className="outline-none"
                 placeholder="Job title or keyword.."
                 value={searchQuery.keyword}
                 onChange={handleSearchChange}
                 />
            </div>
            <div className='flex gap-3 items-center border border-purple-400 rounded-full p-2'>
                <MapPin />
                <input
                  name="location"
                  type="search"
                  className="outline-none"
                  placeholder="Location.."
                  value={searchQuery.location}
                  onChange={handleSearchChange}
                  />
            </div>
            </form>
            {/* <-----------------------------------------Job's Stats-----------------------------------------> */}
            <div className="flex justify-center mb-2">
              <Card className="w-full max-w-xl p-2 bg-white border border-purple-300 rounded-full">
                <CardContent className="flex py-1 justify-between items-center text-center gap-6">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Total no. Jobs</p>
                    <p className="text-base font-medium text-purple-700">{jobStats.totalJobs}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Average Salary</p>
                    <p className="text-base font-medium text-purple-700">${jobStats.averageSalary.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Min Salary</p>
                    <p className="text-base font-medium text-purple-700">${jobStats.minSalary}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Max Salary</p>
                    <p className="text-base font-medium text-purple-700">${jobStats.maxSalary}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map((job) => { 
        const jobId = job.id;
        const deadlinePassed = new Date(job.attributes.expiary_date) < new Date();
        const alreadyApplied = appliedJobs.includes(jobId);
        
        return (
          <Card key={jobId} className="w-full">
            <CardHeader>
              <div className="flex items-center space-x-4 p-2">
                {/* Logo Container */}
                <div className="w-16 h-16 border border-gray-200 rounded-sm overflow-hidden bg-gray-50 flex-shrink-0">
                  <img 
                    src={job.attributes?.firm.data?.attributes?.logo?.data?.attributes?.url} 
                    alt="Firm Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title and Firm Name */}
                <div className="flex flex-col">
                  <CardTitle className="text-lg font-medium mb-1 text-gray-800">{job.attributes.title}</CardTitle>
                  <p className="text-purple-700 text-sm font-semibold">{job?.attributes?.firm?.data?.attributes?.name}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-2">
              <div className="flex flex-wrap gap-4 text-gray-700 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin size={15} />
                  {job?.attributes?.firm?.data?.attributes?.location}
                </span>
                <span className="flex items-center gap-1">
                  <Pyramid size={15} />
                  {job.attributes.jobType}
                </span>
                <span className="flex items-center gap-1">
                  <History size={15} strokeWidth={2.4} />
                  {job.attributes.experience}
                </span>
              </div>

              <p className="text-red-500 font-bold">
                Deadline: {new Date(job.attributes.expiary_date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">{job.attributes.salary} $/Year</p>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                className={deadlinePassed || alreadyApplied ? "bg-gray-400" : "bg-purple-700 hover:bg-purple-600"}
                onClick={() => applyForJob(jobId)}
                disabled={deadlinePassed || alreadyApplied}
              >
                {alreadyApplied ? "Applied" : deadlinePassed ? "Deadline Passed" : "Apply Now"}
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-purple-700 hover:bg-purple-100">Details</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl md:max-w-2xl max-h-[85vh] overflow-auto">
                  <DialogHeader>
                    <DialogTitle>Job's Description</DialogTitle>
                    <DialogDescription className=" overflow-auto">
                      <Markdown>{job.attributes.description}</Markdown>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        );
      })}
    </div>
      </div>
    </div>
  </section>






//////////////////////////////////////////////////////////////////////////////////////////////////////  
// {/* <button
  // className={`mt-4 px-4 py-2 rounded ${
    // deadlinePassed || alreadyApplied
      // ? "bg-gray-400"
      // : "bg-blue-600 text-white"
  // }`}
  // onClick={() => applyForJob(jobId)}
  // disabled={deadlinePassed || alreadyApplied}
// >
  // {alreadyApplied ? "Applied" : deadlinePassed ? "Deadline Passed" : "Apply Now"}
// </button> */}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const applyForJob = async (jobId, companyId) => {
  //   console.log("companyID----->", companyId);
      
    //   if (!user || !token) {
    //     alert("You must be logged in to apply.");
    //     return;
    //   }
  
    //   try {
    //     await GlobalAPI.applyForJob(jobId, companyId, user.id, token);
    //     console.log(companyId);
        
    //     setAppliedJobs([...appliedJobs, jobId]); // Add the job to the list of applied jobs
    //     alert("Successfully applied to the job!");
    //   } catch (error) {
    //     console.error("Error applying for job:", error);
    //     alert("Failed to apply for the job.");
    //   }
    // };

// after applyForJob
//////////////////////////////////////////////////////////////////////////////////////////////////
  // const applyForJob = async (jobId) => {
  //   if (!user || !token) {
  //     alert("You must be logged in to apply.");
  //     return;
  //   }

  //   try {
  //     const response = await GlobalAPI.applyForJob(jobId, user.id, token);
  //     console.log("userId", user.id, "jobId", jobId);
  //     alert("Successfully applied to the job!");
  //   } catch (error) {
  //     console.error("Error applying for job:", error);
  //     alert("Failed to apply for the job.");
  //   }
  // };


    ////////////////////////////////////////////////////////////////////////////////////////////
    // <section className="py-8">
    //   <h1 className="text-4xl text-center font-bold mb-8">
    //     Find your next <br /> dream job
    //   </h1>

    //   <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
    //     <Sidebar filters={filters} onFilterChange={handleFilterChange} />
    //     <div className="lg:col-span-2">
    //       {/* Search form */}
    //       <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-md mx-auto">
    //          <input
    //            name="keyword"
    //            type="search"
    //            className="border border-gray-400 rounded-md px-2 py-2 w-full"
    //            placeholder="Job title or keyword.."
    //            value={searchQuery.keyword}
    //            onChange={handleSearchChange}
    //          />
    //          <input
    //            name="location"
    //            type="search"
    //            className="border border-gray-400 rounded-md px-2 py-2 w-full"
    //            placeholder="Location.."
    //            value={searchQuery.location}
    //            onChange={handleSearchChange}
    //            />
    //            <button className="bg-blue-600 text-white rounded-md px-4 py-2" type="submit">
    //              Search
    //            </button>
    //          </form>
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //         {jobs.map((job) => {
    //           const deadlinePassed = new Date(job.attributes.expiary_date) < new Date();

    //           return (
    //             <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
    //               <h3 className="text-xl font-bold">{job.attributes.title}</h3>
    //               <p className="text-gray-700">
    //                 {job.attributes.company} - {job.attributes.location} - {job.attributes.jobType}
    //               </p>
    //               <p className="text-gray-700">{job.attributes.description}</p>
    //               <p className="text-red-500 font-bold">
    //                 Deadline: {new Date(job.attributes.expiary_date).toLocaleDateString()}
    //               </p>
    //               <p className="text-gray-700">{job.attributes.salary}</p>

    //               <button
    //                 className={`mt-4 px-4 py-2 rounded ${
    //                   deadlinePassed ? "bg-gray-400" : "bg-blue-600 text-white"
    //                 }`}
    //                 onClick={() => {
    //                   console.log("Button clicked", job.id, user.id);
    //                   applyForJob(job.id, user.id, token)

    //                 }}
    //                 disabled={deadlinePassed}
    //               >
    //                 {deadlinePassed ? "Deadline Passed" : "Apply Now"}
    //               </button>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </div>
    // </section>
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

//////////////////////////////////////////////////////////////////////////////////////////////////////

// "use client"
// import Sidebar from './Sidebar';
// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../_context/AuthContext"; // Import AuthContext to get user and token
// import { JobsContext } from "../_context/JobsContext";
// import GlobalAPI from "../_utils/GlobalAPI"; // Import GlobalAPI
// import { calculateJobStats } from "../_utils/statsUtils";

// export default function Hero() {
  
//   // const [jobs, setJobs] = useState(jobList || []);
//   const { jobs: jobList, loading } = useContext(JobsContext);
//   const { user, token } = useContext(AuthContext); // Get logged-in user and token
//   console.log("Token----->", token);
  
//   const [jobs, setJobs] = useState(jobList || []);
//   const [jobStats, setJobStats] = useState({
//     totalJobs: 0,
//     averageSalary: 0,
//     minSalary: 0,
//     maxSalary: 0,
//   });

//   const [filters, setFilters] = useState({
//     fullTime: false,
//     partTime: false,
//     permanent: false,
//     contractual: false,
//     educationBScAssociate: false,
//     educationBachelorsCS: false,
//     educationBachelorsBusiness: false,
//     educationMastersBusiness: false,
//     educationBachelorsProjectMgmt: false, 
//     experienceJunior: false,
//     experienceMidLevel: false,
//     experienceSenior: false,
//     minSalary: "",
//     maxSalary: "",
//   });
//   const [searchQuery, setSearchQuery] = useState({ keyword: "", location: "" });

//   useEffect(() => {
//     applyFilters();
//   }, [filters, searchQuery, jobList]);

//   const applyForJob = async (jobId) => {
//     if (!user || !token) {
//       alert("You must be logged in to apply.");
//       return;
//     }

//     try {
//       const response = await GlobalAPI.applyForJob(jobId, user.id, token);
//       console.log("userId", user.id, "jobId", jobId);
//       alert("Successfully applied to the job!");
//     } catch (error) {
//       console.error("Error applying for job:", error);
//       alert("Failed to apply for the job.");
//     }
//   };

//   const handleFilterChange = (filterName, value) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [filterName]: value !== undefined ? value : !prevFilters[filterName],
//     }));
//   };


// /////////////////////////////////////////////////////////////////////////////////////////////////
//   // const handleFilterChange = (filterName) => {
//   //   setFilters((prevFilters) => ({
//   //     ...prevFilters,
//   //     [filterName]: !prevFilters[filterName],
//   //     // [filterName]: value !== undefined ? value : !prevFilters[filterName],
//   //   }));
//   // };

//   const handleSearchChange = (event) => {
//     const { name, value } = event.target;
//     setSearchQuery((prevQuery) => ({
//       ...prevQuery,
//       [name]: value,
//     }));
//   };

//   const applyFilters = () => {
//     // console.log("Job list before filtering:", jobList);
//     // console.log("Current filters:", filters); 
//     let filteredJobs = jobList;

//     // Apply filter conditions
//     if (filters.fullTime) {
//       filteredJobs = filteredJobs.filter((job) => job.attributes.jobType === "Full-Time");
//     }
//     if (filters.partTime) {
//       filteredJobs = filteredJobs.filter((job) => job.attributes.jobType === "Part-Time");
//     }
//     if (filters.permanent) {
//       filteredJobs = filteredJobs.filter((job) => job.attributes.jobType === "Permanent");
//     }
//     if (filters.contractual) {
//       filteredJobs = filteredJobs.filter((job) => job.attributes.jobType === "Contractual");
//     }
//     if (filters.educationBScAssociate) {
//       filteredJobs = filteredJobs.filter((job) => job.attributes.education === "BSc. 2 Year Associate Degree");
//       console.log("Filtered by BSc. 2 Year Associate Degree:", filteredJobs);
//     }
//     if (filters.educationBachelorsCS) {
//       filteredJobs = filteredJobs.filter((job) => job.attributes.education === "Bachelors in CS/SE");
//       console.log("Filtered by Bachelors in CS/SE:", filteredJobs);
//     }
//     if (filters.educationBachelorsBusiness) {
//       filteredJobs = filteredJobs.filter((job) => job.attributes.education === "Bachelors in Business Administration");
//       console.log("Filtered by Bachelors in Business Administration", filteredJobs);
//     }
//     if (filters.educationMastersBusiness) {
//       filteredJobs = filteredJobs.filter((job) => job.attributes.education === "Masters in Busniess Administration");
//       console.log("Filtered by Masters in Business Administration", filteredJobs);
//     }
//     if (filters.educationBachelorsProjectMgmt) {
//       filteredJobs = filteredJobs.filter((job) => job.attributes.education === "Bachelors in Project Management");
//       console.log("Filtered by Bachelors in Project Management", filteredJobs);
//     }
//     // Apply search query
//     const { keyword, location } = searchQuery;
//     if (keyword) {
//       filteredJobs = filteredJobs.filter((job) =>
//         job.attributes.title.toLowerCase().includes(keyword.toLowerCase())
//       );
//     }
//     if (location) {
//       filteredJobs = filteredJobs.filter((job) =>
//         job.attributes.location.toLowerCase().includes(location.toLowerCase())
//       );
//     }
//     // Apply experience filters
//     if (filters.experienceJunior) {
//       filteredJobs = filteredJobs.filter((job) => job.attributes.experience === "Junior");
//     }
//     if (filters.experienceMidLevel) {
//       filteredJobs = filteredJobs.filter((job) => job.attributes.experience === "Mid-Level");
//     }
//     if (filters.experienceSenior) {
//       filteredJobs = filteredJobs.filter((job) => job.attributes.experience === "Senior");
//     }
//       // Apply Salary Range Filter
//     if (filters.minSalary) {
//       filteredJobs = filteredJobs.filter((job) =>
//         parseInt(job.attributes.salary) >= parseInt(filters.minSalary)
//       );
//     }
//     if (filters.maxSalary) {
//       filteredJobs = filteredJobs.filter((job) =>
//         parseInt(job.attributes.salary) <= parseInt(filters.maxSalary)
//       );
//     }
//     // console.log("Filtered jobs:", filteredJobs); // Log filtered jobs
//     setJobs(filteredJobs);

//     const stats = calculateJobStats(filteredJobs);
//     setJobStats(stats);
//   };

//   const handleSearch = (event) => {
//     event.preventDefault();
//     applyFilters();
//     // console.log(filters);
//   };

//   return (
//     <>
//     <section className="py-8">
//       <h1 className="text-4xl text-center font-bold mb-8">
//         Find your next <br /> dream job
//       </h1>

//       <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <Sidebar filters={filters} onFilterChange={handleFilterChange} />
//         <div className="lg:col-span-2">
//           {/* Search form */}
//           <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-md mx-auto">
//              <input
//                name="keyword"
//                type="search"
//                className="border border-gray-400 rounded-md px-2 py-2 w-full"
//                placeholder="Job title or keyword.."
//                value={searchQuery.keyword}
//                onChange={handleSearchChange}
//              />
//              <input
//                name="location"
//                type="search"
//                className="border border-gray-400 rounded-md px-2 py-2 w-full"
//                placeholder="Location.."
//                value={searchQuery.location}
//                onChange={handleSearchChange}
//                />
//                <button className="bg-blue-600 text-white rounded-md px-4 py-2" type="submit">
//                  Search
//                </button>
//              </form>
//              <div className="text-center mb-6">
//                 <p>Total Jobs: {jobStats.totalJobs}</p>
//                 <p>Average Salary: ${jobStats.averageSalary.toFixed(2)}</p>
//                 <p>Min Salary: ${jobStats.minSalary}</p>
//                 <p>Max Salary: ${jobStats.maxSalary}</p>
//               </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {jobs.map((job) => {
//               const deadlinePassed = new Date(job.attributes.expiary_date) < new Date();

//               return (
//                 <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
//                   <h3 className="text-xl font-bold">{job.attributes.title}</h3>
//                   <p className="text-gray-700">
//                     {job.attributes.company} - {job.attributes.location} - {job.attributes.jobType}
//                   </p>
//                   <p className="text-gray-700">{job.attributes.description}</p>
//                   <p className="text-red-500 font-bold">
//                     Deadline: {new Date(job.attributes.expiary_date).toLocaleDateString()}
//                   </p>
//                   <p className="text-gray-700">{job.attributes.salary}</p>

//                   <button
//                     className={`mt-4 px-4 py-2 rounded ${
//                       deadlinePassed ? "bg-gray-400" : "bg-blue-600 text-white"
//                     }`}
//                     onClick={() => {
//                       // console.log("Button clicked", job.id, user.id);
//                       applyForJob(job.id, user.id, token)

//                     }}
//                     disabled={deadlinePassed}
//                   >
//                     {deadlinePassed ? "Deadline Passed" : "Apply Now"}
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//     </>
//   );
// }


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