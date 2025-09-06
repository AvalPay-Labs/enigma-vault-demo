import { useState } from "react";
import { ChevronLeft, ChevronRight, X, User, Shield, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/i18n/LanguageContext";

interface UserTourProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const tourIcons = [Shield, User, Plus, Shield];

export const UserTour = ({ isOpen, onComplete, onSkip }: UserTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();

  const tourSteps = [
    {
      title: t("tour.1.title"),
      description: t("tour.1.description"),
      icon: tourIcons[0],
      content: t("tour.1.content"),
    },
    {
      title: t("tour.2.title"),
      description: t("tour.2.description"),
      icon: tourIcons[1],
      content: t("tour.2.content"),
    },
    {
      title: t("tour.3.title"),
      description: t("tour.3.description"),
      icon: tourIcons[2],
      content: t("tour.3.content"),
    },
    {
      title: t("tour.4.title"),
      description: t("tour.4.description"),
      icon: tourIcons[3],
      content: t("tour.4.content"),
    },
  ];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTourStep = tourSteps[currentStep];
  const Icon = currentTourStep.icon;

  return (
    <Dialog open={isOpen} onOpenChange={() => onSkip()}>
      <DialogContent className="glass-card max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon className="w-6 h-6 text-primary" />
              <div>
                <DialogTitle className="text-lg">{currentTourStep.title}</DialogTitle>
                <DialogDescription>{currentTourStep.description}</DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <Card className="glass-card border-glass-border">
          <CardContent className="p-6">
            <p className="text-sm text-card-foreground leading-relaxed">
              {currentTourStep.content}
            </p>
          </CardContent>
        </Card>

        {/* Progress indicator */}
        <div className="flex justify-center space-x-2 py-2">
          {tourSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="glass-button"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {t("tour.prev")}
          </Button>

          <span className="text-sm text-muted-foreground">
            {currentStep + 1} {t("tour.stepOf")} {tourSteps.length}
          </span>

          <Button onClick={handleNext} className="glass-button">
            {currentStep === tourSteps.length - 1 ? t("tour.finish") : t("tour.next")}
            {currentStep < tourSteps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>

        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkip}
            className="text-muted-foreground hover:text-foreground"
          >
            {t("tour.skip")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
