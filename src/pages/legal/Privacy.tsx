import { Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/i18n/LanguageContext";

const Privacy = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4 gradient-text">{t("legal.privacy.title")}</h1>
            <p className="text-muted-foreground">{t("legal.lastUpdated")}: 7/01/2025</p>
          </div>

          <Card className="glass-card border-glass-border">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At AvalPay, developers of Enigma Protocol, we are committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                  when you use our Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">2.1 Personal Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Email address</li>
                    <li>Name (optional)</li>
                    <li>Billing information for paid plans</li>
                  </ul>

                  <h3 className="text-lg font-semibold">2.2 Technical Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Connected wallet addresses</li>
                    <li>Platform usage data</li>
                    <li>Device and browser information</li>
                    <li>Cookies and similar technologies</li>
                  </ul>

                  <h3 className="text-lg font-semibold">2.3 Blockchain Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    IMPORTANT: Enigma Protocol is designed to be fully non‑custodial. We never have access to your
                    private keys, funds, or private transaction details. We only process public data necessary for
                    the operation of the protocol.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">We use collected information to:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Provide and maintain our Service</li>
                    <li>Process transactions and manage your account</li>
                    <li>Communicate about Service updates</li>
                    <li>Improve platform security and functionality</li>
                    <li>Comply with legal and regulatory obligations</li>
                    <li>Prevent fraud and malicious activity</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Sharing Information</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We do not sell, rent, or trade your personal information. We may share information in the following cases:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>With your explicit consent</li>
                    <li>To comply with legal requirements</li>
                    <li>With service providers who help operate the platform</li>
                    <li>In case of merger, acquisition, or asset sale</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">We implement appropriate technical and organizational security measures:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Encryption of data at rest and in transit</li>
                    <li>Multi‑factor authentication for sensitive accounts</li>
                    <li>Regular security audits</li>
                    <li>Limited staff access to personal data</li>
                    <li>Continuous system monitoring</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">Subject to applicable data protection laws, you may:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Access your personal information</li>
                    <li>Rectify inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Restrict processing</li>
                    <li>Data portability</li>
                    <li>Object to processing</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Cookies & Tracking Technologies</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">We use cookies and similar technologies to:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Keep your session signed in</li>
                    <li>Remember preferences</li>
                    <li>Analyze platform usage</li>
                    <li>Improve user experience</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed">You can manage cookie preferences via your browser settings or our preferences center.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. International Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your data may be transferred and processed in countries outside your jurisdiction. We ensure
                  that all transfers comply with applicable data protection laws and appropriate safeguards.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain personal information only as long as necessary for the purposes described in this policy,
                  unless a longer retention period is required or permitted by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Children</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Service is not directed to individuals under 18. We do not knowingly collect personal
                  information from children under 18.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Changes to this Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of significant changes by
                  posting the new policy on this page and updating the "last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">12. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy or wish to exercise your rights, contact us at:
                  <br />
                  Email: privacy@enigmaprotocol.com
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

export default Privacy;
