"use client";

export default function Sidebar({ filters, onFilterChange }) {
  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    onFilterChange(name);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-64">
      <h2 className="text-lg font-medium mb-4">Filter by Category</h2>
      <div className="space-y-4">
        <label className="flex items-center">
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
      <h2 className="text-lg font-medium mt-6 mb-4">Filter by Education</h2>
      <div className="space-y-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="educationBScAssociate"
            checked={filters.educationBScAssociate}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          BSc. 2 Year Associate Degree
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
          Bachelors in Business Administration
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="educationMastersBusiness"
            checked={filters.educationMastersBusiness}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Masters in Business Administration
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="educationBachelorsProjectMgmt"
            checked={filters.educationBachelorsProjectMgmt}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Bachelors in Project Management
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







