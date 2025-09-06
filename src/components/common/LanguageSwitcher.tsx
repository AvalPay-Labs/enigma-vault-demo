import { useLanguage } from "@/i18n/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  return (
    <Select value={lang} onValueChange={(v) => setLang(v as any)}>
      <SelectTrigger className="w-[100px] sm:w-[120px] md:w-[130px] glass-button h-8 sm:h-9">
        <SelectValue placeholder="Idioma" />
      </SelectTrigger>
      <SelectContent className="glass-card">
        <SelectItem value="es">ES - Español</SelectItem>
        <SelectItem value="en">EN - English</SelectItem>
        <SelectItem value="pt">PT - Português</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;

