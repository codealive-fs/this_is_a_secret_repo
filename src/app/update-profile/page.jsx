"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "../_context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";  // Ensure Label is correctly imported
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import GlobalApi from '@/app/_utils/GlobalApi';  
import { toast } from "sonner";

export default function UpdateProfile() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact_number, setContact_Number] = useState("");
  const [profilePic, setProfilePic] = useState(null); // New state for profile picture
  const [currentProfilePicUrl, setcurrentProfileURLPic] = useState(null);
  const [cv, setCV] = useState(null); // New state for CV file
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {user, token, setUser} = useAuthContext();  

  useEffect(() => {
    if (user && token) {
      GlobalApi.getUserPhoto(user.id, token)
          .then((response) => {
            setUsername(response?.username)
            setEmail(response?.email);
            setFullName(response?.fullName)
            setContact_Number(response?.contact_number)
            setcurrentProfileURLPic(response?.photo?.url); // Set profile picture URL            
          })
          .catch((error) => console.error('Error fetching the user', error));
    }
  }, [user, token]);

  // Handle file change for CV
  const onFileChange = (e) => {
    setCV(e.target.files[0]);  // Update the state with the selected CV file
  };

    // Handle file change for profile picture
    const onProfilePicChange = (e) => {
      const file = e.target.files[0];
      console.log("File---------->", file);
      setProfilePic(file);  // Update the state with the selected profile picture file
    };

  const onUpdateProfile = async () => {
    setLoading(true);
    const userId = user?.id;
    try {
      let cvFileId = null;
      let profilePicId = null;
      // If a CV is selected, upload it first
      if (cv) {
        const uploadedFiles = await GlobalApi.uploadCV(cv, token);  // New method to upload CV
        cvFileId = uploadedFiles[0]?.id;  // Get the file ID after upload
      }
      if (profilePic) {
        const uploadedPic = await GlobalApi.uploadProfilePic(profilePic, token);  // New method to upload profile picture
        profilePicId = uploadedPic[0]?.id;  // Get the picture ID after upload
      }
      const updatedData = {
        fullName: fullName,
        username: username,
        email: email,
        cv: cvFileId,  // Pass CV file ID to update profile
        profile_picture: profilePicId,  // Pass profile picture ID to update profile
        contact_number: contact_number 
      };
      // Call the API to update user profile
      const updatedUser = await GlobalApi.updateUserProfile(userId, updatedData, token);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
    <Card className="w-full max-w-md shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800">Update Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); onUpdateProfile(); }} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div>
            <Label htmlFor="contact_number">Contact Number</Label>
            <Input
              id="contact_number"
              type="text"
              value={contact_number}
              onChange={(e) => setContact_Number(e.target.value)}
              placeholder="Enter contact number"
            />
          </div>
          <div>
            <Label htmlFor="profilePic">Profile Picture</Label>
            {currentProfilePicUrl && (
              <div className="mb-4">
                <img
                  src={currentProfilePicUrl}
                  alt="Current Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
            <Input
              id="profilePic"
              type="file"
              accept="image/*"
              onChange={onProfilePicChange}
            />
          </div>
          <div>
            <Label htmlFor="cv">CV Upload</Label>
            <Input
              id="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={onFileChange}
            />
          </div>
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Updating Profile..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
  );
}










////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// "use client";
// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import GlobalApi from '@/app/_utils/GlobalApi';  
// import { toast } from "sonner";

// export default function UpdateProfile() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [cv, setCV] = useState(null); // New state for CV file
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const user = JSON.parse(sessionStorage.getItem('user'));
//     if (user) {
//       setUsername(user.username);
//       setEmail(user.email);
//       console.log("Fetched username: ", user.username);
//       console.log("Fetched email: ", user.email);
//     }
//   }, []);

//   const onFileChange = (e) => {
//     setCV(e.target.files[0]);  // Update the state with the selected CV file
//     console.log(cv);
    
