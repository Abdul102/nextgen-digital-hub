import './globals.css';

export const metadata = {
  title: 'NextGen Digital Hub — AI, QA & Digital Solutions',
  description: 'Premium digital services: AI Solutions, QA Testing, SaaS, Web, Mobile, Cloud and Business Analytics.',
  keywords: 'Digital Services, AI Solutions, QA Testing, Web Development, SaaS Development, Mobile, Cloud',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><defs><linearGradient id=%22g%22 x1=%220%22 y1=%220%22 x2=%221%22 y2=%221%22><stop offset=%220%22 stop-color=%22%234f46e5%22/><stop offset=%221%22 stop-color=%22%2306b6d4%22/></linearGradient></defs><rect width=%22100%22 height=%22100%22 rx=%2222%22 fill=%22url(%23g)%22/><text x=%2250%22 y=%2270%22 text-anchor=%22middle%22 font-size=%2260%22 font-family=%22Arial%22 font-weight=%22bold%22 fill=%22white%22>N</text></svg>'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
