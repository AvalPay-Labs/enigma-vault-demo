import { ScrollText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/i18n/LanguageContext";

const Terms = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <ScrollText className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4 gradient-text">{t("legal.terms.title")}</h1>
            <p className="text-muted-foreground">{t("legal.lastUpdated")}: 7/01/2025</p>
          </div>

          <Card className="glass-card border-glass-border">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to Enigma Protocol ("we", "us" or the "Service"), provided by AvalPay (the "Company").
                  These Terms of Use (the "Terms") govern your use of our privacy protocol for eERC20
                  transactions on the Avalanche network.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using Enigma Protocol, you agree to be bound by these Terms and all
                  applicable laws and regulations. If you do not agree with any part of the Terms, you
                  are prohibited from using or accessing the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Service Description</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Enigma Protocol provides tools to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Create eERC20 tokens with advanced privacy features</li>
                    <li>Perform private transactions using ZK‑SNARK technology</li>
                    <li>Manage temporary and granular audit permissions</li>
                    <li>Convert existing ERC20 tokens to a private format</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Eligibility</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You must be at least 18 years old to use the Service. By using Enigma Protocol, you
                  represent and warrant that you are at least 18 and have the legal authority to
                  enter into these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. User Accounts</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    To access certain features, you may need to create an account. You are responsible for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Maintaining the security of your account and password</li>
                    <li>All activities that occur under your account</li>
                    <li>Promptly notifying us of any unauthorized use</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Acceptable Use</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">You agree NOT to use the Service to:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Engage in illegal or fraudulent activities</li>
                    <li>Launder money or finance terrorism</li>
                    <li>Violate intellectual property rights</li>
                    <li>Interfere with the operation of the Service</li>
                    <li>Attempt to access unauthorized systems</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Privacy & Data</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy matters to us. The Service is fully non‑custodial — we never have access
                  to your funds or private keys. For details on how we handle your data, see our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Blockchain Risks</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">You acknowledge and accept the inherent risks of blockchain:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Transactions are irreversible</li>
                    <li>Smart contracts may contain vulnerabilities</li>
                    <li>Lost private keys cannot be recovered</li>
                    <li>Token prices can be volatile</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall AvalPay be liable for any indirect, incidental, special, consequential
                  or punitive damages, including without limitation loss of profits, data, use, goodwill,
                  or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Changes to the Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time. Changes take effect upon posting.
                  Your continued use of the Service constitutes acceptance of the updated Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your access immediately, without prior notice, for any reason,
                  including without limitation if you breach these Terms of Use.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms are governed by the laws of Spain, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">13. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about these Terms of Use, contact us at:
                  <br />
                  Email: legal@enigmaprotocol.com
                  <br />
                  Address: Barcelona, Spain
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
