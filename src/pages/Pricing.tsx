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
import { useTranslation } from "@/i18n/LanguageContext";

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
  const { t } = useTranslation();

  const plans = [
    {
      id: "free",
      name: t("pricing.plan.free.name"),
      price: "€0",
      period: t("pricing.per.month"),
      description: t("pricing.plan.free.desc"),
      icon: Star,
      color: "text-accent-success",
      popular: false,
      features: [
        t("pricing.plan.free.feature.1"),
        t("pricing.plan.free.feature.2"),
        t("pricing.plan.free.feature.3"),
        t("pricing.plan.free.feature.4"),
        t("pricing.plan.free.feature.5"),
      ]
    },
    {
      id: "pro",
      name: t("pricing.plan.pro.name"),
      price: "€29",
      period: t("pricing.per.month"),
      description: t("pricing.plan.pro.desc"),
      icon: Crown,
      color: "text-primary",
      popular: true,
      features: [
        t("pricing.plan.pro.feature.1"),
        t("pricing.plan.pro.feature.2"),
        t("pricing.plan.pro.feature.3"),
        t("pricing.plan.pro.feature.4"),
        t("pricing.plan.pro.feature.5"),
        t("pricing.plan.pro.feature.6"),
        t("pricing.plan.pro.feature.7"),
      ]
    },
    {
      id: "enterprise",
      name: t("pricing.plan.enterprise.name"),
      price: t("pricing.plan.enterprise.price"),
      period: "",
      description: t("pricing.plan.enterprise.desc"),
      icon: Building,
      color: "text-accent-avalanche",
      popular: false,
      features: [
        t("pricing.plan.enterprise.feature.1"),
        t("pricing.plan.enterprise.feature.2"),
        t("pricing.plan.enterprise.feature.3"),
        t("pricing.plan.enterprise.feature.4"),
        t("pricing.plan.enterprise.feature.5"),
        t("pricing.plan.enterprise.feature.6"),
        t("pricing.plan.enterprise.feature.7"),
        t("pricing.plan.enterprise.feature.8"),
      ]
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    if (planId === "free") {
      // Free plan - just show success
      toast({
        title: t("pricing.toast.free.title"),
        description: t("pricing.toast.free.desc"),
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
      title: t("pricing.toast.paymentSuccess.title"),
      description: t("pricing.toast.paymentSuccess.desc").replace("{plan}", plans.find(p => p.id === selectedPlan)?.name || ""),
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
                        {t("pricing.mostPopular")}
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
                      {plan.id === "free" ? t("pricing.cta.startFree") : 
                       plan.id === "enterprise" ? t("pricing.cta.contactSales") : t("pricing.cta.selectPlan")}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 gradient-text">{t("pricing.faq.title")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card border-glass-border">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">{t("pricing.faq.q1.title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("pricing.faq.q1.answer")}</p>
                </CardContent>
              </Card>
              <Card className="glass-card border-glass-border">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">{t("pricing.faq.q2.title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("pricing.faq.q2.answer")}</p>
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
              {t("pricing.checkout.title")} - {t("pricing.checkout.plan")} {plans.find(p => p.id === selectedPlan)?.name}
            </DialogTitle>
            <DialogDescription>
              {t("pricing.checkout.subtitle")}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCheckout} className="space-y-6">
            {/* Payment Info */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                {t("pricing.checkout.paymentInfo")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">{t("pricing.checkout.cardNumber")}</Label>
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
                  <Label htmlFor="name">{t("pricing.checkout.cardName")}</Label>
                  <Input
                    id="name"
                    placeholder={t("pricing.placeholder.fullName")}
                    value={checkoutData.name}
                    onChange={(e) => setCheckoutData(prev => ({ ...prev, name: e.target.value }))}
                    className="glass-card"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">{t("pricing.checkout.expiry")}</Label>
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
              <h4 className="font-semibold">{t("pricing.checkout.billing")}</h4>
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
                  <Label htmlFor="address">{t("pricing.checkout.address")}</Label>
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
                  <Label htmlFor="city">{t("pricing.checkout.city")}</Label>
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
                  <Label htmlFor="country">{t("pricing.checkout.country")}</Label>
                  <Select onValueChange={(value) => setCheckoutData(prev => ({ ...prev, country: value }))}>
                    <SelectTrigger className="glass-card">
                      <SelectValue placeholder={t("pricing.checkout.selectCountry")} />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="ES">{t("pricing.countries.es")}</SelectItem>
                      <SelectItem value="MX">{t("pricing.countries.mx")}</SelectItem>
                      <SelectItem value="AR">{t("pricing.countries.ar")}</SelectItem>
                      <SelectItem value="CO">{t("pricing.countries.co")}</SelectItem>
                      <SelectItem value="CL">{t("pricing.countries.cl")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">{t("pricing.checkout.postalCode")}</Label>
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
              {t("pricing.checkout.completePayment")} - {plans.find(p => p.id === selectedPlan)?.price}{plans.find(p => p.id === selectedPlan)?.period}
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
              {t("pricing.contact.title")}
            </DialogTitle>
            <DialogDescription>
              {t("pricing.contact.subtitle")}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">{t("pricing.contact.fullName")}</Label>
              <Input
                id="contact-name"
                placeholder={t("pricing.placeholder.fullName")}
                className="glass-card"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">{t("pricing.contact.email")}</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="juan@empresa.com"
                className="glass-card"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-company">{t("pricing.contact.company")}</Label>
              <Input
                id="contact-company"
                placeholder={t("pricing.placeholder.company")}
                className="glass-card"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">{t("pricing.contact.message")}</Label>
              <textarea
                id="contact-message"
                placeholder={t("pricing.placeholder.message")}
                className="w-full p-3 rounded-lg glass-card border-glass-border resize-none h-24"
              />
            </div>

            <Button type="submit" className="w-full glass-button" disabled={loading}>
              {loading ? (
                <div className="loading-spinner w-4 h-4 mr-2" />
              ) : null}
              {t("pricing.contact.submit")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Pricing;
