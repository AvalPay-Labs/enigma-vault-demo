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

const HelpFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [showTour, setShowTour] = useState(false);

  const faqs = [
    {
      question: "¿Qué es eERC20?",
      answer: "eERC20 es una extensión mejorada del estándar ERC20 que incorpora capacidades de privacidad avanzadas mediante pruebas de conocimiento cero (ZK-SNARK). Permite crear tokens que mantienen la funcionalidad estándar de ERC20 pero con la capacidad de ocultar detalles de transacciones como montos, remitentes y destinatarios según tus preferencias de privacidad.",
      icon: Shield,
      color: "text-primary"
    },
    {
      question: "¿Cómo protege la privacidad?",
      answer: "Enigma Protocol utiliza tecnología ZK-SNARK de última generación para crear pruebas criptográficas que verifican la validez de las transacciones sin revelar información sensible. Puedes elegir qué datos mantener privados: montos, direcciones, o ambos. La información se cifra en el momento de la transacción y solo puede ser descifrada por ti o por auditores autorizados temporalmente.",
      icon: Eye,
      color: "text-accent-avalanche"
    },
    {
      question: "¿Qué redes soporta?",
      answer: "Actualmente Enigma Protocol está disponible en Avalanche Fuji Testnet para pruebas y desarrollo. Esta red te permite experimentar con todas las funcionalidades sin usar fondos reales. Avalanche C-Chain (mainnet) estará disponible próximamente una vez completemos las auditorías de seguridad y optimizaciones finales.",
      icon: Network,
      color: "text-accent-success"
    },
    {
      question: "¿Cómo funcionan los auditores?",
      answer: "El sistema de auditoría es completamente opcional y controlado por ti. Los auditores pueden solicitar permisos temporales para revisar transacciones específicas de tus tokens. Tú decides si aprobar estas solicitudes, definiendo fechas de inicio y fin para el acceso. Durante este período, el auditor puede ver las transacciones permitidas. Una vez expirado el permiso, vuelven a ser completamente privadas.",
      icon: Users,
      color: "text-warning"
    },
    {
      question: "¿Mi billetera es segura?",
      answer: "Enigma Protocol es completamente sin custodia, lo que significa que nunca tenemos acceso a tus fondos o claves privadas. Todas las transacciones requieren tu firma directa desde tu wallet (MetaMask, WalletConnect, etc.). Nosotros solo facilitamos la creación de las pruebas ZK y la gestión de permisos de auditoría. Tus fondos permanecen siempre bajo tu control total.",
      icon: Lock,
      color: "text-primary-glow"
    },
    {
      question: "¿Puedo migrar tokens existentes?",
      answer: "Sí, puedes convertir tokens ERC20 existentes a eERC20 privados mediante nuestro sistema de migración. El proceso implica bloquear tus tokens ERC20 originales en un contrato seguro y emitir la cantidad equivalente en tokens eERC20 privados. Esta conversión es reversible cuando lo desees, manteniendo siempre la paridad 1:1 con tus tokens originales.",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Ayuda y Preguntas Frecuentes
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Encuentra respuestas a las preguntas más comunes sobre Enigma Protocol. 
              Si no encuentras lo que buscas, no dudes en contactarnos.
            </p>
            
            <Button 
              onClick={() => setShowTour(true)}
              className="glass-button shadow-glow"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Iniciar Guía Interactiva
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
                <h3 className="text-2xl font-bold mb-4 gradient-text">
                  ¿Necesitas más ayuda?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Nuestro equipo de soporte está disponible para ayudarte con cualquier duda específica.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="glass-button">
                    Contactar Soporte
                  </Button>
                  <Button 
                    variant="outline" 
                    className="glass-button"
                    onClick={() => setShowTour(true)}
                  >
                    Ver Guía Completa
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