import Hero from "@/app/compoents/Hero"
import Jobs from "@/app/compoents/Jobs"
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {
  
  const jobList = await GlobalApi.getJobs(); 
  
  return (
      <>
        <Hero />
        <Jobs jobList={jobList} />
      </>    
      );
}
