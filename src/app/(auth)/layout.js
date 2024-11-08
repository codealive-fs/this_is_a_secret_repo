// src/app/auth/layout.js
"use client";
import AuthHeader from "@/app/_components/AuthHeader";
import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({ children }) {
  return (
    <div>
      <AuthHeader />
      {children}
      <Toaster />
    </div>
  );
}