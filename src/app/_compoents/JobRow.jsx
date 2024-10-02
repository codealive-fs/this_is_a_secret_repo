
"use client";
import { Button } from "@/components/ui/button";

export function JobRow({ job }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold">{job.attributes.title}</h3>
      <p className="text-gray-700">
        {job.attributes.company} - {job.attributes.location} - {job.attributes.jobType}
      </p>
      <p className="text-gray-700">{job.attributes.description}</p>
      <p className="text-red-500 font-bold">
        Deadline: {new Date(job.attributes.expiary_date).toLocaleDateString()}
      </p>
      <p className="text-gray-700">{job.attributes.salary}</p>
      <Button className="mt-4">Apply Now</Button>
    </div>
  );
}
