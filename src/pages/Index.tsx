import { useState } from "react";
import { ArrowRight, Shield, Eye, FileCheck, TestTube, Key, Code, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginModal } from "@/components/auth/LoginModal";
import { UserTour } from "@/components/common/UserTour";
import { useTranslation } from "@/i18n/LanguageContext";

const Index = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const { t } = useTranslation();

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
    setShowTour(true);
  };

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 hero-gradient opacity-5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="gradient-text">{t("index.hero.title.line1")}</span>
                <br />
                {t("index.hero.title.line2")}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                {t("index.hero.subtitle.line1")} <br />
                {t("index.hero.subtitle.line2")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="glass-button cta-start-button text-lg px-8 py-6 shadow-glow"
                  onClick={() => setShowLoginModal(true)}
                >
                  {t("index.hero.cta.start")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="glass-button text-lg px-8 py-6"
                  onClick={startTour}
                >
                  <Play className="w-5 h-5 mr-2" />
                  {t("index.hero.cta.tour")}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-transparent to-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{t("index.features.title")}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("index.features.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        <Icon className={`w-8 h-8 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
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
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="glass-card max-w-4xl mx-auto text-center border-glass-border">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold mb-4 gradient-text">{t("index.cta.title")}</h3>
                <p className="text-lg text-muted-foreground mb-8">
                  {t("index.cta.subtitle")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="glass-button cta-start-button shadow-glow"
                    onClick={() => setShowLoginModal(true)}
                  >
                    {t("index.cta.createAccount")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="glass-button"
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

      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
      <UserTour 
        isOpen={showTour} 
        onComplete={() => setShowTour(false)}
        onSkip={() => setShowTour(false)}
      />
    </>
  );
};

export default Index;
