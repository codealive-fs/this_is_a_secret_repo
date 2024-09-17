import Hero from "@/app/compoents/Hero"
import Jobs from "@/app/compoents/Jobs"
import GlobalApi from "./_utils/GlobalApi";
export default async function Home() {
  
  const jobList = await GlobalApi.getJobs(); 
  console.log(jobList.data);
  

  return (
      <>
        <Hero jobList={jobList.data}/>
        <Jobs jobList={jobList} />
      </>    
      );
}
