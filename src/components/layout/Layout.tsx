import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { CookieBanner } from "@/components/common/CookieBanner";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  // Auto-inicio de tour deshabilitado: solo se inicia desde el botón en homepage

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('enigma_cookies_accepted');
    if (!cookiesAccepted) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('enigma_cookies_accepted', 'true');
    setShowCookieBanner(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      
      {showCookieBanner && (
        <CookieBanner
          onAccept={handleAcceptCookies}
          onReject={() => setShowCookieBanner(false)}
        />
      )}
      
      {/* Tour deshabilitado por defecto; se activa manualmente desde el homepage. */}
    </div>
  );
};

export default Layout;
