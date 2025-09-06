import { useState } from "react";
import { Check, Star, Crown, Building, CreditCard, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postalCode: ""
  });

  const { toast } = useToast();

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "€0",
      period: "/mes",
      description: "Perfecto para empezar con privacidad básica",
      icon: Star,
      color: "text-accent-success",
      popular: false,
      features: [
        "Hasta 10 transacciones/mes",
        "1 token eERC20",
        "Privacidad básica ZK",
        "Soporte por email",
        "Dashboard básico"
      ]
    },
    {
      id: "pro",
      name: "Pro",
      price: "€29",
      period: "/mes",
      description: "Ideal para usuarios activos y empresas pequeñas",
      icon: Crown,
      color: "text-primary",
      popular: true,
      features: [
        "Transacciones ilimitadas",
        "Hasta 50 tokens eERC20",
        "Privacidad avanzada ZK-SNARK",
        "Sistema de auditoría completo",
        "API y webhooks",
        "Soporte prioritario 24/7",
        "Análisis avanzado"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Personalizado",
      period: "",
      description: "Soluciones empresariales con máxima flexibilidad",
      icon: Building,
      color: "text-accent-avalanche",
      popular: false,
      features: [
        "Todo de Pro +",
        "Tokens ilimitados",
        "SLA garantizado 99.9%",
        "Auditorías personalizadas",
        "Integración personalizada",
        "Gestor de cuenta dedicado",
        "Cumplimiento regulatorio",
        "Despliegue on-premise"
      ]
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    if (planId === "free") {
      // Free plan - just show success
      toast({
        title: "Plan Free activado",
        description: "Tu plan gratuito está listo. ¡Comienza a usar Enigma Protocol!",
      });
    } else if (planId === "enterprise") {
      setShowContact(true);
    } else {
      setShowCheckout(true);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "¡Pago procesado exitosamente!",
      description: `Plan ${plans.find(p => p.id === selectedPlan)?.name} activado. Te hemos enviado un email de confirmación.`,
    });

    setShowCheckout(false);
    setLoading(false);
    setCheckoutData({
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      name: "",
      email: "",
      address: "",
      city: "",
      country: "",
      postalCode: ""
    });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Solicitud enviada",
      description: "Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.",
    });

    setShowContact(false);
    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Precinct - Planes y Precios
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Elige el plan que mejor se adapte a tus necesidades de privacidad. 
              Comienza gratis y escala según crezcas.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <Card 
                  key={plan.id}
                  className={`glass-card glass-card-hover border-glass-border relative ${
                    plan.popular ? "ring-2 ring-primary shadow-glow" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Más Popular
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-background/50 border border-glass-border">
                      <Icon className={`w-8 h-8 ${plan.color}`} />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold">
                      {plan.price}
                      <span className="text-sm font-normal text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-accent-success flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full glass-button ${plan.popular ? "shadow-glow" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleSelectPlan(plan.id)}
                    >
                      {plan.id === "free" ? "Comenzar Gratis" : 
                       plan.id === "enterprise" ? "Contactar Ventas" : "Seleccionar Plan"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 gradient-text">
              Preguntas Frecuentes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card border-glass-border">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">¿Puedo cambiar de plan?</h4>
                  <p className="text-sm text-muted-foreground">
                    Sí, puedes actualizar o degradar tu plan en cualquier momento desde tu dashboard.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-card border-glass-border">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">¿Hay límites de red?</h4>
                  <p className="text-sm text-muted-foreground">
                    Actualmente soportamos Avalanche Fuji Testnet. C-Chain llegará pronto.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="glass-card max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text">
              Finalizar Compra - Plan {plans.find(p => p.id === selectedPlan)?.name}
            </DialogTitle>
            <DialogDescription>
              Completa tu información de pago para activar tu plan
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCheckout} className="space-y-6">
            {/* Payment Info */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Información de Pago
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número de tarjeta</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={checkoutData.cardNumber}
                    onChange={(e) => setCheckoutData(prev => ({ ...prev, cardNumber: e.target.value }))}
                    className="glass-card"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre en la tarjeta</Label>
                  <Input
                    id="name"
                    placeholder="Juan Pérez"
                    value={checkoutData.name}
                    onChange={(e) => setCheckoutData(prev => ({ ...prev, name: e.target.value }))}
                    className="glass-card"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Fecha de vencimiento</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/AA"
                    value={checkoutData.expiryDate}
                    onChange={(e) => setCheckoutData(prev => ({ ...prev, expiryDate: e.target.value }))}
                    className="glass-card"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={checkoutData.cvc}
                    onChange={(e) => setCheckoutData(prev => ({ ...prev, cvc: e.target.value }))}
                    className="glass-card"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="space-y-4">
              <h4 className="font-semibold">Dirección de Facturación</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    value={checkoutData.email}
                    onChange={(e) => setCheckoutData(prev => ({ ...prev, email: e.target.value }))}
                    className="glass-card"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    placeholder="Calle Principal 123"
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData(prev => ({ ...prev, address: e.target.value }))}
                    className="glass-card"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    placeholder="Madrid"
                    value={checkoutData.city}
                    onChange={(e) => setCheckoutData(prev => ({ ...prev, city: e.target.value }))}
                    className="glass-card"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">País</Label>
                  <Select onValueChange={(value) => setCheckoutData(prev => ({ ...prev, country: value }))}>
                    <SelectTrigger className="glass-card">
                      <SelectValue placeholder="Seleccionar país" />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="ES">España</SelectItem>
                      <SelectItem value="MX">México</SelectItem>
                      <SelectItem value="AR">Argentina</SelectItem>
                      <SelectItem value="CO">Colombia</SelectItem>
                      <SelectItem value="CL">Chile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Código postal</Label>
                  <Input
                    id="postalCode"
                    placeholder="28001"
                    value={checkoutData.postalCode}
                    onChange={(e) => setCheckoutData(prev => ({ ...prev, postalCode: e.target.value }))}
                    className="glass-card"
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full glass-button shadow-glow" disabled={loading}>
              {loading ? (
                <div className="loading-spinner w-4 h-4 mr-2" />
              ) : null}
              Completar Pago - {plans.find(p => p.id === selectedPlan)?.price}{plans.find(p => p.id === selectedPlan)?.period}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Contact Modal */}
      <Dialog open={showContact} onOpenChange={setShowContact}>
        <DialogContent className="glass-card max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text flex items-center">
              <Mail className="w-6 h-6 mr-2" />
              Contactar Ventas Enterprise
            </DialogTitle>
            <DialogDescription>
              Nuestro equipo se pondrá en contacto contigo para una propuesta personalizada
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Nombre completo</Label>
              <Input
                id="contact-name"
                placeholder="Juan Pérez"
                className="glass-card"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email corporativo</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="juan@empresa.com"
                className="glass-card"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-company">Empresa</Label>
              <Input
                id="contact-company"
                placeholder="Mi Empresa S.L."
                className="glass-card"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Mensaje (opcional)</Label>
              <textarea
                id="contact-message"
                placeholder="Cuéntanos sobre tus necesidades específicas..."
                className="w-full p-3 rounded-lg glass-card border-glass-border resize-none h-24"
              />
            </div>

            <Button type="submit" className="w-full glass-button" disabled={loading}>
              {loading ? (
                <div className="loading-spinner w-4 h-4 mr-2" />
              ) : null}
              Enviar Solicitud
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Pricing;