import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/i18n/LanguageContext";

interface CookieBannerProps {
  onAccept: () => void;
  onReject: () => void;
}

export const CookieBanner = ({ onAccept, onReject }: CookieBannerProps) => {
  const { t } = useTranslation();
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-fade-in">
      <Card className="glass-card max-w-md mx-auto">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Cookie className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-card-foreground mb-3">{t("cookie.text")}</p>
              <div className="flex space-x-2">
                <Button
                  onClick={onAccept}
                  size="sm"
                  className="glass-button cta-start-button flex-1"
                >
                  {t("cookie.accept")}
                </Button>
                <Button
                  onClick={onReject}
                  variant="outline"
                  size="sm"
                  className="glass-button"
                >
                  {t("cookie.reject")}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
