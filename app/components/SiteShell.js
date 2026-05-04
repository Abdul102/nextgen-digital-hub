import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';
import PageLoader from './PageLoader';

export default function SiteShell({ children }) {
  return (
    <>
      <PageLoader />
      <Header />
      <main>{children}</main>
      <Footer />
      <Chatbot />
    </>
  );
}
