import { useParams } from "react-router-dom";
import { ArrowUpRight, ArrowDownLeft, Eye, EyeOff, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TokenDetail = () => {
  const { id } = useParams();
  
  // Mock data
  const token = {
    id,
    name: "PrivateToken",
    symbol: "PRVT",
    address: "0x742d35Cc6Bf660A1154CEaB12d7D7b6d7A6c9d8b",
    auditor: "Ana García",
    auditorExpiry: "2025-02-15"
  };

  const transactions = [
    {
      id: "tx_1",
      type: "send",
      amount: "500.00",
      from: "0x1a2b3c4d...",
      to: "hidden",
      timestamp: "2025-01-07T10:30:00Z",
      visible: false,
      hash: "0x9f9e7a2b..."
    },
    {
      id: "tx_2", 
      type: "receive",
      amount: "hidden",
      from: "0x5e6f7g8h...",
      to: "0x1a2b3c4d...",
      timestamp: "2025-01-06T15:45:00Z", 
      visible: false,
      hash: "0x3c4d5e6f..."
    },
    {
      id: "tx_3",
      type: "send",
      amount: "1000.00",
      from: "0x1a2b3c4d...",
      to: "0x9i0j1k2l...",
      timestamp: "2025-01-05T09:15:00Z",
      visible: true,
      hash: "0x7g8h9i0j..."
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Token Header */}
        <Card className="glass-card border-glass-border mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl gradient-text">
                  {token.name} ({token.symbol})
                </CardTitle>
                <p className="text-sm text-muted-foreground font-mono mt-2">
                  {token.address}
                </p>
              </div>
              <div className="text-right">
                {token.auditor ? (
                  <div>
                    <Badge className="bg-accent-success text-success-foreground mb-2">
                      <Shield className="w-3 h-3 mr-1" />
                      Auditado por {token.auditor}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Vigencia hasta: {token.auditorExpiry}
                    </p>
                  </div>
                ) : (
                  <Badge variant="outline">Sin auditor activo</Badge>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Transactions */}
        <Card className="glass-card border-glass-border">
          <CardHeader>
            <CardTitle>Transacciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      tx.type === 'send' ? 'bg-accent-avalanche/20' : 'bg-accent-success/20'
                    }`}>
                      {tx.type === 'send' ? (
                        <ArrowUpRight className="w-4 h-4 text-accent-avalanche" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4 text-accent-success" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold capitalize">{tx.type}</span>
                        {!tx.visible && (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(tx.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {tx.visible ? (
                      <div>
                        <p className="font-semibold">{tx.amount} {token.symbol}</p>
                        <p className="text-xs text-muted-foreground">
                          De: {tx.from}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Para: {tx.to}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="bg-muted/50 p-3 rounded-lg mb-2">
                          <EyeOff className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                          <p className="text-xs text-muted-foreground">Contenido privado</p>
                        </div>
                        <Button size="sm" variant="outline" className="glass-button">
                          Solicitar auditoría
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notes section (future feature) */}
        <Card className="glass-card border-glass-border mt-8">
          <CardHeader>
            <CardTitle>Notas de Transacción</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Eye className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Las notas de transacción estarán disponibles próximamente
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Podrás añadir contexto privado a tus transacciones
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TokenDetail;