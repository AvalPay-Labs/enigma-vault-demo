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

interface UserTourProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const tourSteps = [
  {
    title: "Bienvenido a Enigma Protocol",
    description: "Tu protocolo de privacidad para transacciones eERC20 en Avalanche",
    icon: Shield,
    content: "Enigma Protocol te permite realizar transacciones privadas con auditoría opcional y sin custodia de tus fondos."
  },
  {
    title: "Registro e Inicio de Sesión",
    description: "Elige tu rol y crea tu cuenta",
    icon: User,
    content: "Puedes registrarte como Usuario para transacciones personales, Empresa para soluciones corporativas, o Auditor para revisar transacciones."
  },
  {
    title: "Gestión de Tokens",
    description: "Crea y convierte tokens con privacidad",
    icon: Plus,
    content: "Desde tu dashboard puedes crear nuevos tokens eERC20 privados o convertir tokens existentes para mayor privacidad."
  },
  {
    title: "Sistema de Auditoría",
    description: "Control y transparencia opcional",
    icon: Shield,
    content: "Los auditores pueden solicitar permisos temporales para revisar transacciones específicas, manteniendo la privacidad bajo tu control."
  }
];

export const UserTour = ({ isOpen, onComplete, onSkip }: UserTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);

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
            Anterior
          </Button>

          <span className="text-sm text-muted-foreground">
            {currentStep + 1} de {tourSteps.length}
          </span>

          <Button
            onClick={handleNext}
            className="glass-button"
          >
            {currentStep === tourSteps.length - 1 ? "Finalizar" : "Siguiente"}
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
            Saltar guía
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};