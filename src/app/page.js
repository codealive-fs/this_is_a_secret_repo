import Hero from "@/app/compoents/Hero"
import Jobs from "@/app/compoents/Jobs"
import GlobalApi from "./_utils/GlobalApi";

export default function Home() {  
  // const jobList = await GlobalApi.getJobs(); 
  // console.log(jobList.data);
  
  return (
      <>
            <Hero />
            <Jobs />
         {/* <Hero jobList={jobList.data}/> */}
         {/* <Jobs jobList={jobList} /> */}
      </>    
      );
}
