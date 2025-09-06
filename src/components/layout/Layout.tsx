import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { CookieBanner } from "@/components/common/CookieBanner";
import { UserTour } from "@/components/common/UserTour";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [startTour, setStartTour] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('enigma_cookies_accepted');
    if (!cookiesAccepted) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('enigma_cookies_accepted', 'true');
    setShowCookieBanner(false);
    
    // Show tour after accepting cookies
    const tourCompleted = localStorage.getItem('enigma_tour_completed');
    if (!tourCompleted) {
      setTimeout(() => setStartTour(true), 500);
    }
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
      
      <UserTour 
        isOpen={startTour} 
        onComplete={() => {
          setStartTour(false);
          localStorage.setItem('enigma_tour_completed', 'true');
        }}
        onSkip={() => {
          setStartTour(false);
          localStorage.setItem('enigma_tour_completed', 'true');
        }}
      />
    </div>
  );
};

export default Layout;