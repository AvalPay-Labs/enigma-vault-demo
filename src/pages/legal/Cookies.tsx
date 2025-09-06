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
                <h2 className="text-2xl font-bold mb-4">1. ¿Qué son las Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Las cookies son pequeños archivos de texto que se almacenan en su dispositivo 
                  cuando visita un sitio web. Se utilizan ampliamente para hacer que los sitios 
                  web funcionen de manera más eficiente, así como para proporcionar información 
                  a los propietarios del sitio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Cómo Usamos las Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  En Enigma Protocol utilizamos cookies para mejorar su experiencia y el 
                  funcionamiento de nuestra plataforma de la siguiente manera:
                </p>
                
                <div className="space-y-6">
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Cookies Esenciales</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Estas cookies son necesarias para el funcionamiento básico del sitio web.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-4">
                      <li>Mantener su sesión iniciada</li>
                      <li>Recordar sus preferencias de idioma</li>
                      <li>Gestionar el carrito de compras</li>
                      <li>Proporcionar servicios de seguridad</li>
                    </ul>
                  </div>

                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Cookies de Funcionalidad</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Estas cookies mejoran la funcionalidad y personalización del sitio web.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-4">
                      <li>Recordar configuraciones del dashboard</li>
                      <li>Personalizar la interfaz de usuario</li>
                      <li>Guardar preferencias de visualización</li>
                      <li>Recordar formularios completados</li>
                    </ul>
                  </div>

                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Cookies Analíticas</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Estas cookies nos ayudan a entender cómo los usuarios interactúan con nuestro sitio.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-4">
                      <li>Analizar patrones de navegación</li>
                      <li>Medir el rendimiento del sitio</li>
                      <li>Identificar errores y problemas técnicos</li>
                      <li>Mejorar la experiencia del usuario</li>
                    </ul>
                  </div>

                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Cookies de Marketing</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Estas cookies se utilizan para mostrar contenido relevante y personalizado.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-4">
                      <li>Personalizar contenido promocional</li>
                      <li>Medir la efectividad de campañas</li>
                      <li>Prevenir la visualización repetitiva de anuncios</li>
                      <li>Proporcionar contenido relevante</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Cookies de Terceros</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    También utilizamos servicios de terceros que pueden establecer cookies en su dispositivo:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Google Analytics</h4>
                      <p className="text-sm text-muted-foreground">
                        Para análisis de tráfico y comportamiento del usuario
                      </p>
                    </div>
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Stripe</h4>
                      <p className="text-sm text-muted-foreground">
                        Para procesamiento seguro de pagos
                      </p>
                    </div>
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Intercom</h4>
                      <p className="text-sm text-muted-foreground">
                        Para chat de soporte al cliente
                      </p>
                    </div>
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">WalletConnect</h4>
                      <p className="text-sm text-muted-foreground">
                        Para conexión con wallets de criptomonedas
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Gestión de Cookies</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Usted tiene control total sobre las cookies. Puede gestionarlas de las siguientes maneras:
                  </p>
                  
                  <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Centro de Preferencias</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Use nuestro centro de preferencias para controlar qué tipos de cookies acepta.
                    </p>
                    <Button onClick={manageCookies} className="glass-button cta-start-button">{t("legal.cookies.managePrefs")}</Button>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Configuración del Navegador</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      También puede controlar las cookies a través de la configuración de su navegador:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-4">
                      <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                      <li><strong>Firefox:</strong> Preferencias → Privacidad y seguridad → Cookies</li>
                      <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                      <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Impacto de Desactivar Cookies</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Si elige desactivar las cookies, algunas funciones de nuestro sitio pueden verse afectadas:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Necesitará iniciar sesión repetidamente</li>
                    <li>Sus preferencias no se guardarán</li>
                    <li>Algunas funciones del dashboard pueden no funcionar correctamente</li>
                    <li>La experiencia de usuario puede ser menos personalizada</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Actualizaciones de la Política</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Podemos actualizar esta Política de Cookies ocasionalmente para reflejar cambios 
                  en nuestras prácticas o por razones operativas, legales o regulatorias. 
                  Le recomendamos que revise esta página periódicamente.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Contacto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Si tiene preguntas sobre nuestra Política de Cookies, puede contactarnos en:
                  <br />
                  Email: privacy@enigmaprotocol.com
                  <br />
                  Dirección: Barcelona, España
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Consentimiento</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Al continuar utilizando nuestro sitio web después de que se le notifique sobre 
                  el uso de cookies, usted acepta nuestro uso de cookies como se describe en esta política.
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
