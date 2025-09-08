import { Code, Key, Shield, Zap, FileText, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/i18n/LanguageContext";

const Docs = () => {
  const { t } = useTranslation();
  // Endpoints estáticos removidos: dejamos solo el embed de Swagger UI

  const docsUrl = (import.meta as any).env?.VITE_DOCS_URL || 'https://enigma-backend.aiforworld.xyz/docs';

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">{t("docs.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("docs.subtitle")}</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 glass-card">
              <TabsTrigger value="overview">{t("docs.tabs.overview")}</TabsTrigger>
              <TabsTrigger value="endpoints">{t("docs.tabs.endpoints")}</TabsTrigger>
              <TabsTrigger value="authentication">{t("docs.tabs.authentication")}</TabsTrigger>
              <TabsTrigger value="examples">{t("docs.tabs.examples")}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="glass-card border-glass-border">
                  <CardHeader className="text-center">
                    <Shield className="w-12 h-12 mx-auto text-primary mb-4" />
                    <CardTitle>Privacidad ZK</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Implementa pruebas de conocimiento cero para ocultar detalles de transacciones 
                      manteniendo la verificabilidad en blockchain.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="glass-card border-glass-border">
                  <CardHeader className="text-center">
                    <Key className="w-12 h-12 mx-auto text-accent-avalanche mb-4" />
                    <CardTitle>Sin Custodia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Todas las operaciones requieren tu firma. Tus fondos permanecen 
                      siempre bajo tu control total.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="glass-card border-glass-border">
                  <CardHeader className="text-center">
                    <FileText className="w-12 h-12 mx-auto text-accent-success mb-4" />
                    <CardTitle>Auditoría Granular</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Sistema de permisos temporales que permite transparencia 
                      selectiva para cumplimiento regulatorio.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-warning" />
                    Inicio Rápido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">1. Autenticación</h4>
                    <p className="text-sm text-muted-foreground">
                      Obtén tu API key desde el dashboard y configura los headers de autenticación.
                    </p>
                  </div>
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">2. Crear Token</h4>
                    <p className="text-sm text-muted-foreground">
                      Usa POST /api/tokens para crear tu primer token eERC20 privado.
                    </p>
                  </div>
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">3. Configurar Privacidad</h4>
                    <p className="text-sm text-muted-foreground">
                      Define qué información mantener privada y qué permitir en auditorías.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-6">
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    API Reference
                  </CardTitle>
                  {/* Sin leyenda adicional; dejamos solo enlace e imagen */}
                </CardHeader>
                <CardContent>
                  <a
                    href={docsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-primary underline mb-3"
                  >
                    Abrir documentación completa
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <div className="rounded-lg overflow-hidden border border-glass-border bg-background">
                    <img
                      src="https://i.postimg.cc/yYBSv3Bx/Google-Chrome-2025-09-07-23-14-57.png"
                      alt="API Docs Preview"
                      className="w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="authentication" className="space-y-6">
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle>API Key Authentication</CardTitle>
                  <CardDescription>
                    Todas las requests deben incluir tu API key en los headers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Headers requeridos:</h4>
                    <pre className="bg-muted/20 p-3 rounded-lg text-sm">
{`Authorization: Bearer your_api_key_here
Content-Type: application/json
X-Enigma-Version: v1`}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Ejemplo con cURL:</h4>
                    <pre className="bg-muted/20 p-3 rounded-lg text-sm overflow-x-auto">
{`curl -X POST https://api.enigmaprotocol.com/api/tokens \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "MyToken", "symbol": "MTK"}'`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle>Rate Limits</CardTitle>
                  <CardDescription>Límites de uso según tu plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Plan Free:</span>
                      <span className="text-muted-foreground">100 requests/hora</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Plan Pro:</span>
                      <span className="text-muted-foreground">1,000 requests/hora</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Plan Enterprise:</span>
                      <span className="text-muted-foreground">Ilimitado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle>Ejemplo: Flujo Completo</CardTitle>
                  <CardDescription>
                    Desde la creación del token hasta la configuración de auditoría
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted/20 p-4 rounded-lg text-sm overflow-x-auto">
{`// 1. Crear token privado
const token = await enigma.createToken({
  name: "CompanyToken",
  symbol: "CMPY",
  initialSupply: "1000000",
  privacyLevel: "high"
});

// 2. Transferir con privacidad
const transfer = await enigma.transfer({
  tokenId: token.id,
  to: "0x742d35Cc6...",
  amount: "100.5",
  hideAmount: true,
  hideRecipient: true
});

// 3. Configurar auditoría temporal
const audit = await enigma.requestAudit({
  tokenId: token.id,
  auditorAddress: "0x1a2b3c4d...",
  validFrom: "2025-01-15T00:00:00Z",
  validUntil: "2025-02-15T23:59:59Z",
  reason: "Quarterly compliance review"
});

console.log("Token creado:", token.contractAddress);
console.log("Transferencia privada:", transfer.hash);
console.log("Solicitud de auditoría:", audit.requestId);`}
                  </pre>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle>Notas de Seguridad</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-semibold">API Keys</h4>
                      <p className="text-sm text-muted-foreground">
                        Nunca expongas tu API key en el frontend. Úsala solo en el backend.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Wallet Signatures</h4>
                      <p className="text-sm text-muted-foreground">
                        Todas las transacciones requieren firma de wallet para validación.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Limitaciones Actuales</h4>
                      <p className="text-sm text-muted-foreground">
                        Demo disponible solo en Avalanche Fuji Testnet. C-Chain próximamente.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Docs;
