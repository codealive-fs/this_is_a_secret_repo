"use client"
import { useState, useEffect } from "react"
import GlobalAPI from "../_utils/GlobalAPI"
import JobRow from "./JobRow"
import { Button } from "@/components/ui/button"

export default function Jobs({jobList}){
    
const [jobs, setJobs] = useState([]);
useEffect(() => {
    getJobsList()
}, [])

const getJobsList = () => {
    GlobalAPI.getJobs().then(resp => {
        setJobs(resp.data)
        console.log(resp);
        
    })
};
    
return (
    <div className="bg-gray-500 py-4 rounded-lg">
        <div className="container ">
        <section className="py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Featured Jobs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Loop over jobs */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        {jobs.map((job) => (
                        <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold">{job.attributes.title}</h3>
                            <p className="text-gray-700">{job.attributes.company} - {job.attributes.location}</p>
                            <p className="text-gray-700">{job.attributes.description}</p>
                            <p className="text-red-500 font-bold">Deadline: {new Date(job.attributes.expiary_date).toLocaleDateString()}</p>
                            <Button className="mt-4">Apply Now</Button>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
        </section>
    </div>
    </div>
  );
    // return(
    //     <div className="bg-gray-500 py-4 rounded-lg">
    //         <div className="container ">
    //             <h3 className="font-bold mb-4 ">Recent Jobs</h3>
    //                 <div className="flex flex-col gap-3">
    //                 {jobs.map((job) => (
    //                         <JobRow 
    //                             key={job.id} 
    //                             title={job?.attributes?.title} 
    //                             company={job?.attributes?.company} 
    //                             // location={job.attributes.location} 
    //                             // jobType={job.attributes.jobType} 
    //                             // postedDate={job.attributes.postedDate} 
    //                         />
    //                     ))}
    //                 </div>
    //         </div>

    //     </div>
    // )
}