import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoginModal } from "@/components/auth/LoginModal";
import { useTranslation } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 glass-card border-b border-glass-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <Shield className="w-8 h-8 text-primary" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-background rounded-sm" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold gradient-text">Enigma Protocol</span>
              <span className="text-xs text-muted-foreground">by AvalPay</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/pricing/precinct"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/pricing/precinct") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {t("header.nav.pricing")}
            </Link>
            <Link
              to="/docs"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/docs") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {t("header.nav.docs")}
            </Link>
            <Link
              to="/help/faq"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/help/faq") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {t("header.nav.help")}
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {t("header.nav.about")}
            </Link>
          </nav>

          {/* Network Selector & Login */}
          <div className="flex items-center space-x-4">
            {/* Network Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="glass-button">
                  <div className="w-2 h-2 bg-accent-success rounded-full mr-2" />
                  {t("header.network.fuji")}
                  <ChevronDown className="w-4 h-4 ml-2" />
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
              className="glass-button"
              size="sm"
            >
              <User className="w-4 h-4 mr-2" />
              {t("header.login")}
            </Button>
          </div>
        </div>
      </header>

      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  );
};

export default Header;
