import Hero from "@/app/_components/Hero"
import Header from "@/app/_components/Header";
import Jobs from "@/app/_components/Jobs"
import GlobalApi from "./_utils/GlobalApi";

export default function Home() {  
  // const jobList = await GlobalApi.getJobs(); 
  // console.log(jobList.data);
  
  return (
        <div className="p-8 px-16">
            {/* <Header /> */}
            <Hero />    
      </div>
      );
}
