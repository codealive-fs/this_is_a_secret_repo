"use client";
import { useEffect, useState } from "react";
import GlobalAPI from "../_utils/GlobalApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import Image from "next/image";

const jobTypes = ["Full-Time", "Part-Time", "Permanent", "Contractual"];
const educationTypes = [
  "BSc. 2 Year Associate Degree",
  "Bachelors in CS/SE",
  "Bachelors in Business Administration",
  "Masters in Business Administration",
  "Bachelors in Project Management",
];
const experienceLevels = ["Junior", "Mid-Level", "Senior"];

function AddedJobs() {
  const [postedJobs, setPostedJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null); // Track which job is being edited
  const [userCompanyId, setUserCompanyId] = useState(null); // Store the user's companyId
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedUsers, setAppliedUsers] = useState([]); // State to hold the applied users
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    salary: '',
    expiaryDate: '',
    jobType: '',
    education: '',
    experience: ''
  });
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("jwt");


  useEffect(() => {
    const getPostedJobs = async () => {
      if (user && token) {
        try {
          const response = await GlobalAPI.getUserPostedJobs(user.id, token);
          const postedJobs = response.jobs;
          const userCompanyId = response.company.id;
          setUserCompanyId(userCompanyId); // Save the companyId
          setPostedJobs(postedJobs);
        } catch (error) {
          console.error("Error fetching posted jobs:", error);
        }
      }
    };
    getPostedJobs();
  }, [token]);

  const handleViewAppliedUsersClick = async (job) => {
    setSelectedJob(job);
    // Fetch the list of applied users for this job                       
    try {
      const response = await GlobalAPI.getAppliedUsers(job.id, token); // Call the API to get applied users
      const appliedUsers = response?.data?.attributes?.applied_users?.data
      console.log("response's Array=======>", appliedUsers);
      setAppliedUsers(appliedUsers); // Assuming the response contains an array of applied users
    } catch (error) {
      console.error("Error fetching applied users:", error);
    }
  };

  const handleDeleteClick = (job) => {
    setSelectedJob(job);
    setOpenAlertDialog(true);  // Open the Alert Dialog
  };

const confirmDelete = async (token) => {
  if (selectedJob) {
    try {
      await GlobalAPI.deleteJob(selectedJob.id, token);
      toast.success("Job deleted successfully!");
      setPostedJobs((prevJobs) => prevJobs.filter((job) => job.id !== selectedJob.id));
    } catch (error) {
      toast.error("Failed to delete job.");
      console.error("Error deleting job:", error);
    } finally {
      setOpenAlertDialog(false); // Close the Alert Dialog after delete
    }
  }
};

const handleEditClick = (job) => {
  setEditingJob(job.id); // Set the current job being edited
  setFormData({
    title: job.title,
    salary: job.salary,
    expiaryDate: job.expiaryDate,
    jobType: job.jobType,
    education: job.education,
    experience: job.experience
  });
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value
  });
};

const handleSelectChange = (name, value) => {
  setFormData({
    ...formData,
    [name]: value
  });
};

