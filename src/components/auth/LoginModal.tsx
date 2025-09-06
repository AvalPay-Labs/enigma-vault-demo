import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Building, Shield, Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/i18n/LanguageContext";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type UserRole = "user" | "company" | "auditor";

export const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const roles = [
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
    },
    {
      id: "auditor" as UserRole,
      title: t("auth.role.auditor.title"),
      description: t("auth.role.auditor.desc"),
      icon: Shield,
      color: "text-accent-success"
    }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: t("auth.error.title"),
        description: t("auth.error.passwordMismatch"),
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    // Simulate success
    const userData = {
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      role: selectedRole
    };

    localStorage.setItem('enigma_user', JSON.stringify(userData));
    localStorage.setItem('enigma_session', 'active');

    toast({
      title: isLogin ? t("auth.toast.login") : t("auth.toast.register"),
      description: t("auth.toast.welcome").replace("{role}", roles.find(r => r.id === selectedRole)?.title || ""),
    });

    // Navigate based on role
    if (selectedRole === 'auditor') {
      navigate('/app/auditor');
    } else {
      navigate('/app/dashboard');
    }

    onOpenChange(false);
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({ email: "", password: "", name: "", confirmPassword: "" });
    setSelectedRole(null);
    setIsLogin(true);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) resetForm();
    }}>
      <DialogContent className="glass-card max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">
            {selectedRole ? (isLogin ? t("auth.login") : t("auth.register")) : t("auth.chooseRole")}
          </DialogTitle>
          <DialogDescription>
            {selectedRole 
              ? t("auth.accessAs").replace("{role}", roles.find(r => r.id === selectedRole)?.title || "")
              : t("auth.selectHowToUse")
            }
          </DialogDescription>
        </DialogHeader>

        {!selectedRole ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Card 
                  key={role.id}
                  className="glass-card cursor-pointer hover:shadow-glow transition-all duration-300 border-glass-border"
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <CardHeader className="text-center pb-2">
                    <Icon className={`w-12 h-12 mx-auto ${role.color}`} />
                    <CardTitle className="text-lg">{role.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-sm">
                      {role.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Tabs value={isLogin ? "login" : "register"} className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass-card">
              <TabsTrigger value="login" onClick={() => setIsLogin(true)}>{t("auth.login")}</TabsTrigger>
              <TabsTrigger value="register" onClick={() => setIsLogin(false)}>{t("auth.registerShort")}</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="glass-card"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="glass-card pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full glass-button cta-start-button" disabled={loading}>
                  {loading ? (
                    <div className="loading-spinner w-4 h-4 mr-2" />
                  ) : null}
                  {t("auth.login")}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("auth.fullName")}</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="glass-card"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">{t("auth.email")}</Label>
                  <Input
                    id="register-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="glass-card"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">{t("auth.password")}</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="glass-card pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t("auth.confirmPassword")}</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="glass-card"
                    required
                  />
                </div>
                <Button type="submit" className="w-full glass-button cta-start-button" disabled={loading}>
                  {loading ? (
                    <div className="loading-spinner w-4 h-4 mr-2" />
                  ) : null}
                  {t("auth.createAccount")}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        )}

        {selectedRole && (
          <Button
            variant="ghost"
            onClick={() => setSelectedRole(null)}
            className="w-full"
          >
            ← {t("auth.changeRole")}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};
