import AdminSessionProvider from './SessionProvider';
import AdminShell from './AdminShell';

export const metadata = { title: 'Admin — NextGen Digital Hub' };

export default function AdminLayout({ children }) {
  return (
    <AdminSessionProvider>
      <AdminShell>{children}</AdminShell>
    </AdminSessionProvider>
  );
}
