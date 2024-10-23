import Hero from "@/app/_compoents/Hero"
import Header from "@/app/_compoents/Header";
import Jobs from "@/app/_compoents/Jobs"
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
