export default function JobRow({ title, company }) {
    return (
        <div className="bg-white py-4 px-2 rounded-md shadow-sm flex">
            <div>
                <img 
                    src="https://img.icons8.com/?size=100&id=118489&format=png&color=000000" 
                    alt="" 
                    className="size-12 mr-2"
                />
            </div>
            <div className="grow">
                <div className="font-sm">{company}</div>
                <div className="font-bold">{title}</div>
                {/* <div className="text-gray-500 text-xs">{location} &middot; {jobType}</div> */}
            </div>
            {/* <div className="content-end text-gray-500 text-xs">{postedDate}</div> */}
        </div>
    )
}




























// export default function JobRow(){
//     return(
//         <div className="bg-white py-4 px-2 rounded-md shadow-sm flex  ">
//             <div>
//                 <img 
//                     src="https://img.icons8.com/?size=100&id=118489&format=png&color=000000" alt="" srcset="" 
//                     className="size-12 mr-2"
//                     />
//             </div>
//             <div className="grow">
//                 <div className="font-sm">Facebook</div>
//                 <div className="font-bold">Product designer</div>
//                 <div className="text-gray-500 text-xs">Remote &middot; New York, US &middot; Full-time</div>
//             </div>
//             <div className="content-end text-gray-500 text-xs">2 weeks ago</div>
//         </div>
//     )
// }