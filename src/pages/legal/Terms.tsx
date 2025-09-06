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
                <h2 className="text-2xl font-bold mb-4">1. Introducción</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Bienvenido a Enigma Protocol ("nosotros", "nuestro" o "el Servicio"), 
                  proporcionado por AvalPay ("Compañía", "nosotros" o "nuestro"). 
                  Estos Términos de Uso ("Términos") rigen su uso de nuestro servicio 
                  de protocolo de privacidad para transacciones eERC20 en la red Avalanche.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Aceptación de Términos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Al acceder y utilizar Enigma Protocol, usted acepta estar sujeto a estos 
                  Términos y todas las leyes y regulaciones aplicables. Si no está de acuerdo 
                  con alguno de estos términos, está prohibido utilizar o acceder a este servicio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Descripción del Servicio</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Enigma Protocol es una plataforma que permite:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Crear tokens eERC20 con capacidades de privacidad avanzadas</li>
                    <li>Realizar transacciones privadas mediante tecnología ZK-SNARK</li>
                    <li>Gestionar sistemas de auditoría temporal y granular</li>
                    <li>Convertir tokens ERC20 existentes a formato privado</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Elegibilidad</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Debe tener al menos 18 años para usar este servicio. Al usar Enigma Protocol, 
                  declara y garantiza que tiene al menos 18 años de edad y tiene la autoridad 
                  legal para celebrar estos Términos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Cuentas de Usuario</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Para acceder a ciertas funciones de nuestro servicio, debe crear una cuenta. 
                    Usted es responsable de:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Mantener la seguridad de su cuenta y contraseña</li>
                    <li>Todas las actividades que ocurran bajo su cuenta</li>
                    <li>Notificarnos inmediatamente sobre cualquier uso no autorizado</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Uso Aceptable</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Usted se compromete a NO utilizar el servicio para:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Actividades ilegales o fraudulentas</li>
                    <li>Lavado de dinero o financiamiento del terrorismo</li>
                    <li>Violar derechos de propiedad intelectual</li>
                    <li>Interferir con el funcionamiento del servicio</li>
                    <li>Intentar acceder a sistemas no autorizados</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Privacidad y Datos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Su privacidad es importante para nosotros. Nuestro servicio está diseñado para 
                  ser completamente sin custodia, lo que significa que nunca tenemos acceso a sus 
                  fondos o claves privadas. Para más detalles sobre cómo manejamos sus datos, 
                  consulte nuestra Política de Privacidad.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Riesgos de Blockchain</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Usted reconoce y acepta los riesgos inherentes de la tecnología blockchain:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Las transacciones son irreversibles</li>
                    <li>Los smart contracts pueden contener vulnerabilidades</li>
                    <li>Las claves privadas perdidas no pueden recuperarse</li>
                    <li>Los precios de los tokens pueden ser volátiles</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Limitación de Responsabilidad</h2>
                <p className="text-muted-foreground leading-relaxed">
                  En ningún caso AvalPay será responsable por daños indirectos, incidentales, 
                  especiales, consecuentes o punitivos, incluyendo sin limitación, pérdida de 
                  beneficios, datos, uso, buena voluntad u otras pérdidas intangibles.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Modificaciones</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                  Las modificaciones entrarán en vigor inmediatamente después de su publicación. 
                  Su uso continuado del servicio constituye la aceptación de los términos modificados.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Terminación</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Podemos terminar o suspender su acceso inmediatamente, sin previo aviso, 
                  por cualquier motivo, incluyendo sin limitación si usted viola los Términos de Uso.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">12. Ley Aplicable</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Estos Términos se regirán e interpretarán de acuerdo con las leyes de España, 
                  sin tener en cuenta sus disposiciones sobre conflictos de leyes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">13. Contacto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Si tiene preguntas sobre estos Términos de Uso, puede contactarnos en:
                  <br />
                  Email: legal@enigmaprotocol.com
                  <br />
                  Dirección: Barcelona, España
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
