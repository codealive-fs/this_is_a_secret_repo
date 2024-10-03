"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import GlobalApi from '@/app/_utils/GlobalApi';  
import { toast } from "sonner";

export default function UpdateProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [cv, setCV] = useState(null); // New state for CV file
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      console.log("Fetched username: ", user.username);
      console.log("Fetched email: ", user.email);
    }
  }, []);

  // Handle file change for CV
  const onFileChange = (e) => {
    setCV(e.target.files[0]);  // Update the state with the selected CV file
    console.log(cv);
  };

  const onUpdateProfile = async () => {
    setLoading(true);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("jwt");
    const userId = user?.id;

    try {
      let cvFileId = null;

      // If a CV is selected, upload it first
      if (cv) {
        const uploadedFiles = await GlobalApi.uploadCV(cv, token);  // New method to upload CV
        cvFileId = uploadedFiles[0]?.id;  // Get the file ID after upload
      }

      const updatedData = {
        username: username,
        email: email,
        cv: cvFileId  // Pass CV file ID to update profile
      };

      console.log("Updated Data: ", updatedData);

      // Call the API to update user profile
      const updatedUser = await GlobalApi.updateUserProfile(userId, updatedData, token);
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
      toast("Profile updated successfully!");
      router.push("/");
    } catch (error) {
      toast.error("An error occurred while updating the profile.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-20">
      <div className="flex flex-col bg-slate-100 border border-gray-200 p-10">
        <h2 className="font-bold text-4xl mb-3">Update Profile</h2>
        <div className="flex flex-col w-full gap-5 mt-7">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          {/* CV upload input */}
          <input type="file" onChange={onFileChange} accept=".pdf,.doc,.docx" />
          <Button onClick={onUpdateProfile} disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
}





