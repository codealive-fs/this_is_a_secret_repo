"use client"

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import GlobalApi from '@/app/_utils/GlobalApi';  

export default function RegisterCompany() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onRegisterCompany = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("jwt");
    const userId = user?.id;

    try {
      const result = await GlobalApi.registerCompany(name, address, location, userId, token);
      toast("Company registered successfully!");
      router.push("/"); // Redirect to home or company dashboard
    } catch (error) {
      toast.error("An error occurred while registering the company.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-20">
      <div className="flex flex-col bg-slate-100 border border-gray-200 p-10">
        <h2 className="font-bold text-4xl mb-3">Register Company</h2>
        <div className="flex flex-col w-full gap-5 mt-7">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Company Name"
          />
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Address"
          />
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="Location"
          />
          <Button onClick={onRegisterCompany} disabled={loading}>
            {loading ? "Registering..." : "Register Company"}
          </Button>
        </div>
      </div>
    </div>
  );
}