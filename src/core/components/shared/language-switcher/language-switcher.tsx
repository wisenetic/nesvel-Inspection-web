import { useTranslation } from "@refinedev/core";

import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { useLanguages } from "@/core/providers/language-provider";
import { cn } from "@/core/lib/utils";

type LanguageSwitcherProps = {
  /** Wrapper div classes (positioning, etc.). */
  className?: string;
  /** Extra classes for the trigger button (size override, etc.). */
  triggerClassName?: string;
  /** Optional: override dropdown width or other styles. */
  contentClassName?: string;
};

export const LanguageSwitcher = ({
  className,
  triggerClassName,
  contentClassName,
}: LanguageSwitcherProps) => {
  const { getLocale, changeLocale } = useTranslation();

  const languages = useLanguages();

  const currentLangKey = getLocale();
  const currentLang =
    languages.find((lang) => lang.key === currentLangKey) ?? languages[0];

  const renderFlag = (langKey: string, sizeClass = "h-5 w-5") => {
    const lang = languages.find((item) => item.key === langKey) ?? languages[0];
    const isImageFlag =
      !!lang.flag && /\.(png|jpg|jpeg|svg|webp)$/i.test(lang.flag);

    if (isImageFlag) {
      return (
        <span
          className={cn(
            "inline-flex items-center justify-center overflow-hidden rounded-full",
            sizeClass,
          )}
        >
          <img
            src={lang.flag}
            alt={lang.label}
            className="h-full w-full object-cover"
          />
        </span>
      );
    }

    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-accent/60 text-[0.7rem]",
          sizeClass,
        )}
      >
        {lang.flag ?? lang.label.slice(0, 2).toUpperCase()}
      </span>
    );
  };

  const handleChange = (lang: string) => {
    if (!lang || lang === currentLangKey) return;
    changeLocale(lang);
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "bg-transparent hover:bg-accent/60 rounded-full h-10 w-10",
              triggerClassName,
            )}
          >
            {renderFlag(currentLang.key)}
            <span className="sr-only">Change language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={cn("min-w-[140px]", contentClassName)}
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.key}
              onClick={() => handleChange(lang.key)}
              className={cn(
                lang.key === currentLangKey &&
                  "bg-accent text-accent-foreground",
              )}
            >
              <span className="mr-2" aria-hidden="true">
                {renderFlag(lang.key, "h-4 w-4")}
              </span>
              <span>{lang.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
