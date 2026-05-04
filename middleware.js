// Protect /admin/** with NextAuth — except /admin/login
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/admin/((?!login).*)']
};
