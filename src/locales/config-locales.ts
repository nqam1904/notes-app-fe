// ----------------------------------------------------------------------

export type LanguageValue = "vi" | "en";

export const fallbackLng = "vi";
export const languages = ["vi", "en"];
export const defaultNS = "common";
export const cookieName = "i18next";

// ----------------------------------------------------------------------

export function i18nOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    lng,
    fallbackLng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    supportedLngs: languages,
  };
}

// ----------------------------------------------------------------------

export const changeLangMessages: Record<
  LanguageValue,
  { success: string; error: string; loading: string }
> = {
  vi: {
    success: "Ngôn ngữ đã được thay đổi!",
    error: "Lỗi khi thay đổi ngôn ngữ!",
    loading: "Đang tải...",
  },
  en: {
    success: "Language has been changed!",
    error: "Error changing language!",
    loading: "Loading...",
  },
};
