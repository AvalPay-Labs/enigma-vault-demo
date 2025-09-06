import { useState, useEffect } from "react";
import { Plus, Download, Wallet, Shield, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/i18n/LanguageContext";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [tokens, setTokens] = useState<any[]>([]);
  const [auditRequests, setAuditRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const userData = localStorage.getItem('enigma_user');
    if (userData) {
      setUser(JSON.parse(userData));
      // Load mock data
      setTokens([
        { id: '1', name: 'PrivateToken', symbol: 'PRVT', balance: '1000000', auditor: 'Ana García', auditorExpiry: '2025-02-15' },
        { id: '2', name: 'CompanyToken', symbol: 'CMPY', balance: '500000', auditor: null, auditorExpiry: null }
      ]);
      setAuditRequests([
        { id: '1', auditor: 'David Chen', tokenName: 'PrivateToken', reason: 'Compliance review', date: '2025-01-08', status: 'pending' }
      ]);
    }
  }, []);

  const createToken = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const newToken = {
      id: Date.now().toString(),
      name: `Token${tokens.length + 1}`,
      symbol: `TKN${tokens.length + 1}`,
      balance: '100000',
      auditor: null,
      auditorExpiry: null
    };
    setTokens([...tokens, newToken]);
    toast({ title: t("dashboard.toast.tokenCreated.title"), description: t("dashboard.toast.tokenCreated.desc").replace("{name}", newToken.name) });
    setLoading(false);
  };

  const exportData = (format: 'csv' | 'json') => {
    const data = format === 'csv' 
      ? tokens.map(t => `${t.name},${t.symbol},${t.balance},${t.auditor || 'None'}`).join('\n')
      : JSON.stringify(tokens, null, 2);
    
    const blob = new Blob([data], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tokens.${format}`;
    a.click();
    toast({ title: `Exportado como ${format.toUpperCase()}`, description: "Descarga iniciada" });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">{t("dashboard.title")} {user?.role === 'company' ? t("dashboard.business") : t("dashboard.personal")}</h1>
          <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card border-glass-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.kpi.tokensCreated")}</p>
                  <p className="text-2xl font-bold">{tokens.length}</p>
                </div>
                <Plus className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-glass-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.kpi.withAuditor")}</p>
                  <p className="text-2xl font-bold">{tokens.filter(t => t.auditor).length}</p>
                </div>
                <Shield className="w-8 h-8 text-accent-success" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-glass-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.kpi.transactions")}</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent-avalanche" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-glass-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.kpi.pending")}</p>
                  <p className="text-2xl font-bold">{auditRequests.length}</p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button onClick={createToken} disabled={loading} className="glass-button">
            {loading ? <div className="loading-spinner w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            {t("dashboard.actions.createToken")}
          </Button>
          <Button variant="outline" className="glass-button">
            <Plus className="w-4 h-4 mr-2" />
            {t("dashboard.actions.convertToken")}
          </Button>
          <Button variant="outline" onClick={() => exportData('csv')} className="glass-button">
            <Download className="w-4 h-4 mr-2" />
            {t("dashboard.actions.exportCsv")}
          </Button>
          <Button variant="outline" onClick={() => exportData('json')} className="glass-button">
            <Download className="w-4 h-4 mr-2" />
            {t("dashboard.actions.exportJson")}
          </Button>
          <Button variant="outline" className="glass-button">
            <Wallet className="w-4 h-4 mr-2" />
            {t("dashboard.actions.connectWallet")}
          </Button>
        </div>

        {/* Tokens Table */}
        <Card className="glass-card border-glass-border mb-8">
            <CardHeader>
            <CardTitle>{t("dashboard.tokens.title")}</CardTitle>
            </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tokens.map((token) => (
                <div key={token.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{token.name} ({token.symbol})</h3>
                    <p className="text-sm text-muted-foreground">{t("dashboard.tokens.balance")}: {token.balance}</p>
                  </div>
                  <div className="text-right">
                    {token.auditor ? (
                      <Badge className="bg-accent-success text-success-foreground">
                        {t("dashboard.tokens.auditor")}: {token.auditor}
                      </Badge>
                    ) : (
                      <Badge variant="outline">{t("dashboard.tokens.noAuditor")}</Badge>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {token.auditorExpiry ? `${t("dashboard.tokens.until")}: ${token.auditorExpiry}` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audit Requests */}
        <Card className="glass-card border-glass-border">
            <CardHeader>
            <CardTitle>{t("dashboard.requests.title")}</CardTitle>
            </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{request.auditor}</h3>
                    <p className="text-sm text-muted-foreground">{request.tokenName} - {request.reason}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="glass-button">{t("dashboard.requests.accept")}</Button>
                    <Button size="sm" variant="outline" className="glass-button">{t("dashboard.requests.reject")}</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
