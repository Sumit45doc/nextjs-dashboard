import NextAuth from 'next-auth';
import { authconfig } from './auth.config';
 
export default NextAuth(authconfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};