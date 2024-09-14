"use client";
import { useState } from "react";

export default function Hero({ jobList }) {
  const [jobs, setJobs] = useState(jobList || []);
  const [searchQuery, setSearchQuery] = useState({ keyword: "", location: "" });

  const getJobsList = () => {
    const { keyword, location } = searchQuery;

    if (keyword || location) {
      const filteredJobs = jobList.filter((job) =>
        job.attributes.title.toLowerCase().includes(keyword.toLowerCase()) &&
        (!location || job.attributes.location.toLowerCase().includes(location.toLowerCase()))
      );
      setJobs(filteredJobs);
    } else {
      setJobs(jobList);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    getJobsList();
  };

  return (
    <section className="py-12">
      <h1 className="text-4xl text-center font-bold">
        Find your next <br /> dream job
      </h1>
      <form onSubmit={handleSearch} className="flex gap-2 mt-4 max-w-md mx-auto">
        <input
          name="keyword"
          type="search"
          className="border border-gray-400 rounded-md px-2 py-2 w-full"
          placeholder="Job title or keyword.."
          onChange={(e) => setSearchQuery({ ...searchQuery, keyword: e.target.value })}
        />
        <input
          name="location"
          type="search"
          className="border border-gray-400 rounded-md px-2 py-2 w-full"
          placeholder="Location.."
          onChange={(e) => setSearchQuery({ ...searchQuery, location: e.target.value })}
        />
        <button className="bg-blue-600 text-white rounded-md px-4 py-2" type="submit">
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">{job.attributes.title}</h3>
            <p className="text-gray-700">{job.attributes.location}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}




