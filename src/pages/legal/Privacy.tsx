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
                <h2 className="text-2xl font-bold mb-4">1. Introducción</h2>
                <p className="text-muted-foreground leading-relaxed">
                  En AvalPay, desarrolladores de Enigma Protocol, nos comprometemos a proteger 
                  su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, 
                  divulgamos y salvaguardamos su información cuando utiliza nuestro servicio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Información que Recopilamos</h2>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">2.1 Información Personal</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Dirección de correo electrónico</li>
                    <li>Nombre (opcional)</li>
                    <li>Información de facturación para planes pagos</li>
                  </ul>

                  <h3 className="text-lg font-semibold">2.2 Información Técnica</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Direcciones de wallet conectadas</li>
                    <li>Datos de uso de la plataforma</li>
                    <li>Información de dispositivo y navegador</li>
                    <li>Cookies y tecnologías similares</li>
                  </ul>

                  <h3 className="text-lg font-semibold">2.3 Información Blockchain</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    IMPORTANTE: Enigma Protocol está diseñado para ser completamente sin custodia. 
                    Nunca tenemos acceso a sus claves privadas, fondos o detalles de transacciones 
                    privadas. Únicamente procesamos datos públicos necesarios para el funcionamiento 
                    del protocolo.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Cómo Usamos su Información</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Utilizamos la información recopilada para:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Proporcionar y mantener nuestro servicio</li>
                    <li>Procesar transacciones y gestionar su cuenta</li>
                    <li>Comunicarnos con usted sobre actualizaciones del servicio</li>
                    <li>Mejorar la seguridad y funcionalidad de la plataforma</li>
                    <li>Cumplir con obligaciones legales y regulatorias</li>
                    <li>Prevenir fraudes y actividades maliciosas</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Compartir Información</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    No vendemos, alquilamos o comercializamos su información personal. 
                    Podemos compartir información en las siguientes circunstancias:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Con su consentimiento explícito</li>
                    <li>Para cumplir con requisitos legales</li>
                    <li>Con proveedores de servicios que nos ayudan a operar la plataforma</li>
                    <li>En caso de fusión, adquisición o venta de activos</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Seguridad de Datos</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Implementamos medidas de seguridad técnicas y organizativas apropiadas:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Cifrado de datos en reposo y en tránsito</li>
                    <li>Autenticación multifactor para cuentas sensibles</li>
                    <li>Auditorías de seguridad regulares</li>
                    <li>Acceso limitado a datos personales por parte del personal</li>
                    <li>Monitoreo continuo de sistemas</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Sus Derechos</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Según las leyes de protección de datos aplicables, usted tiene derecho a:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Acceder a su información personal</li>
                    <li>Rectificar datos inexactos</li>
                    <li>Solicitar la eliminación de sus datos</li>
                    <li>Limitar el procesamiento de sus datos</li>
                    <li>Portabilidad de datos</li>
                    <li>Oponerse al procesamiento</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Cookies y Tecnologías de Seguimiento</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Utilizamos cookies y tecnologías similares para:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
                    <li>Mantener su sesión iniciada</li>
                    <li>Recordar sus preferencias</li>
                    <li>Analizar el uso de la plataforma</li>
                    <li>Mejorar la experiencia del usuario</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed">
                    Puede gestionar sus preferencias de cookies a través de la configuración 
                    de su navegador o nuestro centro de preferencias.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Transferencias Internacionales</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Sus datos pueden ser transferidos y procesados en países fuera de su jurisdicción. 
                  Nos aseguramos de que todas las transferencias cumplan con las leyes de protección 
                  de datos aplicables y proporcionamos las salvaguardas apropiadas.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Retención de Datos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Retenemos su información personal solo durante el tiempo necesario para cumplir 
                  con los propósitos descritos en esta política, a menos que la ley requiera o 
                  permita un período de retención más largo.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Menores de Edad</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nuestro servicio no está dirigido a menores de 18 años. No recopilamos 
                  conscientemente información personal de menores de 18 años.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Cambios a esta Política</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos 
                  sobre cambios significativos publicando la nueva política en esta página y 
                  actualizando la fecha de "última actualización".
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">12. Contacto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, 
                  puede contactarnos en:
                  <br />
                  Email: privacy@enigmaprotocol.com
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

export default Privacy;
