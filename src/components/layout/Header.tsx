import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, ChevronDown, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LoginModal } from "@/components/auth/LoginModal";
import { useTranslation } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { path: "/pricing/precinct", label: t("header.nav.pricing") },
    { path: "/docs", label: t("header.nav.docs") },
    { path: "/help/faq", label: t("header.nav.help") },
    { path: "/about", label: t("header.nav.about") },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 glass-card border-b border-glass-border">
        <div className="container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity flex-shrink-0">
            <div className="relative">
              <img 
                src="/logo-enigma.png" 
                alt="Enigma Protocol Logo" 
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm md:text-lg font-bold gradient-text leading-tight">Enigma Protocol</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">by AvalPay</span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                id={
                  item.path === "/help/faq"
                    ? "tour-help"
                    : item.path === "/about"
                    ? "tour-about"
                    : undefined
                }
                className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                  isActive(item.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Controls - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
            {/* Network Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button id="tour-fuji" variant="outline" size="sm" className="glass-button h-8 px-3">
                  <div className="w-2 h-2 bg-accent-success rounded-full mr-1.5" />
                  <span className="text-xs sm:text-sm">{t("header.network.fuji")}</span>
                  <ChevronDown className="w-3 h-3 ml-1.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-card">
                <DropdownMenuItem className="text-accent-success">
                  <div className="w-2 h-2 bg-accent-success rounded-full mr-2" />
                  {t("header.network.fuji")}
                </DropdownMenuItem>
                <DropdownMenuItem disabled className="opacity-50">
                  <div className="w-2 h-2 bg-muted rounded-full mr-2" />
                  {t("header.network.avalanche")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Switch */}
            <LanguageSwitcher />

            {/* Login Button */}
            <Button
              onClick={() => setShowLoginModal(true)}
              id="tour-login"
              className="glass-button cta-start-button h-8 px-3"
              size="sm"
            >
              <User className="w-3 h-3 mr-1.5" />
              <span className="text-xs sm:text-sm">{t("header.login")}</span>
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center space-x-1 sm:space-x-2">
            {/* Network Status - Mobile */}
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-success rounded-full" />
              <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline">Fuji</span>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="glass-button h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3">
                  <Menu className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1.5 text-xs">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-card w-[280px] sm:w-[320px] md:w-[400px]">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-base sm:text-lg font-medium transition-colors hover:text-primary ${
                          isActive(item.path) ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="border-t border-glass-border pt-6">
                    {/* Mobile Language Switch */}
                    <div className="mb-4">
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Language
                      </label>
                      <LanguageSwitcher />
                    </div>

                    {/* Mobile Login Button */}
                    <Button
                      onClick={() => {
                        setShowLoginModal(true);
                        setMobileMenuOpen(false);
                      }}
                      id="tour-login"
                      className="glass-button cta-start-button w-full"
                      size="lg"
                    >
                      <User className="w-5 h-5 mr-2" />
                      {t("header.login")}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  );
};

export default Header;
