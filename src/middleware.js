import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // console.log("////////////////////////////ml;;l;l////////////////////////////////////////////////////////////////////");
  // const token = request.localStorage.getItem('jwt');
  // console.log(token);
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/add-job/:path*',
    '/added-jobs/:path*',
    '/applied-jobs/:path*', 
    '/register-company/:path*', 
    '/update-profile/:path*',
  ]
}