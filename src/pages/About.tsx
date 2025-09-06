import { useState } from "react";
import { Play, Linkedin, Github, Mail, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/i18n/LanguageContext";

const About = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const { t } = useTranslation();

  const team = [
    {
      name: "Ana García",
      role: "CEO & Co-founder",
      expertise: "Blockchain Architecture & Strategy",
      image: "https://images.unsplash.com/photo-1494790108755-2616b6b0c55c?w=400&h=400&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/ana-garcia",
      github: "https://github.com/ana-garcia"
    },
    {
      name: "Carlos Ruiz",
      role: "CTO & Co-founder", 
      expertise: "Cryptography & Zero-Knowledge Proofs",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/carlos-ruiz",
      github: "https://github.com/carlos-ruiz"
    },
    {
      name: "María López",
      role: "Lead Developer",
      expertise: "Smart Contracts & Avalanche",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/maria-lopez",
      github: "https://github.com/maria-lopez"
    },
    {
      name: "David Chen",
      role: "Security Auditor",
      expertise: "Smart Contract Security & Auditing",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/david-chen",
      github: "https://github.com/david-chen"
    },
    {
      name: "Laura Martín",
      role: "Product Designer",
      expertise: "UX/UI Design & User Research",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/laura-martin",
      github: "https://github.com/laura-martin"
    }
  ];

  const roadmap = [
    {
      phase: "Q3 2025",
      title: "Fase Actual - Demo & Testing",
      status: "current",
      items: [
        "Fuji Testnet deployment completo",
        "Dashboard y sistema de auditoría",
        "Documentación API",
        "Pruebas de integración"
      ]
    },
    {
      phase: "Q4 2025",
      title: "Próxima - Mainnet Launch",
      status: "next",
      items: [
        "Despliegue en Avalanche C-Chain",
        "Auditorías de seguridad completas",
        "Programa de bug bounties",
        "Partnerships estratégicos"
      ]
    },
    {
      phase: "Q1 2026",
      title: "Expansión Multi-chain",
      status: "future",
      items: [
        "Soporte para Ethereum",
        "Cross-chain bridge development",
        "Advanced privacy features",
        "Mobile app development"
      ]
    },
    {
      phase: "Q2 2026",
      title: "Enterprise Solutions",
      status: "future", 
      items: [
        "Compliance tools avanzadas",
        "White-label solutions",
        "On-premise deployments",
        "Advanced analytics"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-primary text-primary-foreground";
      case "next":
        return "bg-accent-avalanche text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">{t("about.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("about.subtitle")}</p>
        </div>

        {/* Video/Pitch Section */}
        <div className="mb-20">
          <Card className="glass-card max-w-4xl mx-auto border-glass-border">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 gradient-text">{t("about.videoPitch")}</h2>
              <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <Play className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Video pitch coming soon
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{t("about.videoSubtitle")}</p>
                </div>
              </div>
              <Button className="glass-button">
                <Play className="w-4 h-4 mr-2" />
                {t("about.viewPitch")}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text">{t("about.team.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("about.team.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card 
                key={index}
                className="glass-card border-glass-border overflow-hidden group cursor-pointer"
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        hoveredMember === index ? "grayscale-0 scale-110" : "grayscale scale-100"
                      }`}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4">{member.expertise}</p>
                    <div className="flex space-x-3">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Roadmap Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text">{t("about.roadmap.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("about.roadmap.subtitle")}</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {roadmap.map((phase, index) => (
              <Card 
                key={index}
                className={`glass-card border-glass-border ${
                  phase.status !== "future" ? "shadow-glow" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(phase.status)}>
                        <Calendar className="w-4 h-4 mr-2" />
                        {phase.phase}
                      </Badge>
                      <CardTitle className={phase.status === "future" ? "text-muted-foreground" : ""}>
                        {phase.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {phase.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex} 
                        className={`flex items-center space-x-3 ${
                          phase.status === "future" ? "text-muted-foreground" : ""
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          phase.status === "current" ? "bg-primary" :
                          phase.status === "next" ? "bg-accent-avalanche" : "bg-muted"
                        }`} />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact & Become Auditor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card id="contact" className="glass-card border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-6 h-6 mr-2 text-primary" />
                {t("about.contact.title")}
              </CardTitle>
              <CardDescription>{t("about.contact.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span>hello@enigmaprotocol.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span>Barcelona, España</span>
              </div>
              <Button className="w-full glass-button mt-4">{t("about.contact.cta")}</Button>
            </CardContent>
          </Card>

          <Card id="become-auditor" className="glass-card border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Github className="w-6 h-6 mr-2 text-accent-success" />
                {t("about.auditor.title")}
              </CardTitle>
              <CardDescription>{t("about.auditor.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">• {t("about.auditor.req1")}</p>
                <p className="text-sm text-muted-foreground">• {t("about.auditor.req2")}</p>
                <p className="text-sm text-muted-foreground">• {t("about.auditor.req3")}</p>
              </div>
              <Button className="w-full glass-button mt-4">{t("about.auditor.apply")}</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
