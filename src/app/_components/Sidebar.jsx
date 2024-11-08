"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Sidebar({ filters, onFilterChange }) {
  const handleCheckboxChange = (name, checked) => {
    console.log(`Filter toggled: ${name}, New state: ${checked}`);
    onFilterChange(name, checked);
  };

  const handleSalaryChange = (event) => {
    const { name, value } = event.target;
    const numericValue = value === "" ? "" : parseInt(value, 10);
    console.log(`${name}: ${numericValue}`);
    onFilterChange(name, numericValue);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-[18rem]">
      <h2 className="text-lg font-medium mb-4">Category</h2>
      <div className="space-y-1">
        <Label className="flex items-center font-normal">
          <Checkbox
            checked={filters.fullTime}
            onCheckedChange={(checked) => handleCheckboxChange("fullTime", checked)}
            className="mr-2"
          />
          Full-Time
        </Label>
        <Label className="flex items-center">
          <Checkbox
            checked={filters.partTime}
            onCheckedChange={(checked) => handleCheckboxChange("partTime", checked)}
            className="mr-2"
          />
          Part-Time
        </Label>
        <Label className="flex items-center">
          <Checkbox
            checked={filters.permanent}
            onCheckedChange={(checked) => handleCheckboxChange("permanent", checked)}
            className="mr-2"
          />
          Permanent
        </Label>
        <Label className="flex items-center">
          <Checkbox
            checked={filters.contractual}
            onCheckedChange={(checked) => handleCheckboxChange("contractual", checked)}
            className="mr-2"
          />
          Contractual
        </Label>
      </div>

      {/* Education Filters */}
      <h2 className="text-lg font-medium mt-6 mb-4">Education</h2>
      <div className="space-y-1">
        <Label className="flex items-center">
          <Checkbox
            checked={filters.educationBScAssociate}
            onCheckedChange={(checked) => handleCheckboxChange("educationBScAssociate", checked)}
            className="mr-2"
          />
          BSc. 2 Year Associate Deg.
        </Label>
        <Label className="flex items-center">
          <Checkbox
            checked={filters.educationBachelorsCS}
            onCheckedChange={(checked) => handleCheckboxChange("educationBachelorsCS", checked)}
            className="mr-2"
          />
          Bachelors in CS/SE
        </Label>
        <Label className="flex items-center">
          <Checkbox
            checked={filters.educationBachelorsBusiness}
            onCheckedChange={(checked) => handleCheckboxChange("educationBachelorsBusiness", checked)}
            className="mr-2"
          />
          Bachelors in Bus. Admin.
        </Label>
        <Label className="flex items-center">
          <Checkbox
            checked={filters.educationMastersBusiness}
            onCheckedChange={(checked) => handleCheckboxChange("educationMastersBusiness", checked)}
            className="mr-2"
          />
          Masters in Business Admin.
        </Label>
        <Label className="flex items-center">
          <Checkbox
            checked={filters.educationBachelorsProjectMgmt}
            onCheckedChange={(checked) => handleCheckboxChange("educationBachelorsProjectMgmt", checked)}
            className="mr-2"
          />
          Bachelors in Project Manag.
        </Label>
      </div>

      {/* Experience Filters */}
      <h2 className="text-lg font-medium mt-6 mb-4">Experience</h2>
      <div className="space-y-1">
        <Label className="flex items-center">
          <Checkbox
            checked={filters.experienceJunior}
            onCheckedChange={(checked) => handleCheckboxChange("experienceJunior", checked)}
            className="mr-2"
          />
          Junior (0-2 years)
        </Label>
        <Label className="flex items-center">
          <Checkbox
            checked={filters.experienceMidLevel}
            onCheckedChange={(checked) => handleCheckboxChange("experienceMidLevel", checked)}
            className="mr-2"
          />
          Mid-Level (3-5 years)
        </Label>
        <Label className="flex items-center">
          <Checkbox
            checked={filters.experienceSenior}
            onCheckedChange={(checked) => handleCheckboxChange("experienceSenior", checked)}
            className="mr-2"
          />
          Senior (5+ years)
        </Label>
      </div>

      {/* Salary Filters */}
      <h2 className="text-lg font-medium mt-6 mb-4">Salary Range</h2>
      <div className="space-y-2">
        <Label className="flex items-center">
          <span className="mr-2">Min Salary:</span>
          <input
            type="number"
            name="minSalary"
            value={filters.minSalary || ''}
            onChange={handleSalaryChange}
            className="border border-gray-400 rounded-md px-2 py-1 w-full"
          />
        </Label>
        <Label className="flex items-center">
          <span className="mr-2">Max Salary:</span>
          <input
            type="number"
            name="maxSalary"
            value={filters.maxSalary || ''}
            onChange={handleSalaryChange}
            className="border border-gray-400 rounded-md px-2 py-1 w-full"
          />
        </Label>
      </div>
    </div>
  );
}


