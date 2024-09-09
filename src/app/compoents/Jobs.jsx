"use client"
import { useState, useEffect } from "react"
import GlobalAPI from "../_utils/GlobalAPI"
import JobRow from "./JobRow"

export default function Jobs(){
    
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getJobsList()
    }, [])
    
    const getJobsList = () => {
        GlobalAPI.getJob().then(resp => {
            setJobs(resp.data.data)
        })
    }
    console.log("jobs", jobs);
    
    return(
        <div className="bg-gray-500 py-4 rounded-lg">
            <div className="container ">
                <h3 className="font-bold mb-4 ">Recent Jobs</h3>
                    <div className="flex flex-col gap-3">
                    {jobs.map((job) => (
                            <JobRow 
                                key={job.id} 
                                title={job?.attributes?.title} 
                                company={job?.attributes?.company} 
                                // location={job.attributes.location} 
                                // jobType={job.attributes.jobType} 
                                // postedDate={job.attributes.postedDate} 
                            />
                        ))}
                    </div>
            </div>

        </div>
    )
}