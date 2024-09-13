"use client"
import { useState, useEffect } from "react"
import GlobalApi from "@/lib/utils";


export default function Hero(){
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState({ keyword: "", location: "" });
  
    // const getJobsList = () => {
    //   const { keyword, location } = searchQuery;
    //   GlobalApi.getJobs(keyword, location).then((resp) => {
    //     setJobs(resp);
    //     console.log(resp);
    //   }).catch(error => console.error("Error fetching jobs:", error));
    // };
  
    // const handleSearch = (event) => {
    //   event.preventDefault();
    //   const form = event.target;
    //   setSearchQuery({
    //     keyword: form.keyword.value,
    //     location: form.location.value,
    //   });
    // };
    // const [jobs, setJobs] = useState([]);
    // const [searchQuery, setSearchQuery] = useState("");

    // useEffect(() => {
    //     getJobsList();
    // }, [searchQuery]);


    // const getJobsList = () => {
    //     GlobalApi.getJobs(searchQuery).then((resp) => {
    //         setJobs(resp);
    //         console.log(resp); // Assuming resp contains the job list
    //     }).catch(error => console.error("Error fetching jobs:", error));
    // };


    // const handleSearch = (event) => {
    //     event.preventDefault();
    //     setSearchQuery(event.target.value);
    // };

    return(
        <section className="py-12">
            <h1 className="text-4xl text-center font-bold">Find your next <br /> dream job</h1>
            {/* <p className="text-center text-gray-700">Lorem ipsum dolor sit amet consectetur,  voluptates laboriosam quae reiciendis libero repellat, id omnis iure aliquam sed! Nemo eligendi accusamus eum eos sapiente doloremque dolor.</p> */}
            <form className="flex gap-2 mt-4 max-w-md mx-auto">
                <input
                  name="keyword"
                  type="search"
                  className="border border-gray-400 rounded-md px-2 py-2 w-full"
                  placeholder="Job title or keyword.."
                  onChange={(e) => setSearchQuery({ ...searchQuery, keyword: e.target.value })}
                />
                {/* <input
                  name="location"
                  type="search"
                  className="border border-gray-400 rounded-md px-2 py-2 w-full"
                  placeholder="Location.."
                /> */}
                <button className="bg-blue-600 text-white rounded-md px-4 py-2" type="submit">Search</button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
        {/* {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p className="text-gray-700">{job.location}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Apply Now</button>
          </div> */}
        {/* ))} */}
      </div>
        </section>
    )
}