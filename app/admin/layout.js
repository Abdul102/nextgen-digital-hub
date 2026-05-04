import AdminSessionProvider from './SessionProvider';
import AdminShell from './AdminShell';

export const metadata = { title: 'Admin — NextGen Digital Hub' };
// Admin uses NextAuth + live data — never prerender at build time
export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }) {
  return (
    <AdminSessionProvider>
      <AdminShell>{children}</AdminShell>
    </AdminSessionProvider>
  );
}
