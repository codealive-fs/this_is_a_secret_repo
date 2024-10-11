"use client"
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { useAuthContext } from "@/app/_context/AuthContext";

function AddedJobs() {
  const { token } = useAuthContext(); // Retrieve the token from the context
  const [jobs, setJobs] = useState([]); // Store user's jobs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace this with the actual user ID from session storage or context
  const userId = JSON.parse(sessionStorage.getItem("user")).id;

  useEffect(() => {
    // Fetch the jobs posted by the user
    const fetchJobsAndApplications = async () => {
      try {
        setLoading(true);
        // Step 1: Fetch jobs posted by the user
        const userJobs = await GlobalApi.getUserPostedJobs(userId, token);

        // Step 2: Fetch applicants for each job and combine data
        const jobsWithApplicants = await Promise.all(
          userJobs.map(async (job) => {
            const jobApplications = await GlobalApi.getJobApplications(job.id, token);
            console.log("jobApplications==============>", jobApplications?.data.attributes?.job_application?.data);
            
            return {
              ...job, // Spread job data
              applicants: jobApplications.job_application.map(app => app.users_permissions_user), // Applicants from job applications
            };
          })
        );

        setJobs(jobsWithApplicants);
      } catch (err) {
        setError("Error fetching jobs or applicants");
        console.error("Error: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsAndApplications();
  }, [userId, token]);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Jobs You've Posted</h1>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id}>
            <h2>{job.title}</h2>
            <h3>Applicants:</h3>
            {job.applicants.length === 0 ? (
              <p>No applicants for this job.</p>
            ) : (
              <ul>
                {job.applicants.map((applicant) => (
                  <li key={applicant.id}>{applicant.username}</li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AddedJobs;
