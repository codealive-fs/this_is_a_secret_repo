// src/app/context/JobsContext.jsx
"use client";

import { createContext, useState, useEffect } from "react";
import GlobalApi from "../_utils/GlobalApi";

// Create the JobsContext
export const JobsContext = createContext();

// JobsProvider component to wrap the app and provide jobs data
export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch jobs from the API when the component mounts
    const fetchJobs = async () => {
      try {
        const jobList = await GlobalApi.getJobs();
        setJobs(jobList.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <JobsContext.Provider value={{ jobs, loading }}>
      {children}
    </JobsContext.Provider>
  );
};
//https://www.youtube.com/watch?v=Z1ptECjXGz8&t=9s
// //https://www.youtube.com/watch?v=Z1ptECjXGz8&t=9s