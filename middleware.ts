import {
    clerkMiddleware,
    createRouteMatcher
  } from '@clerk/nextjs/server';
  
  const isProtectedRoute = createRouteMatcher([
    '/',
    '/upcoming',
    '/meeting(.*)',
    '/previous',
    '/recordings',
    '/personal-room',
  ]);
  
  export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  });
  
  export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };