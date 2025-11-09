"use client";

export const allLangs = [
  {
    value: "vi",
    label: "Tiếng Việt",
    countryCode: "VN",
    flat: "/images/vn.png",
    adapterLocale: "vi",
    numberFormat: { code: "vi-VN", currency: "VND" },
  },
  {
    value: "en",
    label: "English",
    countryCode: "GB",
    flat: "/images/en.png",
    adapterLocale: "en",
    numberFormat: { code: "en-US", currency: "USD" },
  },
];

/**
 * Country code:
 * https://flagcdn.com/en/codes.json
 *
 * Number format code:
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */
