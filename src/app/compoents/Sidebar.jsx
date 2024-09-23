"use client";

export default function Sidebar({ filters, onFilterChange }) {
  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    console.log(`Filter toggled: ${name}, New state: ${event.target.checked}`);
    onFilterChange(name);
  };

  const handleSalaryChange = (event) => {
    
    const { name, value } = event.target;
    console.log(`${name}: ${value}`); // This will log the input name and value
    onFilterChange(name, value); // Pass both the name of the filter and the new value
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-[18rem]">
      <h2 className="text-lg font-medium mb-4">Category</h2>
      <div className="space-y-1">
        <label className="flex items-center font-normal">
          <input
            type="checkbox"
            name="fullTime"
            checked={filters.fullTime}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Full-Time
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="partTime"
            checked={filters.partTime}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Part-Time
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="permanent"
            checked={filters.permanent}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Permanent
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="contractual"
            checked={filters.contractual}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Contractual
        </label>
      </div>
      
      {/* Education Filters */}
      <h2 className="text-lg font-medium mt-6 mb-4">Education</h2>
      <div className="space-y-1">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="educationBScAssociate"
            checked={filters.educationBScAssociate}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          BSc. 2 Year Associate Deg.
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="educationBachelorsCS"
            checked={filters.educationBachelorsCS}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Bachelors in CS/SE
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="educationBachelorsBusiness"
            checked={filters.educationBachelorsBusiness}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Bachelors in Bus. Admin.
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="educationMastersBusiness"
            checked={filters.educationMastersBusiness}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Masters in Business Admin.
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="educationBachelorsProjectMgmt"
            checked={filters.educationBachelorsProjectMgmt}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Bachelors in Project Manag.
        </label>
      </div> 
      
    {/* Experience Filters */}
           <h2 className="text-lg font-medium mt-6 mb-4">Experience</h2>
      <div className="space-y-1">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="experienceJunior"
            checked={filters.experienceJunior}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Junior (0-2 years)
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="experienceMidLevel"
            checked={filters.experienceMidLevel}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Mid-Level (3-5 years)
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="experienceSenior"
            checked={filters.experienceSenior}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Senior (5+ years)
        </label>
      </div>    
      {/* Salary Filters */}
      <h2 className="text-lg font-medium mt-6 mb-4">Salary Range</h2>
      <div className="space-y-2">
        <label className="flex items-center">
          <span className="mr-2">Min Salary:</span>
          <input
            type="number"
            name="minSalary"
            value={filters.minSalary || ''}
            onChange={handleSalaryChange}
            className="border border-gray-400 rounded-md px-2 py-1 w-full"
          />
        </label>
        <label className="flex items-center">
          <span className="mr-2">Max Salary:</span>
          <input
            type="number"
            name="maxSalary"
            value={filters.maxSalary || ''}
            onChange={handleSalaryChange}
            className="border border-gray-400 rounded-md px-2 py-1 w-full"
          />
        </label>
      </div> 
    </div>
  );
}















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







