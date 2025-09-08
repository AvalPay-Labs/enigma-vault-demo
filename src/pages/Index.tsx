import { useState } from "react";
import { ArrowRight, Shield, Eye, FileCheck, TestTube, Key, Code, Play, User, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginModal } from "@/components/auth/LoginModal";
import { useAppTour } from "@/components/common/TourProvider";
import { useTranslation } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";

type UserRole = "user" | "company" | "auditor";

const Index = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { t } = useTranslation();
  const { start } = useAppTour();
  const navigate = useNavigate();

  const roles = [
    {
      id: "auditor" as UserRole,
      title: t("auth.role.auditor.title"),
      description: t("auth.role.auditor.desc"),
      icon: Shield,
      color: "text-accent-success"
    },
    {
      id: "user" as UserRole,
      title: t("auth.role.user.title"),
      description: t("auth.role.user.desc"),
      icon: User,
      color: "text-primary"
    },
    {
      id: "company" as UserRole,
      title: t("auth.role.company.title"),
      description: t("auth.role.company.desc"),
      icon: Building,
      color: "text-accent-avalanche"
    }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowLoginModal(true);
  };

  const features = [
    {
      title: t("index.feature.1.title"),
      description: t("index.feature.1.desc"),
      icon: Shield,
      color: "text-primary"
    },
    {
      title: t("index.feature.2.title"),
      description: t("index.feature.2.desc"),
      icon: Eye,
      color: "text-accent-avalanche"
    },
    {
      title: t("index.feature.3.title"),
      description: t("index.feature.3.desc"),
      icon: FileCheck,
      color: "text-accent-success"
    },
    {
      title: t("index.feature.4.title"),
      description: t("index.feature.4.desc"),
      icon: TestTube,
      color: "text-warning"
    },
    {
      title: t("index.feature.5.title"),
      description: t("index.feature.5.desc"),
      icon: Key,
      color: "text-primary-glow"
    },
    {
      title: t("index.feature.6.title"),
      description: t("index.feature.6.desc"),
      icon: Code,
      color: "text-accent-avalanche-light"
    }
  ];

  const startTour = () => {
    start();
  };

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 hero-gradient opacity-5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                <span className="gradient-text">{t("index.hero.title.line1")}</span>
                <br />
                {t("index.hero.title.line2")}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
                {t("index.hero.subtitle.line1")} <br />
                {t("index.hero.subtitle.line2")}
              </p>
              
              {/* Role Selection Section */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 gradient-text">
                  {t("auth.chooseRole")}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6">
                  {t("auth.selectHowToUse")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <Card 
                        id={
                          role.id === "user"
                            ? "tour-role-user"
                            : role.id === "company"
                            ? "tour-role-company"
                            : role.id === "auditor"
                            ? "tour-role-auditor"
                            : undefined
                        }
                        key={role.id}
                        className="glass-card cursor-pointer hover:shadow-glow transition-all duration-300 border-glass-border group"
                        onClick={() => handleRoleSelect(role.id)}
                      >
                        <CardHeader className="text-center pb-2">
                          <div className="mx-auto mb-3 p-3 rounded-full bg-background/50 border border-glass-border group-hover:border-primary/50 transition-colors">
                            <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${role.color}`} />
                          </div>
                          <CardTitle className="text-base sm:text-lg">{role.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-center text-xs sm:text-sm">
                            {role.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
              
              {/* Tour Button */}
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="glass-button text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
                  onClick={startTour}
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {t("index.hero.cta.tour")}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-transparent to-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">{t("index.features.title")}</h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
                {t("index.features.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card 
                    key={index}
                    className="glass-card glass-card-hover border-glass-border group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto mb-4 p-3 rounded-full bg-background/50 border border-glass-border">
                        <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-lg sm:text-xl mb-2">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-sm leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4">
            <Card className="glass-card max-w-4xl mx-auto text-center border-glass-border">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text">{t("index.cta.title")}</h3>
                <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 px-4 sm:px-0">
                  {t("index.cta.subtitle")}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                  <Button 
                    size="lg" 
                    className="glass-button cta-start-button shadow-glow w-full sm:w-auto"
                    onClick={() => setShowLoginModal(true)}
                  >
                    {t("index.cta.createAccount")}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="glass-button w-full sm:w-auto"
                    onClick={startTour}
                  >
                    {t("index.cta.viewTour")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <LoginModal 
        open={showLoginModal} 
        onOpenChange={(open) => {
          setShowLoginModal(open);
          if (!open) setSelectedRole(null);
        }}
        preselectedRole={selectedRole}
      />
      {/* Joyride guide is started from the CTA button using useAppTour(). */}
    </>
  );
};

export default Index;
