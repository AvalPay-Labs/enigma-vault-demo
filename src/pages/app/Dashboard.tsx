import { useState, useEffect } from "react";
import { Plus, Download, Wallet, Shield, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/i18n/LanguageContext";
import ConverterFlow from "@/components/converter/ConverterFlow";
import { StandaloneFlow } from "@/components/standalone/StandaloneFlow";
import { StandaloneOperationsPanel } from "@/components/standalone/StandaloneOperationsPanel";
import { getLastDeployment, getLastSystemDeployment, getLastDeposit } from "@/store/deployments";
import { StandaloneDeploySystemResponse } from "@/types/standalone";
import type { DeployBasicsResponse, DeploySystemResponse, DepositResponse } from "@/types/deploy";
import { seedDemoAppData, clearDemoAppData, DEMO_KEYS } from "@/mocks/seed";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [tokens, setTokens] = useState<any[]>([]);
  const [auditRequests, setAuditRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  const [openConverter, setOpenConverter] = useState(false);
  const [openStandalone, setOpenStandalone] = useState(false);
  const [standaloneSystemData, setStandaloneSystemData] = useState<StandaloneDeploySystemResponse | null>(null);
  const [showStandaloneOperations, setShowStandaloneOperations] = useState(false);
  const [lastDeployment, setLastDeployment] = useState<DeployBasicsResponse | null>(null);
  const [lastSystem, setLastSystem] = useState<DeploySystemResponse | null>(null);
  const [lastDeposit, setLastDeposit] = useState<DepositResponse | null>(null);

  useEffect(() => {
    const rawUser = localStorage.getItem(DEMO_KEYS.user) || localStorage.getItem('enigma_user')
    if (rawUser) setUser(JSON.parse(rawUser))
    try {
      const rawTokens = localStorage.getItem(DEMO_KEYS.tokens)
      const rawReqs = localStorage.getItem(DEMO_KEYS.requests)
      if (rawTokens) setTokens(JSON.parse(rawTokens))
      if (rawReqs) setAuditRequests(JSON.parse(rawReqs))
      if (!rawTokens && !rawReqs) {
        // fallback minimal demo
        setTokens([
          { id: '1', name: 'PrivateToken', symbol: 'PRVT', balance: '1,000,000', auditor: 'Ana García', auditorExpiry: '2025-02-15' },
          { id: '2', name: 'CompanyToken', symbol: 'CMPY', balance: '500,000', auditor: null, auditorExpiry: null },
        ])
        setAuditRequests([
          { id: '1', auditor: 'David Chen', tokenName: 'PrivateToken', reason: 'Compliance review', date: '2025-01-08', status: 'pending' },
        ])
      }
    } catch {}
  }, []);

  // Load last deployment on mount and whenever the dialog closes
  useEffect(() => {
    setLastDeployment(getLastDeployment());
    setLastSystem(getLastSystemDeployment());
    setLastDeposit(getLastDeposit());
  }, []);
  useEffect(() => {
    if (!openConverter) {
      setLastDeployment(getLastDeployment());
      setLastSystem(getLastSystemDeployment());
      setLastDeposit(getLastDeposit());
    }
  }, [openConverter]);

  const createToken = async () => {
    setOpenStandalone(true);
  };

  const handleStandaloneDeploymentComplete = (systemData: StandaloneDeploySystemResponse) => {
    console.log('Deployment completed, systemData:', systemData);
    setStandaloneSystemData(systemData);
    setShowStandaloneOperations(true);
    console.log('Standalone operations panel should be visible now');
    toast({
      title: t("standalone.deploymentComplete"),
      description: t("standalone.deploymentCompleteDesc"),
    });
  };

  const handleCloseStandaloneOperations = () => {
    setShowStandaloneOperations(false);
    setStandaloneSystemData(null);
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

  const loadDemo = async () => {
    setLoading(true)
    try {
      await seedDemoAppData()
      // Refresh from localStorage
      const rawUser = localStorage.getItem(DEMO_KEYS.user)
      if (rawUser) setUser(JSON.parse(rawUser))
      const rawTokens = localStorage.getItem(DEMO_KEYS.tokens)
      const rawReqs = localStorage.getItem(DEMO_KEYS.requests)
      if (rawTokens) setTokens(JSON.parse(rawTokens))
      if (rawReqs) setAuditRequests(JSON.parse(rawReqs))
      setLastDeployment(getLastDeployment());
      setLastSystem(getLastSystemDeployment());
      setLastDeposit(getLastDeposit());
      toast({ title: 'Demo cargada', description: 'Se generaron datos mock en toda la app.' })
    } catch (e) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'No se pudo cargar demo', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const clearDemo = () => {
    clearDemoAppData()
    setTokens([])
    setAuditRequests([])
    setLastDeployment(null)
    setLastSystem(null)
    setLastDeposit(null)
    toast({ title: 'Demo limpiada', description: 'Se limpiaron los datos mock.' })
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 id="tour-dashboard-title" className="text-3xl font-bold gradient-text mb-2">{t("dashboard.title")} {user?.role === 'company' ? t("dashboard.business") : t("dashboard.personal")}</h1>
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
          <Button onClick={createToken} disabled={loading} className="glass-button cta-start-button">
            {loading ? <div className="loading-spinner w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            {t("dashboard.actions.createToken")}
          </Button>
          <Button variant="outline" className="glass-button" onClick={() => setOpenConverter(true)}>
            <Plus className="w-4 h-4 mr-2" />
            {t("dashboard.actions.convertToken")}
          </Button>
          <Button variant="outline" onClick={loadDemo} disabled={loading} className="glass-button">
            <Download className="w-4 h-4 mr-2" />
            Cargar Demo
          </Button>
          <Button variant="outline" onClick={clearDemo} disabled={loading} className="glass-button">
            <Download className="w-4 h-4 mr-2" />
            Limpiar Demo
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

        {/* Converter Deployment Summary */}
        <Card className="glass-card border-glass-border mb-8">
          <CardHeader>
            <CardTitle>{t("converter.card.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            {lastDeployment ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{t("converter.card.subtitle")} · {t("converter.card.lastUpdated")}: {new Date(lastDeployment.timestamp).toLocaleString()}</p>
                <div className="text-xs grid grid-cols-1 md:grid-cols-2 gap-2 bg-white border border-glass-border rounded-md p-3">
                  {Object.entries(lastDeployment.data).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <span className="font-medium capitalize">{k}</span>
                      <span className="font-mono text-muted-foreground break-all">{String(v)}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <Button variant="outline" className="glass-button" onClick={() => setOpenConverter(true)}>
                    {t("converter.card.viewFlow")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{t("converter.card.none")}</p>
                <Button variant="outline" className="glass-button" onClick={() => setOpenConverter(true)}>
                  {t("converter.card.viewFlow")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Last Deposit Summary */}
        <Card className="glass-card border-glass-border mb-8">
          <CardHeader>
            <CardTitle>{t("converter.card.deposit.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            {lastDeposit ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{t("converter.card.deposit.subtitle")} · {t("converter.card.lastUpdated")}: {new Date(lastDeposit.timestamp).toLocaleString()}</p>
                <div className="text-xs grid grid-cols-1 md:grid-cols-2 gap-2 bg-white border border-glass-border rounded-md p-3">
                  <div className="flex justify-between gap-2">
                    <span className="font-medium">transactionHash</span>
                    <span className="font-mono text-muted-foreground break-all">{lastDeposit.data.transactionHash}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="font-medium">walletNumber</span>
                    <span className="font-mono text-muted-foreground">{lastDeposit.data.walletNumber}</span>
                  </div>
                </div>
                <div>
                  <Button variant="outline" className="glass-button" onClick={() => setOpenConverter(true)}>
                    {t("converter.card.viewFlow")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{t("converter.card.deposit.none")}</p>
                <Button variant="outline" className="glass-button" onClick={() => setOpenConverter(true)}>
                  {t("converter.card.viewFlow")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Converter System Summary */}
        <Card className="glass-card border-glass-border mb-8">
          <CardHeader>
            <CardTitle>{t("converter.card.system.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            {lastSystem ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{t("converter.card.system.subtitle")} · {t("converter.card.lastUpdated")}: {new Date(lastSystem.timestamp).toLocaleString()}</p>
                <div className="text-xs grid grid-cols-1 md:grid-cols-2 gap-2 bg-white border border-glass-border rounded-md p-3">
                  {Object.entries(lastSystem.data).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <span className="font-medium capitalize">{k}</span>
                      <span className="font-mono text-muted-foreground break-all">{String(v)}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <Button variant="outline" className="glass-button" onClick={() => setOpenConverter(true)}>
                    {t("converter.card.viewFlow")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{t("converter.card.system.none")}</p>
                <Button variant="outline" className="glass-button" onClick={() => setOpenConverter(true)}>
                  {t("converter.card.viewFlow")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

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
                    <Button size="sm" className="glass-button cta-start-button">{t("dashboard.requests.accept")}</Button>
                    <Button size="sm" variant="outline" className="glass-button">{t("dashboard.requests.reject")}</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Standalone Operations Panel - Always visible */}
        <Card className="glass-card border-glass-border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t("standalone.title")}</span>
              {standaloneSystemData && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCloseStandaloneOperations}
                >
                  {t("standalone.close")}
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {standaloneSystemData ? (
              <StandaloneOperationsPanel
                systemData={standaloneSystemData}
                onClose={handleCloseStandaloneOperations}
              />
            ) : (
              <div className="text-center py-8">
                <div className="text-muted-foreground mb-4">
                  <div className="text-lg font-semibold mb-2">
                    {t("standalone.panelLocked")}
                  </div>
                  <div className="text-sm">
                    {t("standalone.panelLockedDesc")}
                  </div>
                </div>
                <Button 
                  onClick={createToken}
                  className="bg-primary hover:bg-primary/90"
                >
                  {t("standalone.startDeployment")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <ConverterFlow open={openConverter} onOpenChange={setOpenConverter} />
      <StandaloneFlow 
        open={openStandalone} 
        onOpenChange={setOpenStandalone}
        onDeploymentComplete={handleStandaloneDeploymentComplete}
      />
    </div>
  );
};

export default Dashboard;
