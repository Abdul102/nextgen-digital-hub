import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 7 }, // 7 days
  pages: { signIn: '/admin/login' },
  providers: [
    CredentialsProvider({
      name: 'Admin',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(creds) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPass = process.env.ADMIN_PASSWORD;
        if (!adminEmail || !adminPass) return null;
        if (
          creds?.email?.toLowerCase() === adminEmail.toLowerCase() &&
          creds?.password === adminPass
        ) {
          return { id: '1', email: adminEmail, name: 'Admin', role: 'admin' };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    }
  }
};
