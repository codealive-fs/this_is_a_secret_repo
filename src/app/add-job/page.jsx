"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import GlobalApi from "../_utils/GlobalApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const jobTypes = ["Full-Time", "Part-Time", "Permanent", "Contractual"];
const educationTypes = [
  "BSc. 2 Year Associate Degree",
  "Bachelors in CS/SE",
  "Bachelors in Business Administration",
  "Masters in Business Administration",
  "Bachelors in Project Management",
];
const experienceLevels = ["Junior", "Mid-Level", "Senior"];

export default function AddJob() {
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [expiaryDate, setExpiaryDate] = useState("");
  const [jobType, setJobType] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("jwt");
  useEffect(() => {
    
    if (user && token) {
      getUserCompany(user?.id, token);
    } else {
      console.error("User or token not found in sessionStorage");
    }
 });
    
//  useEffect(() => {
//   // Log the companyId to check if it's set correctly
//   if (companyId) {
//     console.log("Company ID in state:", companyId);
//   }
// }, [companyId]
// )   
    

const getUserCompany = async (userId, token) => {
    // debugger
    try {
      const response = await GlobalApi.getUserCompany(userId, token);

      if (response && response.id) {
        console.log("Company ID fetched:", response.company.id);
        setCompanyId(response?.company?.id);
      } else {
        toast.error("No company associated with the user.");
      }
    } catch (error) {
      console.error("Error fetching company:", error);
      toast.error("Failed to fetch company data.");
    }
  };
  
  const onAddJob = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("jwt");
    const userId = user?.id;

    setLoading(true);
    try {
      const result = await GlobalApi.addJob(
        title,
        Number(salary),
        expiaryDate,
        jobType,
        education,
        experience,
        companyId,
        userId,
        token
      );
      toast.success("Job added successfully!");
      // router.push("/jobs");
    } catch (error) {
      toast.error("An error occurred while adding the job.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); onAddJob()}} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter job title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Enter salary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiaryDate">Expiry Date</Label>
              <Input
                id="expiaryDate"
                type="date"
                value={expiaryDate}
                onChange={(e) => setExpiaryDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type</Label>
              <Select onValueChange={(value) => setJobType(value)} required>
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
              <Select onValueChange={(value) => setEducation(value)} required>
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
              <Select onValueChange={(value) => setExperience(value)} required>
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Adding Job..." : "Add Job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////////////
// "use client";
// import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import GlobalApi from "../_utils/GlobalApi";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// export default function AddJob() {
//   const [formData, setFormData] = useState({
//     title: "",
//     salary: "",
//     expiaryDate: "",
//     jobType: "",
//     education: "",
//     experience: "",
//     companyId: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();
  
//   useEffect(() => {
//     const user = JSON.parse(sessionStorage.getItem("user"));
//     const token = sessionStorage.getItem("jwt");
//     console.log("user", user, "token", token);
    
//     if (user && token) {
//       // Fetch the company details using getUserCompany API
//       getUserCompany(user.id, token);
//     }
//   }, []);
//   // Function to fetch user's company details
//   const getUserCompany = async (userId, token) => {
//     console.log("Fetching company for user ID:", userId);
//     try {
//       const response = await GlobalApi.getUserCompany(userId, token);
//       console.log("getUserCompany API Response:", response);

//       if (response && response?.id) {
//         console.log("Fetched company ID:---------------->", response.id); // Add this line to log the companyId
//         setFormData((prev) => ({ ...prev, companyId: response.id }));
//       } else {
//         toast.error("No company associated with the user.");
//       }
//     } catch (error) {
//       console.error("Error fetching company:", error);
//       toast.error("Failed to fetch company data.");
//     }
//   };


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const onAddJob = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const user = JSON.parse(sessionStorage.getItem("user"));
//     const token = sessionStorage.getItem("jwt");
//     const userId = user?.id;

//     // Log formData to check all entered data before validation
//     console.log("formData---------------->", formData);

//     if (Object.values(formData).some((field) => field === "")) {
//       setError("All fields are required");
//       setLoading(false);
//       return;
//     }

//     try {
//       const result = await GlobalApi.addJob(
//         formData.title,
//         Number(formData.salary),
//         formData.expiaryDate,
//         formData.jobType,
//         formData.education,
//         formData.experience,
//         Number(formData.companyId),
//         userId,
//         token
//       );
//       toast.success("Job added successfully!");
//       router.push("/jobs");
//     } catch (error) {
//       let errorMessage = "An error occurred while adding the job.";
//       if (error.response) {
//         errorMessage = error.response.data.error?.message || errorMessage;
//       }
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <Card className="w-full max-w-2xl">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">Add New Job</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={onAddJob} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="title">Job Title</Label>
//               <Input
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 placeholder="Enter job title"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="salary">Salary</Label>
//               <Input
//                 id="salary"
//                 name="salary"
//                 type="number"
//                 value={formData.salary}
//                 onChange={handleInputChange}
//                 placeholder="Enter salary"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="expiaryDate">Expiry Date</Label>
//               <Input
//                 id="expiaryDate"
//                 name="expiaryDate"
//                 type="date"
//                 value={formData.expiaryDate}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="jobType">Job Type</Label>
//               <Select
//                 name="jobType"
//                 onValueChange={(value) => handleSelectChange("jobType", value)}
//                 required
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select job type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {jobTypes.map((type) => (
//                     <SelectItem key={type} value={type}>
//                       {type}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="education">Education</Label>
//               <Select
//                 name="education"
//                 onValueChange={(value) => handleSelectChange("education", value)}
//                 required
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select education level" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {educationTypes.map((type) => (
//                     <SelectItem key={type} value={type}>
//                       {type}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="experience">Experience Level</Label>
//               <Select
//                 name="experience"
//                 onValueChange={(value) => handleSelectChange("experience", value)}
//                 required
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select experience level" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {experienceLevels.map((level) => (
//                     <SelectItem key={level} value={level}>
//                       {level}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             {error && <p className="text-red-500">{error}</p>}
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Adding Job..." : "Add Job"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