const handleUpdateJob = async () => {
  if (editingJob && token && userCompanyId) {
    setLoading(true);
    try {
      await GlobalAPI.editJob(
        editingJob, 
        formData.title, 
        formData.salary, 
        formData.expiaryDate, 
        formData.jobType, 
        formData.education, 
        formData.experience, 
        userCompanyId, 
        user.id, 
        token
      );
      toast.success("Job updated successfully!");
      setEditingJob(null); // Close the dialog after updating
      setLoading(false);
      // Optionally re-fetch posted jobs or update the UI
    } catch (error) {
      toast.error("Error updating job.");
      console.error("Error updating job:", error);
      setLoading(false);
    }
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Posted Jobs</h1>

      {postedJobs.length === 0 ? (
        <div className="text-center text-lg">No jobs posted yet.</div>
      ) : (
        <ul className="space-y-4">
          {postedJobs.map((job) => (
            <li key={job.id}>
              <Card>
                <CardHeader className="flex justify-between items-start">
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <div className="flex space-x-2 ml-auto">
                    {/* DialogTrigger to open edit dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                    {/* ------------------------------EDIT BUTTON (Dialog)------------------------------ */}
                        <button onClick={() => handleEditClick(job)} className="flex items-center text-black hover:text-zinc-900">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit">
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                          </svg>
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Job</DialogTitle>
                          <DialogDescription>Update the job details below.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdateJob(); }}>
                          <div className="space-y-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="salary">Salary</Label>
                            <Input id="salary" name="salary" value={formData.salary} onChange={handleInputChange} required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expiaryDate">Expiry Date</Label>
                            <Input id="expiaryDate" name="expiaryDate" type="date" value={formData.expiaryDate} onChange={handleInputChange} required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="jobType">Job Type</Label>
                            <Select onValueChange={(value) => handleSelectChange("jobType", value)} required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select job type" />
                              </SelectTrigger>
                              <SelectContent>
                                {jobTypes.map((type) => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="education">Education</Label>
                            <Select onValueChange={(value) => handleSelectChange("education", value)} required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select education level" />
                              </SelectTrigger>
                              <SelectContent>
                                {educationTypes.map((type) => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="experience">Experience Level</Label>
                            <Select onValueChange={(value) => handleSelectChange("experience", value)} required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                              <SelectContent>
                                {experienceLevels.map((level) => (
                                  <SelectItem key={level} value={level}>{level}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <DialogFooter>
                            <Button type="submit" disabled={loading}>
                              {loading ? 'Updating...' : 'Update Job'}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    {/* ------------------------------APPLIED USERS BUTTON (Dialog)------------------------------ */}
                    <Dialog>
                      <DialogTrigger asChild>
                         <button onClick={() => handleViewAppliedUsersClick(job)}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                   <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                   <path d="M11 7.5H17M8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                   <path d="M11 12H17M8 12C8 12.2761 7.77614 12.5 7.5 12.5C7.22386 12.5 7 12.2761 7 12C7 11.7239 7.22386 11.5 7.5 11.5C7.77614 11.5 8 11.7239 8 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                   <path d="M11 16.5H17M8 16.5C8 16.7761 7.77614 17 7.5 17C7.22386 17 7 16.7761 7 16.5C7 16.2239 7.22386 16 7.5 16C7.77614 16 8 16.2239 8 16.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                      </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Applied Users for {job.title}</DialogTitle>
                          <DialogDescription>
                            Below is the list of users who have applied for this job.
                          </DialogDescription>
                        </DialogHeader>
                        <ul className="mt-4">
                          {appliedUsers.length > 0 ? (
                            appliedUsers.map((user) => (
                              <li key={user.id} className="text-gray-700">
                                <Image 
                                    src={user?.attributes?.photo?.data?.attributes?.url}
                                    alt={`${user.attributes.fullName}'s profile picture`}
                                    unoptimized={true}
                                    width={23}
                                    height={23}
                                    /> 
                                {user.attributes.fullName} - {user.attributes.email} -{user.attributes.username}
                              </li>
                            ))
                          ) : (
                            <li>No users have applied yet.</li>
                          )}
                        </ul>
                      </DialogContent>
                    </Dialog>





                    {/* ------------------------------DELETE BUTTON (Alert)------------------------------ */}
                    <button onClick={() => handleDeleteClick(job)} >
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b0014" fill="none">
                           <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                           <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                           <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                           <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                       </svg>
                   </button>
                  </div>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-1">
                     <div className="text-gray-700">Salary: {job.salary}</div>
                     <div className="text-gray-700">Job Type: {job.jobType}</div>
                     <div className="text-gray-700">Published at: {job.publishedAt}</div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}

      {/* Alert Dialog for confirming delete */}
      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Job Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this job? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500">Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AddedJobs;





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// "use client";
// import { useEffect, useState } from "react";
// import GlobalAPI from "../_utils/GlobalApi";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import { DialogTrigger } from "@/components/ui/dialog";

// const jobTypes = ["Full-Time", "Part-Time", "Permanent", "Contractual"];
// const educationTypes = [
//   "BSc. 2 Year Associate Degree",
//   "Bachelors in CS/SE",
//   "Bachelors in Business Administration",
//   "Masters in Business Administration",
//   "Bachelors in Project Management",
// ];
// const experienceLevels = ["Junior", "Mid-Level", "Senior"];

// function AddedJobs() {
//   const [postedJobs, setPostedJobs] = useState([]);
//   const [editingJob, setEditingJob] = useState(null); // Track which job is being edited
//   const [userCompanyId, setUserCompanyId] = useState(null); // Store the user's companyId
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [openAlertDialog, setOpenAlertDialog] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     salary: '',
//     expiaryDate: '',
//     jobType: '',
//     education: '',
//     experience: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("jwt");



//   useEffect(() => {
//     const getPostedJobs = async () => {
//       if (user && token) {
//         try {
//           const response = await GlobalAPI.getUserPostedJobs(user.id, token);
//           const postedJobs = response.jobs;
//           const userCompanyId = response.company.id;
//           setUserCompanyId(userCompanyId); // Save the companyId
//           setPostedJobs(postedJobs);
//         } catch (error) {
//           console.error("Error fetching posted jobs:", error);
//         }
//       }
//     };
//     getPostedJobs();
//   }, [token]);

//   const handleDeleteClick = (job) => {
//     setSelectedJob(job);
//     setOpenAlertDialog(true);  // Open the Alert Dialog
//   };

//   const confirmDelete = async () => {
//     const token = localStorage.getItem("jwt");
//     if (selectedJob) {
//       try {
//         await GlobalAPI.deleteJob(selectedJob.id, token);
//         toast.success("Job deleted successfully!");

//         // Optionally, remove the job from the UI without refetching all jobs
//         setPostedJobs((prevJobs) => prevJobs.filter((job) => job.id !== selectedJob.id));
//       } catch (error) {
//         toast.error("Failed to delete job.");
//         console.error("Error deleting job:", error);
//       } finally {
//         setOpenAlertDialog(false); // Close the Alert Dialog after delete
//       }
//     }
//   };

//   const handleEditClick = (job) => {
//     setEditingJob(job.id); // Set the current job being edited
    
//     setFormData({
//       title: job.title,
//       salary: job.salary,
//       expiaryDate: job.expiaryDate,
//       jobType: job.jobType,
//       education: job.education,
//       experience: job.experience
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSelectChange = (name, value) => {
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleUpdateJob = async () => {
//     if (editingJob && token && userCompanyId) {
//       setLoading(true);
//       try {
//         await GlobalAPI.editJob(
//           editingJob, 
//           formData.title, 
//           formData.salary, 
//           formData.expiaryDate, 
//           formData.jobType, 
//           formData.education, 
//           formData.experience, 
//           userCompanyId, 
//           user.id, 
//           token
//         );
//         toast.success("Job updated successfully!");
//         setEditingJob(null); // Close the form after updating
//         setLoading(false);
//         // Optionally re-fetch posted jobs or update the UI
//       } catch (error) {
//         toast.error("Error updating job.");
//         console.error("Error updating job:", error);
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-semibold mb-6 text-center">Your Posted Jobs</h1>

//       {postedJobs.length === 0 ? (
//         <div className="text-center text-lg">No jobs posted yet.</div>
//       ) : (
//         <ul className="space-y-4">
//           {postedJobs.map((job) => (
//             <li key={job.id}>
//               <Card>
//                 <CardHeader className="flex justify-between items-start">
//                   <CardTitle className="text-xl">{job.title}</CardTitle>
//                   <div className="flex space-x-2 ml-auto">
//                     {/* <DialogTrigger asChild> */}
//                         <button onClick={() => handleEditClick(job)} className="flex items-center text-black hover:text-zinc-900">
//                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit">
//                             <path d="M12 20h9"></path>
//                             <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
//                           </svg>
//                         </button>
//                     {/* </DialogTrigger> */}
//                     <button onClick={() => handleDeleteClick(job)} >
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b0014" fill="none">
//                         <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
//                         <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
//                         <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
//                         <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
//                     </svg>
//                     </button>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-gray-700">Salary: {job.salary}</div>
//                   <div className="text-gray-700">Job Type: {job.jobType}</div>
//                   <div className="text-gray-700">Published at: {job.publishedAt}</div>
//                 </CardContent>
//                  {/* Alert Dialog */}
//                  {selectedJob && (
//                    <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
//                      <AlertDialogTrigger asChild>
//                        {/* The trigger can be any child element, in this case, we already triggered with delete button */}
//                      </AlertDialogTrigger>
//                      <AlertDialogContent>
//                        <AlertDialogHeader>
//                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                          <AlertDialogDescription>
//                            This action cannot be undone. This will permanently delete the job posting.
//                          </AlertDialogDescription>
//                        </AlertDialogHeader>
//                        <AlertDialogFooter>
//                          <AlertDialogCancel onClick={() => setOpenAlertDialog(false)}>
//                            Cancel
//                          </AlertDialogCancel>
//                          <AlertDialogAction onClick={confirmDelete} className="bg-red-800 text-white hover:bg-red-900 focus:ring-red-500">
//                             Remove
//                          </AlertDialogAction>
//                        </AlertDialogFooter>
//                      </AlertDialogContent>
//                    </AlertDialog>
//                  )}
//               </Card>

//               {/* Show the update form when a job is being edited */}
//               {editingJob === job.id && (
//                 <form className="mt-4" onSubmit={(e) => { e.preventDefault(); handleUpdateJob(); }}>
//                   <div className="space-y-2">
//                     <Label htmlFor="title">Job Title</Label>
//                     <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="salary">Salary</Label>
//                     <Input id="salary" name="salary" value={formData.salary} onChange={handleInputChange} required />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="expiaryDate">Expiry Date</Label>
//                     <Input id="expiaryDate" name="expiaryDate" type="date" value={formData.expiaryDate} onChange={handleInputChange} required />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="jobType">Job Type</Label>
//                     <Select onValueChange={(value) => handleSelectChange("jobType", value)} required>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select job type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {jobTypes.map((type) => (
//                           <SelectItem key={type} value={type}>{type}</SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="education">Education</Label>
//                     <Select onValueChange={(value) => handleSelectChange("education", value)} required>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select education level" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {educationTypes.map((type) => (
//                           <SelectItem key={type} value={type}>{type}</SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="experience">Experience Level</Label>
//                     <Select onValueChange={(value) => handleSelectChange("experience", value)} required>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select experience level" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {experienceLevels.map((level) => (
//                           <SelectItem key={level} value={level}>{level}</SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <Button type="submit" className="w-full mt-4" disabled={loading}>
//                     {loading ? "Updating Job..." : "Update Job"}
//                   </Button>
//                 </form>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default AddedJobs;






//////////////////////////////////
/////////////////////////////////////
////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// "use client";
// import { useEffect, useState } from "react";
// import GlobalAPI from "../_utils/GlobalApi";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button"; // Import necessary UI components
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";  
// import { Label } from "@/components/ui/label";

// const jobTypes = ["Full-Time", "Part-Time", "Permanent", "Contractual"];
// const educationTypes = [
//   "BSc. 2 Year Associate Degree",
//   "Bachelors in CS/SE",
//   "Bachelors in Business Administration",
//   "Masters in Business Administration",
//   "Bachelors in Project Management",
// ];
// const experienceLevels = ["Junior", "Mid-Level", "Senior"];


// function AddedJobs() {
//   const [postedJobs, setPostedJobs] = useState([]);
//   const [editingJob, setEditingJob] = useState(null); // Track which job is being edited
//   const [userCompanyId, setUserCompanyId] = useState(null); // Store the user's companyId
//   const [formData, setFormData] = useState({
//     title: '',
//     salary: '',
//     expiaryDate: '',
//     jobType: '',
//     education: '',
//     experience: ''
//   });

//   const user = JSON.parse(sessionStorage.getItem("user"));
//   const token = sessionStorage.getItem("jwt");

//   useEffect(() => {
//     const getPostedJobs = async () => {
//       if (user && token) {
//         try {
//           const response = await GlobalAPI.getUserPostedJobs(user.id, token);
//           const postedJobs = response.jobs;
//           const userCompanyId = response.company.id;
//           console.log("userCompanyId-------->", userCompanyId); // consoles 4 (which is the user's companyId)
//           setUserCompanyId(userCompanyId); // Save the companyId
//           setPostedJobs(postedJobs);
//         } catch (error) {
//           console.error("Error fetching posted jobs:", error);
//         }
//       }
//     };
//     getPostedJobs();
//   }, [token]);

//   const handleEditClick = (job) => {
//     setEditingJob(job.id); // Set the current job being edited
//     setFormData({
//       title: job.title,
//       salary: job.salary,
//       expiaryDate: job.expiaryDate,
//       jobType: job.jobType,
//       education: job.education,
//       experience: job.experience
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleUpdateJob = async () => {
//     if (editingJob && token && userCompanyId) {
//       try {
//         await GlobalAPI.editJob(
//           editingJob, 
//           formData.title, 
//           formData.salary, 
//           formData.expiaryDate, 
//           formData.jobType, 
//           formData.education, 
//           formData.experience, 
//           userCompanyId, 
//           user.id, 
//           token
//         );
//         setEditingJob(null); // Close the form after updating
//         // Refresh the posted jobs after update (Optional: Implement a new fetch)
//       } catch (error) {
//         console.error("Error updating job:", error);
//       }
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-semibold mb-6 text-center">Your Posted Jobs</h1>

//       {postedJobs.length === 0 ? (
//         <div className="text-center text-lg">No jobs posted yet.</div>
//       ) : (
//         <ul className="space-y-4">
//           {postedJobs.map((job) => (
//             <li key={job.id}>
//               <Card>
//                 <CardHeader className="flex justify-between items-start">
//                   <CardTitle className="text-xl">{job.title}</CardTitle>
//                   <div className="flex space-x-2 ml-auto">
//                     <button onClick={() => handleEditClick(job)} className="flex items-center text-black hover:text-zinc-900">
//                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit">
//                         <path d="M12 20h9"></path>
//                         <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
//                       </svg>
//                     </button>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <CardDescription className="text-gray-700">Salary: {job.salary}</CardDescription>
//                   <CardDescription className="text-gray-700">Job Type: {job.jobType}</CardDescription>
//                   <CardDescription className="text-gray-700">Published at: {job.publishedAt}</CardDescription>
//                 </CardContent>
//               </Card>

//               {/* Show the update form when a job is being edited */}
//               {editingJob === job.id && (
//                 <form className="mt-4">
//                   <Label htmlFor="title">Job Title</Label>
//                   <Input id="title" name="title" value={formData.title} onChange={handleInputChange} />
//                   <Label htmlFor="salary">Salary</Label>
//                   <Input id="salary" name="salary" value={formData.salary} onChange={handleInputChange} />
//                   <Label htmlFor="expiaryDate">Expiry Date</Label>
//                   <Input id="expiaryDate" type="date" name="expiaryDate" value={formData.expiaryDate} onChange={handleInputChange} />
                  
//                   {/* Job Type */}
//                   <Label htmlFor="jobType">Job Type</Label>
//                   <Select onChange={handleInputChange} required value={formData.jobType}>
//                     <SelectTrigger>
//                       <SelectValue placeholder={job.jobType} />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {jobTypes.map((type) => (
//                         <SelectItem key={type} value={type}>{type}</SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   {/* <Input id="jobType" name="jobType" value={formData.jobType} onChange={handleInputChange} /> */}
                  
//                   {/* Education */}
//                   <Label htmlFor="education">Education</Label>
//                   <Select onChange={handleInputChange} required value={formData.education}>
//                     <SelectTrigger>
//                       <SelectValue placeholder={job.jobType} />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {educationTypes.map((type) => (
//                         <SelectItem key={type} value={type}>{type}</SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   {/* <Input id="education" name="education" value={formData.education} onChange={handleInputChange} /> */}
                  
//                   {/* Experience */}
//                   <Label htmlFor="experience">Experience</Label>
//                   {/* <Input id="experience" name="experience" value={formData.experience} onChange={handleInputChange} /> */}
//                   <Select onChange={handleInputChange} required value={formData.experience}>
//                     <SelectTrigger>
//                       <SelectValue placeholder={job.experience} />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {experienceLevels.map((level) => (
//                         <SelectItem key={level} value={level}>{level}</SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <Button onClick={handleUpdateJob} className="mt-4">Update Job</Button>
//                 </form>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default AddedJobs;



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// "use client";
// import { useEffect, useState } from "react";
// import GlobalAPI from "../_utils/GlobalApi"; // Import GlobalAPI
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


// function AddedJobs() {
//   const [postedJobs, setPostedJobs] = useState([]);

//   const user = JSON.parse(sessionStorage.getItem("user"));
  
//   const token = sessionStorage.getItem("jwt");

//   useEffect(() => {
//     const getPostedJobs = async () => {
//       if (user && token) {
//         try {
//           const response = await GlobalAPI.getUserPostedJobs(user.id, token);
//           const postedJobs = response.jobs;
//           const userCompanyId = response.company.id;
//           console.log("userCompanyId-------->", userCompanyId); // consoles 4 (which is the user's companyId)
//           setPostedJobs(postedJobs);
//         } catch (error) {
//           console.error("Error fetching posted jobs:", error);
//         }
//       }
//     };
//     getPostedJobs();
//   }, [token]);

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-semibold mb-6 text-center">Your Posted Jobs</h1>

//       {postedJobs.length === 0 ? (
//         <div className="text-center text-lg">No jobs posted yet.</div>
//       ) : (
//         <ul className="space-y-4">
//           {postedJobs.map((job) => (
//             <li key={job.id}>
//               <Card>
//                 <CardHeader className="flex justify-between items-start">
//                   <CardTitle className="text-xl">{job.title}</CardTitle>
//                   <div className="flex space-x-2 ml-auto">
//                   <button className="flex items-center text-black hover:text-zinc-900">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit">
//                       <path d="M12 20h9"></path>
//                       <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
//                   </svg>
//                     {/* <span className="ml-2">Edit</span> */}
//                   </button>
//                   <button className="flex items-center text-black hover:text-zinc-900">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
//                       <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
//                       <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
//                       <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
//                       <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
//                   </svg>
//                   </button>

//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <CardDescription className="text-gray-700">Salary: {job.salary}</CardDescription>
//                   <CardDescription className="text-gray-700">Job Type: {job.jobType}</CardDescription>
//                   <CardDescription className="text-gray-700">Published at: {job.publishedAt}</CardDescription>
//                 </CardContent>
//                 <CardFooter>
//                   {/* You can add a button or any other relevant footer content here */}
//                   <p className="text-gray-500">Job ID: {job.id}</p>
//                   {/* <Button>Edit</Button> */}

                  
//                 </CardFooter>
//               </Card>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default AddedJobs;
