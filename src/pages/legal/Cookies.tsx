import { Cookie } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageContext";

const Cookies = () => {
  const manageCookies = () => {
    // This would open a cookie preference center in a real implementation
    alert(t("legal.cookies.centerSoon"));
  };

  const { t } = useTranslation();
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Cookie className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4 gradient-text">{t("legal.cookies.title")}</h1>
            <p className="text-muted-foreground">{t("legal.lastUpdated")}: 7/01/2025</p>
          </div>

          <Card className="glass-card border-glass-border">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. What Are Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files stored on your device when you visit a website. They are widely used to
                  make websites work more efficiently and to provide information to site owners.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. How We Use Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use cookies to improve your experience and the operation of our platform as follows:
                </p>
                
                <div className="space-y-6">
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Essential Cookies</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      These cookies are necessary for the basic operation of the website.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-4">
                      <li>Keep your session signed in</li>
                      <li>Remember language preferences</li>
                      <li>Manage cart/session state</li>
                      <li>Provide security services</li>
                    </ul>
                  </div>

                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Functionality Cookies</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      These cookies improve website functionality and personalization.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-4">
                      <li>Remember dashboard settings</li>
                      <li>Customize the user interface</li>
                      <li>Save display preferences</li>
                      <li>Remember completed forms</li>
                    </ul>
                  </div>

                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Analytics Cookies</h3>
                    <p className="text-muted-foreground text-sm mb-2">These cookies help us understand how users interact with our site.</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-4">
                      <li>Analyze browsing patterns</li>
                      <li>Measure site performance</li>
                      <li>Identify errors and technical issues</li>
                      <li>Improve user experience</li>
                    </ul>
                  </div>

                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Marketing Cookies</h3>
                    <p className="text-muted-foreground text-sm mb-2">These cookies are used to show relevant and personalized content.</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-4">
                      <li>Personalize promotional content</li>
                      <li>Measure campaign effectiveness</li>
                      <li>Prevent repetitive ad display</li>
                      <li>Provide relevant content</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Third‑party Cookies</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We also use third‑party services that may set cookies on your device:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Google Analytics</h4>
                      <p className="text-sm text-muted-foreground">
                        For traffic and user behavior analytics
                      </p>
                    </div>
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Stripe</h4>
                      <p className="text-sm text-muted-foreground">
                        For secure payment processing
                      </p>
                    </div>
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Intercom</h4>
                      <p className="text-sm text-muted-foreground">
                        For customer support chat
                      </p>
                    </div>
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">WalletConnect</h4>
                      <p className="text-sm text-muted-foreground">
                        For crypto wallet connectivity
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Managing Cookies</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    You have full control over cookies. You can manage them as follows:
                  </p>
                  
                  <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Preferences Center</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Use our preferences center to control which cookie types you accept.
                    </p>
                    <Button onClick={manageCookies} className="glass-button cta-start-button">{t("legal.cookies.managePrefs")}</Button>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Browser Settings</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      You can also control cookies through your browser settings:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-4">
                      <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
                      <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies</li>
                      <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                      <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Impact of Disabling Cookies</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">If you choose to disable cookies, some features may be affected:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>You may need to sign in repeatedly</li>
                    <li>Your preferences may not be saved</li>
                    <li>Some dashboard features may not work properly</li>
                    <li>User experience may be less personalized</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Policy Updates</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for operational,
                  legal, or regulatory reasons. We recommend reviewing this page periodically.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about our Cookie Policy, contact us at:
                  <br />
                  Email: privacy@enigmaprotocol.com
                  <br />
                  Address: Barcelona, Spain
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Consent</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By continuing to use our website after being notified about the use of cookies, you consent to our use of
                  cookies as described in this policy.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
