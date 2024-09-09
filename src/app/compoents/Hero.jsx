export default function Hero(){
    return(
        <section className="py-12">
            <h1 className="text-4xl text-center font-bold">Find your next <br /> dream job</h1>
            {/* <p className="text-center text-gray-700">Lorem ipsum dolor sit amet consectetur,  voluptates laboriosam quae reiciendis libero repellat, id omnis iure aliquam sed! Nemo eligendi accusamus eum eos sapiente doloremque dolor.</p> */}
        <form className="flex gap-2 mt-4 max-w-md mx-auto">
            <input 
                type="search" 
                className="border border-gray-400 rounded-md px-2 py-2 w-full" 
                placeholder="Search phrase.."
                />
            <button className=" bg-blue-600 text-white rounded-md px-2 py-3" type="button">Search</button>
        </form>
        </section>
    )
}