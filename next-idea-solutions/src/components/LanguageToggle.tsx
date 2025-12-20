import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="relative overflow-hidden"
      aria-label="Toggle language"
    >
      <div className="flex items-center gap-1">
        <Languages className="h-4 w-4" />
        <span className="text-xs font-bold">
          {language === "en" ? "EN" : "বাং"}
        </span>
      </div>
    </Button>
  );
};

export default LanguageToggle;
