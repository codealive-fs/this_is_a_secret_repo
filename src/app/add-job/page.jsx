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
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "../_context/AuthContext";


const jobTypes = ["Full-Time", "Part-Time", "Permanent", "Contractual"];
const educationTypes = [
      "BSc. 2 Year Associate Degree",
      "Bachelors in CS/SE",
      "Bachelors in Business Administration",
      "Masters in Busniess Administration",
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
  const [description, setDescription] = useState("");  // New state for description
  const [companyId, setCompanyId] = useState("");

  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const {user, token} = useAuthContext();
  const userId = user.id;

  useEffect(() => {
    if (user && token) {
      getUserCompany(user?.id, token);
    } else {
      console.error("User or token not found in localStorage");
    }
 });

const getUserCompany = async (userId, token) => {
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
    setLoading(true);
    try {
      const result = await GlobalApi.addJob(
        title,
        Number(salary),
        expiaryDate,
        jobType,
        education,
        experience,
        description,
        userId,
        companyId,
        token
      );
      toast.success("Job added successfully!");
      // router.reload();
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
            <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Job Title</Label>
            <Input 
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter job title"
              required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
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
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="expiaryDate">Expiry Date</Label>
              <Input
                id="expiaryDate"
                type="date"
                value={expiaryDate}
                onChange={(e) => setExpiaryDate(e.target.value)}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
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
            <div className="grid w-full items-center gap-1.5">
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
            <div className="grid w-full items-center gap-1.5">
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
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}  // Update description state
                placeholder="Enter job description"
                required
              />
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
