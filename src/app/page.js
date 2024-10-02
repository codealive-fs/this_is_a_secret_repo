import Hero from "@/app/_compoents/Hero"
import Jobs from "@/app/_compoents/Jobs"
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