///////////////////////////////////////////////////////////////////////////////////////////////////////
// "use client";
// import { Checkbox } from "@/components/ui/checkbox"


// export default function Sidebar({ filters, onFilterChange }) {
//   const handleCheckboxChange = (event) => {
//     const { name } = event.target;
//     console.log(`Filter toggled: ${name}, New state: ${event.target.checked}`);
//     onFilterChange(name);
//   };

//   const handleSalaryChange = (event) => {
//     const { name, value } = event.target;
  
//     // Convert input value to a number, but if it's empty, use an empty string.
//     const numericValue = value === "" ? "" : parseInt(value, 10);
  
//     console.log(`${name}: ${numericValue}`); // Log the updated value for debugging
//     onFilterChange(name, numericValue); // Pass the numeric value to the filter
//   };


// ///////////////////////////////////////////////////////////////////////////////////////////////
//   // const handleSalaryChange = (event) => {
    
//   //   const { name, value } = event.target;
//   //   console.log(`${name}: ${value}`); // This will log the input name and value
//   //   onFilterChange(name, value); // Pass both the name of the filter and the new value
//   // };

//   return (
//     <div className="bg-gray-100 p-6 rounded-lg shadow-md w-[18rem]">
//       <h2 className="text-lg font-medium mb-4">Category</h2>
//       <div className="space-y-1">
//         <label className="flex items-center font-normal">
//           <input
//             type="checkbox"
//             name="fullTime"
//             checked={filters.fullTime}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           Full-Time
//         </label>
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="partTime"
//             checked={filters.partTime}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           Part-Time
//         </label>
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="permanent"
//             checked={filters.permanent}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           Permanent
//         </label>
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="contractual"
//             checked={filters.contractual}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           Contractual
//         </label>
//       </div>
      
//       {/* Education Filters */}
//       <h2 className="text-lg font-medium mt-6 mb-4">Education</h2>
//       <div className="space-y-1">
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="educationBScAssociate"
//             checked={filters.educationBScAssociate}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           BSc. 2 Year Associate Deg.
//         </label>
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="educationBachelorsCS"
//             checked={filters.educationBachelorsCS}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           Bachelors in CS/SE
//         </label>
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="educationBachelorsBusiness"
//             checked={filters.educationBachelorsBusiness}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           Bachelors in Bus. Admin.
//         </label>
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="educationMastersBusiness"
//             checked={filters.educationMastersBusiness}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           Masters in Business Admin.
//         </label>
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="educationBachelorsProjectMgmt"
//             checked={filters.educationBachelorsProjectMgmt}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           Bachelors in Project Manag.
//         </label>
//       </div> 
      
//     {/* Experience Filters */}
//            <h2 className="text-lg font-medium mt-6 mb-4">Experience</h2>
//       <div className="space-y-1">
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="experienceJunior"
//             checked={filters.experienceJunior}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           Junior (0-2 years)
//         </label>
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="experienceMidLevel"
//             checked={filters.experienceMidLevel}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           Mid-Level (3-5 years)
//         </label>
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="experienceSenior"
//             checked={filters.experienceSenior}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           Senior (5+ years)
//         </label>
//       </div>    
//       {/* Salary Filters */}
//       <h2 className="text-lg font-medium mt-6 mb-4">Salary Range</h2>
//       <div className="space-y-2">
//         <label className="flex items-center">
//           <span className="mr-2">Min Salary:</span>
//           <input
//             type="number"
//             name="minSalary"
//             value={filters.minSalary || ''}
//             onChange={handleSalaryChange}
//             className="border border-gray-400 rounded-md px-2 py-1 w-full"
//           />
//         </label>
//         <label className="flex items-center">
//           <span className="mr-2">Max Salary:</span>
//           <input
//             type="number"
//             name="maxSalary"
//             value={filters.maxSalary || ''}
//             onChange={handleSalaryChange}
//             className="border border-gray-400 rounded-md px-2 py-1 w-full"
//           />
//         </label>
//       </div> 
//     </div>
//   );
// }















//////////////////////////////////////////////////////////////////////////////
// "use client"

// export default function Sidebar({ filters, onFilterChange }) {
//   const handleCheckboxChange = (event) => {
//     const { name } = event.target;
//     onFilterChange(name);
//   };

//   return (
//     <div className="bg-gray-100 p-6 rounded-lg shadow-md w-64">
//       <h2 className="text-lg font-medium mb-4">Filter by Category</h2>
//       <div className="space-y-4">
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="fullTime"
//             checked={filters.fullTime}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           Full-Time
//         </label>
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="partTime"
//             checked={filters.partTime}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           Part-Time
//         </label>
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="permanent"
//             checked={filters.permanent}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           Permanent
//         </label>
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="contractual"
//             checked={filters.contractual}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           Contractual
//         </label>
//       </div>
//       <br />
//     </div>
//   );
// }







