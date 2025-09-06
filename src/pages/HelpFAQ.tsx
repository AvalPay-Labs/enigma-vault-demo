import { useState } from "react";
import { ChevronDown, Play, Shield, Network, Users, Lock, Zap, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { UserTour } from "@/components/common/UserTour";
import { useTranslation } from "@/i18n/LanguageContext";

const HelpFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [showTour, setShowTour] = useState(false);
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("help.faq.1.q"),
      answer: t("help.faq.1.a"),
      icon: Shield,
      color: "text-primary"
    },
    {
      question: t("help.faq.2.q"),
      answer: t("help.faq.2.a"),
      icon: Eye,
      color: "text-accent-avalanche"
    },
    {
      question: t("help.faq.3.q"),
      answer: t("help.faq.3.a"),
      icon: Network,
      color: "text-accent-success"
    },
    {
      question: t("help.faq.4.q"),
      answer: t("help.faq.4.a"),
      icon: Users,
      color: "text-warning"
    },
    {
      question: t("help.faq.5.q"),
      answer: t("help.faq.5.a"),
      icon: Lock,
      color: "text-primary-glow"
    },
    {
      question: t("help.faq.6.q"),
      answer: t("help.faq.6.a"),
      icon: Zap,
      color: "text-accent-avalanche-light"
    }
  ];

  const handleFAQToggle = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">{t("help.title")}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">{t("help.subtitle")}</p>
            
            <Button 
              onClick={() => setShowTour(true)}
              className="glass-button cta-start-button shadow-glow"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              {t("help.startTour")}
            </Button>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              return (
                <Collapsible
                  key={index}
                  open={openFAQ === index}
                  onOpenChange={() => handleFAQToggle(index)}
                >
                  <Card className="glass-card border-glass-border">
                    <CollapsibleTrigger asChild>
                      <button className="w-full p-6 text-left hover:bg-glass-hover transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-full bg-background/50 border border-glass-border">
                              <Icon className={`w-5 h-5 ${faq.color}`} />
                            </div>
                            <h3 className="text-lg font-semibold">{faq.question}</h3>
                          </div>
                          <ChevronDown 
                            className={`w-5 h-5 text-muted-foreground transition-transform ${
                              openFAQ === index ? "rotate-180" : ""
                            }`} 
                          />
                        </div>
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0 pb-6 px-6">
                        <div className="ml-14">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              );
            })}
          </div>

          {/* Additional Help */}
          <div className="mt-16 text-center">
            <Card className="glass-card max-w-2xl mx-auto border-glass-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 gradient-text">{t("help.moreHelp.title")}</h3>
                <p className="text-muted-foreground mb-6">{t("help.moreHelp.subtitle")}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="glass-button cta-start-button">{t("help.moreHelp.contactSupport")}</Button>
                  <Button 
                    variant="outline" 
                    className="glass-button"
                    onClick={() => setShowTour(true)}
                  >
                    {t("help.moreHelp.viewTour")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <UserTour 
        isOpen={showTour} 
        onComplete={() => setShowTour(false)}
        onSkip={() => setShowTour(false)}
      />
    </>
  );
};

export default HelpFAQ;
