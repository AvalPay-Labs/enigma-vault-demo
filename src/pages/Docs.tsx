import { Code, Key, Shield, Zap, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/i18n/LanguageContext";

const Docs = () => {
  const { t } = useTranslation();
  // Developer docs page rendered inline for the demo

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
                    <CardTitle>Zero‑Knowledge Privacy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Uses zero‑knowledge proofs to hide transaction details while preserving on‑chain verifiability.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="glass-card border-glass-border">
                  <CardHeader className="text-center">
                    <Key className="w-12 h-12 mx-auto text-accent-avalanche mb-4" />
                    <CardTitle>Non‑custodial</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      All operations require your signature. Funds remain fully under your control.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="glass-card border-glass-border">
                  <CardHeader className="text-center">
                    <FileText className="w-12 h-12 mx-auto text-accent-success mb-4" />
                    <CardTitle>Granular Auditing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Temporary, scoped permissions enabling selective transparency for compliance.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-warning" />
                    Quick Start
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">1. Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Get your API key from the dashboard and set auth headers.
                    </p>
                  </div>
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">2. Create Token</h4>
                    <p className="text-sm text-muted-foreground">
                      Use POST /api/tokens to create your first private eERC20 token.
                    </p>
                  </div>
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">3. Configure Privacy</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose what to keep private and what to disclose for audits.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* External Demo Embed */}
              <Card className="glass-card border-glass-border">
                {/* <CardHeader>
                  <CardTitle>Wolf Cloak Demo</CardTitle>
                  <CardDescription>Embedded preview (opens externally if blocked)</CardDescription>
                </CardHeader> */}
                <CardContent>
                  <div className="rounded-lg overflow-hidden border border-glass-border bg-background">
                    <iframe
                      src="https://wolf-cloak.vercel.app"
                      title="Wolf Cloak Demo"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                      className="w-full h-[720px]"
                    />
                  </div>
                  {/* <p className="text-xs text-muted-foreground mt-2">
                    If the embedded preview fails due to browser security, open it directly:
                    {' '}<a href="https://wolf-cloak.vercel.app" target="_blank" rel="noreferrer noopener" className="underline text-primary">wolf-cloak.vercel.app</a>
                  </p> */}
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
                  <CardDescription>Endpoints used by this demo app</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Health & Auth */}
                  <div className="bg-muted/20 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold mb-2">Health & Auth</h4>
                    <ul className="text-sm space-y-1 font-mono">
                      <li><span className="mr-2 font-semibold">GET</span>/api/health — API liveness</li>
                      <li><span className="mr-2 font-semibold">POST</span>/api/auth/login — User login</li>
                      <li><span className="mr-2 font-semibold">GET</span>/api/auth/profile — Current profile</li>
                    </ul>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-white/60 border border-glass-border rounded-md p-3">
                        <div className="text-xs font-semibold mb-1">cURL — Health</div>
                        <pre className="text-xs overflow-x-auto">
{`curl -s https://api.enigmaprotocol.com/api/health`}
                        </pre>
                      </div>
                      <div className="bg-white/60 border border-glass-border rounded-md p-3">
                        <div className="text-xs font-semibold mb-1">cURL — Login</div>
                        <pre className="text-xs overflow-x-auto">
{`curl -X POST https://api.enigmaprotocol.com/api/auth/login \\
  -H 'Content-Type: application/json' \\
  -d '{"email":"user@example.com","password":"secret"}'`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Standalone module */}
                  <div className="bg-muted/20 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold mb-2">Standalone</h4>
                    <ul className="text-sm space-y-1 font-mono">
                      <li><span className="mr-2 font-semibold">POST</span>/api/standalone/deploy-basics — Deploy ZK verifiers</li>
                      <li><span className="mr-2 font-semibold">POST</span>/api/standalone/deploy-system — Deploy Registrar + EncryptedERC</li>
                      <li><span className="mr-2 font-semibold">POST</span>/api/standalone/register-auditor — Register auditor user</li>
                      <li><span className="mr-2 font-semibold">POST</span>/api/standalone/set-auditor — Set/activate auditor</li>
                      <li><span className="mr-2 font-semibold">POST</span>/api/standalone/mint — Mint encrypted tokens</li>
                      <li><span className="mr-2 font-semibold">GET</span>/api/standalone/balance/:walletNumber — Encrypted balance</li>
                      <li><span className="mr-2 font-semibold">POST</span>/api/standalone/transfer — Transfer encrypted tokens</li>
                      <li><span className="mr-2 font-semibold">POST</span>/api/standalone/burn — Burn encrypted tokens</li>
                    </ul>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-white/60 border border-glass-border rounded-md p-3">
                        <div className="text-xs font-semibold mb-1">cURL — Deploy Basics</div>
                        <pre className="text-xs overflow-x-auto">
{`curl -X POST https://api.enigmaprotocol.com/api/standalone/deploy-basics \\
  -H 'Content-Type: application/json' -d '{}'`}
                        </pre>
                      </div>
                      <div className="bg-white/60 border border-glass-border rounded-md p-3">
                        <div className="text-xs font-semibold mb-1">cURL — Balance</div>
                        <pre className="text-xs overflow-x-auto">
{`curl -s https://api.enigmaprotocol.com/api/standalone/balance/1`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Converter module */}
                  <div className="bg-muted/20 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold mb-2">Converter</h4>
                    <ul className="text-sm space-y-1 font-mono">
                      <li><span className="mr-2 font-semibold">POST</span>/api/converter/deploy-basics — Deploy core components</li>
                      <li><span className="mr-2 font-semibold">POST</span>/api/converter/deploy-system — Deploy full converter</li>
                      <li><span className="mr-2 font-semibold">POST</span>/api/converter/register-user — Register user</li>
                      <li><span className="mr-2 font-semibold">POST</span>/api/converter/set-auditor — Set converter auditor</li>
                      <li><span className="mr-2 font-semibold">POST</span>/api/converter/get-faucet — Get faucet tokens</li>
                      <li><span className="mr-2 font-semibold">POST</span>/api/converter/deposit — ERC20 → encrypted</li>
                      <li><span className="mr-2 font-semibold">POST</span>/api/converter/transfer — Transfer encrypted</li>
                      <li><span className="mr-2 font-semibold">GET</span>/api/converter/balance/:walletNumber — Encrypted balance</li>
                      <li><span className="mr-2 font-semibold">POST</span>/api/converter/withdraw — Encrypted → ERC20</li>
                    </ul>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-white/60 border border-glass-border rounded-md p-3">
                        <div className="text-xs font-semibold mb-1">cURL — Deposit</div>
                        <pre className="text-xs overflow-x-auto">
{`curl -X POST https://api.enigmaprotocol.com/api/converter/deposit \\
  -H 'Content-Type: application/json' \\
  -d '{"walletNumber":1,"walletAddress":"0xabc..."}'`}
                        </pre>
                      </div>
                      <div className="bg-white/60 border border-glass-border rounded-md p-3">
                        <div className="text-xs font-semibold mb-1">cURL — Withdraw</div>
                        <pre className="text-xs overflow-x-auto">
{`curl -X POST https://api.enigmaprotocol.com/api/converter/withdraw \\
  -H 'Content-Type: application/json' \\
  -d '{"walletNumber":1,"walletAddress":"0xabc..."}'`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="authentication" className="space-y-6">
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle>Token Authentication</CardTitle>
                  <CardDescription>
                    Obtain a token via login and send it as a Bearer token in subsequent requests.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">1) Login</h4>
                    <p className="text-sm text-muted-foreground mb-2">POST /api/auth/login</p>
                    <pre className="bg-white/60 border border-glass-border p-3 rounded-md text-sm overflow-x-auto">
{`curl -X POST https://api.enigmaprotocol.com/api/auth/login \\
  -H 'Content-Type: application/json' \\
  -d '{"email":"user@example.com","password":"secret"}'`}
                    </pre>
                  </div>
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">2) Use the token</h4>
                    <p className="text-sm text-muted-foreground mb-2">GET /api/auth/profile</p>
                    <pre className="bg-white/60 border border-glass-border p-3 rounded-md text-sm overflow-x-auto">
{`curl -s https://api.enigmaprotocol.com/api/auth/profile \\
  -H 'Authorization: Bearer <your_token_here>'`}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Required headers</h4>
                    <pre className="bg-muted/20 p-3 rounded-lg text-sm">
{`Authorization: Bearer <token>
Content-Type: application/json`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle>Rate Limits</CardTitle>
                  <CardDescription>Usage limits by plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Free:</span>
                      <span className="text-muted-foreground">100 requests/hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Pro:</span>
                      <span className="text-muted-foreground">1,000 requests/hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Enterprise:</span>
                      <span className="text-muted-foreground">Unlimited</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle>Converter: end‑to‑end cURL</CardTitle>
                  <CardDescription>Deploy, register, deposit and withdraw</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted/20 p-4 rounded-lg text-sm overflow-x-auto">
{`# 1) Deploy basics
curl -X POST https://api.enigmaprotocol.com/api/converter/deploy-basics \
  -H 'Content-Type: application/json' -d '{}'

# 2) Deploy full system
curl -X POST https://api.enigmaprotocol.com/api/converter/deploy-system \
  -H 'Content-Type: application/json' -d '{}'

# 3) Register a user
curl -X POST https://api.enigmaprotocol.com/api/converter/register-user \
  -H 'Content-Type: application/json' \
  -d '{"walletNumber":1,"walletAddress":"0xabc..."}'

# 4) Deposit (ERC20 → encrypted)
curl -X POST https://api.enigmaprotocol.com/api/converter/deposit \
  -H 'Content-Type: application/json' \
  -d '{"walletNumber":1,"walletAddress":"0xabc..."}'

# 5) Withdraw (encrypted → ERC20)
curl -X POST https://api.enigmaprotocol.com/api/converter/withdraw \
  -H 'Content-Type: application/json' \
  -d '{"walletNumber":1,"walletAddress":"0xabc..."}'`}
                  </pre>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle>Standalone: quick cURL</CardTitle>
                  <CardDescription>Deploy and basic operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted/20 p-4 rounded-lg text-sm overflow-x-auto">
{`# Deploy
curl -X POST https://api.enigmaprotocol.com/api/standalone/deploy-basics -H 'Content-Type: application/json' -d '{}'
curl -X POST https://api.enigmaprotocol.com/api/standalone/deploy-system -H 'Content-Type: application/json' -d '{}'

# Register + set auditor
curl -X POST https://api.enigmaprotocol.com/api/standalone/register-auditor -H 'Content-Type: application/json' -d '{"walletNumber":2}'
curl -X POST https://api.enigmaprotocol.com/api/standalone/set-auditor -H 'Content-Type: application/json' -d '{"walletNumber":1}'

# Mint, balance, transfer, burn
curl -X POST https://api.enigmaprotocol.com/api/standalone/mint -H 'Content-Type: application/json' -d '{"amount":50}'
curl -s https://api.enigmaprotocol.com/api/standalone/balance/1
curl -X POST https://api.enigmaprotocol.com/api/standalone/transfer -H 'Content-Type: application/json' -d '{"amount":30}'
curl -X POST https://api.enigmaprotocol.com/api/standalone/burn -H 'Content-Type: application/json' -d '{"amount":20}'`}
                  </pre>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle>Security Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Tokens</h4>
                      <p className="text-sm text-muted-foreground">
                        Do not expose secrets in the frontend. Use server‑side storage for sensitive keys.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Wallet signatures</h4>
                      <p className="text-sm text-muted-foreground">
                        All state‑changing operations should be signed by the user’s wallet.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Environment</h4>
                      <p className="text-sm text-muted-foreground">
                        This demo targets Avalanche Fuji Testnet.
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