//   };

//   const onUpdateProfile = async () => {
//     setLoading(true);
//     const user = JSON.parse(sessionStorage.getItem("user"));
//     const token = sessionStorage.getItem("jwt");
//     const userId = user?.id;
// ////////////////////////////////////////////////////////////////////////////////
//     const updatedData = {
//       username: username,
//       email: email,
//       cv: cv  // Ensure this is handled correctly
//     };
    
//     console.log("Updated Data: ", updatedData);  // Add this line to check values
// ///////////////////////////////////////////////////////////////////////////////////
//     // Create form data to send
//     const formData = new FormData();
//     formData.append('username', updatedData.username);
//     formData.append('email', updatedData.email);

//     if (updatedData.cv) {
//       formData.append('cv', updatedData.cv);
//     }

//     // Log each FormData field to verify values before sending
//     formData.forEach((value, key) => {
//       console.log(`${key}:`, value);
//     });
//     // formData.append("username", username);
//     // formData.append("email", email);
//     // if (cv) {
//     //   formData.append("cv", cv); // Append CV if selected
//     // }

//     // Call the GlobalApi function for updating the user profile
//     try {
      
//       const updatedUser = await GlobalApi.updateUserProfile(userId, updatedData, token);
//       // const updatedUser = await GlobalApi.updateUserProfile(userId, formData, token);
      
//       sessionStorage.setItem("user", JSON.stringify(updatedUser));
//       toast("Profile updated successfully!");
//       router.push("/");
//     } catch (error) {
//       toast.error("An error occurred while updating the profile.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center my-20">
//       <div className="flex flex-col bg-slate-100 border border-gray-200 p-10">
//         <h2 className="font-bold text-4xl mb-3">Update Profile</h2>
//         <div className="flex flex-col w-full gap-5 mt-7">
//           <Input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             type="text"
//             placeholder="Username"
//           />
//           <Input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             placeholder="Email"
//           />
//           {/* CV upload input */}
//           <input type="file" onChange={onFileChange} accept=".pdf,.doc,.docx" />
//           <Button onClick={onUpdateProfile} disabled={loading}>
//             {loading ? "Updating..." : "Update Profile"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }






//////////////////////////////////////////////////////////////////////////////
// "use client";
// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import GlobalApi from '@/app/_utils/GlobalApi';  // Importing the function from GlobalApi
// import { toast } from "sonner";

// export default function UpdateProfile() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     // Fetch user data from sessionStorage
//     const user = JSON.parse(sessionStorage.getItem('user'));
//     if (user) {
//       setUsername(user.username);
//       setEmail(user.email);
//     }
//   }, []);

//   const onUpdateProfile = async () => {
//     setLoading(true);

//     const user = JSON.parse(sessionStorage.getItem("user"));
//     const token = sessionStorage.getItem("jwt");
//     const userId = user?.id;

//     const updatedData = {
//       username: username,
//       email: email,
//     };

//     // Call the GlobalApi function for updating the user profile
//     try {
//       const updatedUser = await GlobalApi.updateUserProfile(userId, updatedData, token);
      
//       // Update sessionStorage with the new user data
//       sessionStorage.setItem("user", JSON.stringify(updatedUser));

//       toast("Profile updated successfully!");
//       router.push("/");  // Redirect to the home page or profile page
//     } catch (error) {
//       toast.error("An error occurred while updating the profile.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center my-20">
//       <div className="flex flex-col bg-slate-100 border border-gray-200 p-10">
//         <h2 className="font-bold text-4xl mb-3">Update Profile</h2>
//         <div className="flex flex-col w-full gap-5 mt-7">
//           <Input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             type="text"
//             placeholder="Username"
//           />
//           <Input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             placeholder="Email"
//           />
//           <Button onClick={onUpdateProfile} disabled={loading}>
//             {loading ? "Updating..." : "Update Profile"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
