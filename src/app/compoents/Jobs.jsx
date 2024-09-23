"use client"
// import JobRow from "./JobRow"
import { useContext } from "react";
import { JobsContext } from "../context/JobsContext";
import { Button } from "@/components/ui/button"
import { JobRow } from "./JobRow";

export default function Jobs(){
// export default function Jobs({ jobList }){

    const { jobs, loading } = useContext(JobsContext);

    if (loading) {
        return <div>Loading jobs...</div>;
      }
    // const jobs = jobList?.data || []; // Check if jobList exists and get the data array
    
    return (
        <div className="bg-gray-500 py-4 rounded-lg">
        <div className="container">
        <section className="py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Featured Jobs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Loop over jobs */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                         {/* Loop over jobs and use JobRow */}
                        {jobs.map((job) => (
                          <JobRow key={job.id} job={job} />
                        ))}
                        
                        {/* {jobs.map((job) => (
                            <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold">{job.attributes.title}</h3>
                            
                            <p className="text-gray-700">{job.attributes.company} - {job.attributes.location} - {job.attributes.jobType} </p>
                            <p className="text-gray-700">{job.attributes.description}</p>
                            <p className="text-red-500 font-bold">Deadline: {new Date(job.attributes.expiary_date).toLocaleDateString()}</p>
                            <p className="text-gray-700">{job.attributes.salary}</p>
                            <Button className="mt-4">Apply Now</Button> */}
                        </div>
                    {/* ))} */}
                    </div>
                </div>
        </section>
    </div>
    </div>
  );
}

// const [jobs, setJobs] = useState([]);
// useEffect(() => {
//     getJobsList()
// }, [])

// const getJobsList = () => {
//     GlobalAPI.getJobs().then(resp => {
//         setJobs(resp.data)
//         console.log(resp);
//     })
// };