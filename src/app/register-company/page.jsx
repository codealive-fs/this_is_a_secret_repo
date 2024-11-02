"use client"

import React, { useState } from "react";
import { useAuthContext } from "../_context/AuthContext";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import GlobalApi from '@/app/_utils/GlobalApi';  

export default function RegisterCompany() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [logo, setLogo] = useState(null); // New state for profile picture
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {user, token, setUser} = useAuthContext();  

  const onProfilePicChange = (e) => {
    const file = e.target.files[0];
    console.log("File---------->", file);
    setLogo(file);  // Update the state with the selected profile picture file
  };

  const onRegisterCompany = async () => {
    setLoading(true);
    const userId = user?.id;

    if (!name || !address || !location) {
      toast.error("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      let logoId = null;
      if (logo) {
        const uploadedLogo = await GlobalApi.uploadProfilePic(logo, token);  // New method to upload profile picture
        logoId = uploadedLogo[0]?.id;  // Get the picture ID after upload
      }
    
      // Call the API to update user profile
      const companyData = await GlobalApi.registerCompany(name, address, location, userId, logoId, token);
       // Update user data in context and localStorage
       const updatedUser = {
        ...user,
        company: companyData.data // Assuming the company data is nested under 'data'
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast("company registered successfully!");
      router.push("/");
    } catch (error) {
      toast.error("An error occurred while registereing the company.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto my-20">
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl">Register Company</CardTitle>
      <CardDescription>
        Enter your company details to register
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="e.g., Acme Corporation, TechInnovate LLC"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="e.g., 123 Business Street"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="location">City/State</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          placeholder="e.g., San Francisco, CA"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="logo">Company's Logo</Label>
        <Input
          id="logo"
          type="file"
          accept="image/*"
          onChange={(onProfilePicChange)}
        />
      </div>
    </CardContent>
    <CardFooter>
      <Button 
        onClick={onRegisterCompany} 
        disabled={loading} 
        className="w-full"
      >
        {loading ? "Registering..." : "Register Company"}
      </Button>
    </CardFooter>
  </Card>
  );
}