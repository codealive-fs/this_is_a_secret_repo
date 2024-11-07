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
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "../_context/AuthContext";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import TiptapEditor from '../_utils/TiptapEditor'; // Adjust the import path as needed


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
  // const [description, setDescription] = useState(""); 
  const [formData, setFormData] = useState({
    title: '',
    salary: '',
    expiaryDate: '',
    jobType: '',
    education: '',
    experience: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const {user, token} = useAuthContext();
  

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
      // console.log("response's Array=======>", appliedUsers);
      setAppliedUsers(appliedUsers); // Assuming the response contains an array of applied users
    } catch (error) {
      console.error("Error fetching applied users:", error);
    }
  };

  const handleDeleteClick = (job) => {
    setSelectedJob(job);
    setOpenAlertDialog(true);  // Open the Alert Dialog
  };


const confirmDelete = async () => {
  if (selectedJob && token) {
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
    experience: job.experience,
    description: job.description || '<p></p>', // Provide default empty HTML content
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
    console.log("Form Data Before Update:", formData); // Add this line to verify form data
    try {
      console.log("Submitting form data:", formData); // Add this to debug

      await GlobalAPI.editJob(
        editingJob, 
        formData.title, 
        formData.salary, 
        formData.expiaryDate, 
        formData.jobType, 
        formData.education, 
        formData.experience, 
        formData.description, 
        userCompanyId,
        user.id, 
        token
      );
      toast.success("Job updated successfully!");
       // Update the displayed job list after successful edit
       setPostedJobs((prevJobs) =>
         prevJobs.map((job) =>
           job.id === editingJob ? { ...job, ...formData } : job
         )
       );
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
                <CardHeader className="flex flex-row justify-between items-center">
                   {/* Job's Title */}
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  {/* <div className="flex space-x-2 ml-auto"> */}
                    {/* DialogTrigger to open edit dialog */}
                    <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                         {/* ------------------------------EDIT BUTTON (Dialog)------------------------------ */}
                             <button onClick={() => handleEditClick(job)} className="flex items-center text-black hover:text-zinc-900">
                             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                             </button>
                          </DialogTrigger>
                          <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Job</DialogTitle>
                                <DialogDescription>Update the job details below.</DialogDescription>
                              </DialogHeader>
                              <form onSubmit={(e) => { e.preventDefault(); handleUpdateJob(); }} className="overflow-scroll">
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
                                <div>
                                <Label htmlFor="description">Job Description</Label>
                                <TiptapEditor 
                                  value={formData.description}
                                  onChange={(newContent) => {
                                    setFormData(prev => ({
                                      ...prev,
                                      description: newContent
                                    }));
                                  }}
                                />
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-round"><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>
                               </button>
                              </DialogTrigger>
                              <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Applied Users for {job.title}</DialogTitle>
                                    <DialogDescription>
                                      Below is the list of users who have applied for this job.
                                    </DialogDescription>
                                  </DialogHeader>
                                     
                              <div className="max-h-96 overflow-y-auto">
                                 {appliedUsers.length > 0 ? (
                                  <Table className="min-w-full table-auto border-collapse">
                                    {/* <TableCaption>A list of users who applied</TableCaption> */}
                                    <TableHeader>
                                       <TableRow className="bg-gray-100 text-left">
                                           <TableHead className="px-4 py-1 text-gray-800">Profile</TableHead>
                                           <TableHead className="px-4 py-1 text-gray-800">Name</TableHead>
                                           <TableHead className="px-4 py-1 text-gray-800">Email</TableHead>
                                           <TableHead className="px-4 py-1 text-gray-800">Phone</TableHead>
                                           <TableHead className="px-4 py-1 text-gray-800">Resume/CV</TableHead>
                                       </TableRow>
                                     </TableHeader>
                                     <TableBody>
                                         {appliedUsers.map((user) => (
                                          <TableRow key={user.id} className="border-b border-gray-200">
                                             <TableCell className="px-4 py-1">
                                                  <Image
                                                    src={
                                                   user?.attributes?.photo?.data?.attributes?.url ||
                                                   "/default-profile.png"
                                                 }
                                                 alt={`${user.attributes.fullName || "User"}'s profile picture`}
                                                 unoptimized={true}
                                                 width={40}
                                                 height={40}
                                                 className="rounded-full object-cover w-10 h-10"
                                               />
                                             </TableCell>
                                             <TableCell className="px-4 py-1 text-sm text-gray-800">
                                               {user.attributes.fullName || "N/A"}
                                             </TableCell>
                                             <TableCell className="px-4 py-1 text-gray-600">
                                               {user.attributes.email || "N/A"}
                                             </TableCell>
                                             <TableCell className="px-4 py-1 text-gray-600">
                                               {user.attributes.contact_number || "N/A"}
                                             </TableCell>
                                             <TableCell className="px-4 py-4 text-gray-600 flex justify-center">
                                               {user.attributes.cv?.data?.attributes?.url ? (
                                                   <a
                                                     href={user.attributes.cv.data.attributes.url}
                                                     download
                                                     className="text-gray-950 hover:text-gray-600 hover:underline hover:transition-all"
                                                     target="_blank" // Opens in a new tab
                                                     rel="noopener noreferrer"
                                                   >
                                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                                                   </a>
                                                 ) : (
                                                   <p className="text-gray-600 text-sm">N/A</p>
                                                 )}
                                             </TableCell>
                                          </TableRow>
                                         ))}
                                     </TableBody>
                                  </Table>
                                         ) : (
                                       <p className="text-gray-500">No users have applied yet.</p>
                                )}
                              </div>
                        </DialogContent>
                      </Dialog>
                    {/* ------------------------------DELETE BUTTON (Alert)------------------------------ */}
                       <button onClick={() => handleDeleteClick(job)} >
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="#9b0014" fill="none">
                           <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /> <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /> <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /> <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
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







