
export const calculateJobStats = (filteredJobs) => {
    const totalJobs = filteredJobs?.length;
    // console.log(totalJobs);
    
    if (totalJobs === 0) {
      return {
        totalJobs: 0,
        averageSalary: 0,
        minSalary: 0,
        maxSalary: 0,
      };
    }
    const salaries = filteredJobs
      .map(job => parseInt(job.attributes.salary))
      .filter(salary => !isNaN(salary));
  
    const totalSalary = salaries.reduce((acc, salary) => acc + salary, 0);
    const averageSalary = salaries.length ? totalSalary / salaries.length : 0;
    const minSalary = Math.min(...salaries);
    const maxSalary = Math.max(...salaries);
  
    return {
      totalJobs,
      averageSalary,
      minSalary,
      maxSalary,
    };
  };