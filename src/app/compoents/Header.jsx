import Link from "next/link"

export default function Header(){
    return(
        <header>
            <div className="container flex items-center justify-between my-4 mx-auto">
                <Link href={'/'} className="font-bold text-lg">Job Board</Link>
                <nav className="flex gap-4 *:px-2 *:py-3 *:rounded-md">
                    <Link className="bg-gray-200" href={'/login'}>Login</Link>
                    <Link className="bg-blue-600 text-white" href={'/new-listing'}>Post a Job</Link>
                </nav>
            </div> 
        </header>

    ); 
}
