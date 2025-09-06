import { useState } from "react";
import { Send, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/i18n/LanguageContext";

const Auditor = () => {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([
    { id: '1', token: 'PrivateToken', owner: 'Ana García', status: 'pending', date: '2025-01-07' },
    { id: '2', token: 'CompanyToken', owner: 'Carlos Ruiz', status: 'accepted', date: '2025-01-06', expiry: '2025-02-06' }
  ]);
  const { toast } = useToast();
  const { t } = useTranslation();

  const submitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: t("auditor.toast.sent.title"),
      description: t("auditor.toast.sent.desc")
    });
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-warning text-warning-foreground"><Clock className="w-3 h-3 mr-1" />{t("auditor.status.pending")}</Badge>;
      case 'accepted':
        return <Badge className="bg-accent-success text-success-foreground"><CheckCircle className="w-3 h-3 mr-1" />{t("auditor.status.accepted")}</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive text-destructive-foreground"><XCircle className="w-3 h-3 mr-1" />{t("auditor.status.rejected")}</Badge>;
      default:
        return <Badge variant="outline">{t("auditor.status.unknown")}</Badge>;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 id="tour-auditor-title" className="text-3xl font-bold gradient-text mb-2">{t("auditor.title")}</h1>
          <p className="text-muted-foreground">{t("auditor.subtitle")}</p>
        </div>

        {/* Alert about expiring access */}
        <Card className="glass-card border-warning/30 bg-warning/5 mb-8">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <div>
                <p className="font-semibold text-warning">{t("auditor.alert.expiring.title")}</p>
                <p className="text-sm text-muted-foreground">{t("auditor.alert.expiring.desc")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Request Form */}
          <Card className="glass-card border-glass-border">
            <CardHeader>
              <CardTitle>{t("auditor.request.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={submitRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="token">{t("auditor.form.token")}</Label>
                  <Input
                    id="token"
                    placeholder="0x742d35Cc6..."
                    className="glass-card"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">{t("auditor.form.reason")}</Label>
                  <Textarea
                    id="reason"
                    placeholder={t("auditor.form.reasonPlaceholder")}
                    className="glass-card resize-none"
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">{t("auditor.form.startDate")}</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      className="glass-card"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">{t("auditor.form.endDate")}</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      className="glass-card"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full glass-button cta-start-button" disabled={loading}>
                  {loading ? (
                    <div className="loading-spinner w-4 h-4 mr-2" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {t("auditor.form.submit")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* My Requests */}
          <Card className="glass-card border-glass-border">
            <CardHeader>
              <CardTitle>{t("auditor.myRequests.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request.id} className="p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{request.token}</h3>
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{t("auditor.myRequests.owner")}: {request.owner}</p>
                    <p className="text-sm text-muted-foreground">
                      Solicitado: {request.date}
                      {request.expiry && ` • ${t("auditor.myRequests.expires")}: ${request.expiry}`}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Audits */}
        <Card className="glass-card border-glass-border mt-8">
          <CardHeader>
            <CardTitle>{t("auditor.activeAudits.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">CompanyToken (CMPY)</h3>
                    <p className="text-sm text-muted-foreground">Acceso válido hasta: 2025-02-06</p>
                  </div>
                  <Button size="sm" className="glass-button cta-start-button">{t("auditor.activeAudits.viewTx")}</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auditor;
