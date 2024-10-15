import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // return NextResponse.redirect(new URL('/home', request.url))
  return console.log("////////////////////////////ml;;l;l////////////////////////////////////////////////////////////////////");
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/add-job/:path*', '/applied-jobs/:path*', '/register-company/:path*', '/update-profile/:path*']
}